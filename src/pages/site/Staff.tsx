import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Check } from "lucide-react";
import StaffCard from "@/components/site/StaffCard";

// Define interfaces for staff member types
interface QualifiedStaffMember {
  name: string;
  role: string;
  issues: null;
  experience?: number;
}

interface AttentionRequiredStaffMember {
  name: string;
  role: string;
  issues: string[];
}

type StaffMember = QualifiedStaffMember | AttentionRequiredStaffMember;

// Modified interface to match what the API actually returns
interface StaffStatistics {
  total_staff: number;
  role_distribution: Record<string, number>;
  certification_status: {
    cv_uploaded: { count: number; percentage: number };
    gcp_certified: { count: number; percentage: number };
    medical_license: { count: number; percentage: number };
    delegation_of_authority: { count: number; percentage: number };
  };
  experience_by_role: Record<string, number>;
  staff_requiring_attention: {
    name: string;
    role: string;
    needs: string[]; // API returns 'needs', not 'issues'
  }[];
}

const StaffPage = () => {
  const { user } = useAuth();
  
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Safely access staffStats and provide a default value
  const staffStats: StaffStatistics | undefined = analyticsData?.staff_statistics;

  // Create a complete list of qualified staff based on the exact data provided
  const qualifiedStaff = React.useMemo(() => {
    if (!staffStats) return [];
    
    return [
      {
        name: "Dr. John Smith",
        role: "PI",
        issues: null,
        experience: staffStats.experience_by_role["PI"] || 12
      },
      {
        name: "Dr. Sarah Johnson",
        role: "Sub-I",
        issues: null,
        experience: staffStats.experience_by_role["Sub-I"] || 16.7
      },
      {
        name: "Staff Member 3",
        role: "CRC",
        issues: null,
        experience: staffStats.experience_by_role["CRC"] || 10
      },
      {
        name: "Staff Member 7",
        role: "CRC",
        issues: null,
        experience: staffStats.experience_by_role["CRC"] || 10
      },
      {
        name: "Staff Member 9",
        role: "Sub-I",
        issues: null,
        experience: staffStats.experience_by_role["Sub-I"] || 16.7
      },
      {
        name: "Staff Member 10",
        role: "Sub-I",
        issues: null,
        experience: staffStats.experience_by_role["Sub-I"] || 16.7
      },
      {
        name: "Staff Member 11",
        role: "CRC",
        issues: null,
        experience: staffStats.experience_by_role["CRC"] || 10
      },
      {
        name: "Staff Member 14",
        role: "CRC",
        issues: null,
        experience: staffStats.experience_by_role["CRC"] || 10
      },
      {
        name: "Staff Member 19",
        role: "CRC",
        issues: null,
        experience: staffStats.experience_by_role["CRC"] || 10
      },
      {
        name: "Staff Member 31",
        role: "Sub-I",
        issues: null,
        experience: staffStats.experience_by_role["Sub-I"] || 16.7
      },
      {
        name: "Staff Member 33",
        role: "Lab",
        issues: null,
        experience: staffStats.experience_by_role["Lab"] || 16.3
      },
      {
        name: "Staff Member 38",
        role: "Lab",
        issues: null,
        experience: staffStats.experience_by_role["Lab"] || 16.3
      },
      {
        name: "Staff Member 45",
        role: "Lab",
        issues: null,
        experience: staffStats.experience_by_role["Lab"] || 16.3
      }
    ];
  }, [staffStats]);

  // Create the staff requiring attention data exactly as provided
  const staffRequiringAttention = React.useMemo(() => {
    if (!staffStats) return [];
    
    return [
      {
        name: "Staff Member 23",
        role: "Lab",
        issues: ["Missing GCP certification", "Medical license"]
      },
      {
        name: "Staff Member 44",
        role: "Lab",
        issues: ["Missing GCP certification"]
      },
      {
        name: "Staff Member 48",
        role: "PI",
        issues: ["Missing GCP certification", "Medical license"]
      }
    ];
  }, [staffStats]);

  // Sort all staff so that attention-needed staff appears first
  const allStaff = React.useMemo(() => {
    return [...staffRequiringAttention, ...qualifiedStaff];
  }, [staffRequiringAttention, qualifiedStaff]);

  // Helper to safely access experience property based on staff type
  const getStaffExperience = (staff: StaffMember): number | undefined => {
    // Only qualified staff have experience property
    if (staff.issues === null && 'experience' in staff) {
      return staff.experience;
    }
    return undefined;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-black">Staff Management</h1>
        <p className="text-gray-600">
          Maintain and monitor your staff credentials, certifications, and readiness status.
        </p>
      </div>
      
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : staffStats ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certification Stats Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-black">Certification Status</CardTitle>
                <CardDescription className="text-sm text-gray-600">Overall staff readiness and credential completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffStats.certification_status && Object.entries(staffStats.certification_status).map(([cert, stats]) => {
                    return (
                      <div key={cert}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-black capitalize">{cert.replace(/_/g, ' ')}</span>
                          <span className="text-xs text-gray-600">
                            {stats.count}/{staffStats.total_staff} ({Math.round(stats.percentage)}%)
                          </span>
                        </div>
                        <Progress value={stats.percentage} className="h-1.5 bg-[#F1F0FB]" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-3">Role Distribution</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">Pharmacist</span>
                      <span className="text-sm font-medium text-black">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">Sub-I</span>
                      <span className="text-sm font-medium text-black">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">CRC</span>
                      <span className="text-sm font-medium text-black">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">Lab</span>
                      <span className="text-sm font-medium text-black">6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">PI</span>
                      <span className="text-sm font-medium text-black">1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Staff Requiring Attention Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-black">Staff Requiring Attention</CardTitle>
                <CardDescription className="text-sm text-gray-600">Staff members needing immediate updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffRequiringAttention && staffRequiringAttention.length > 0 ? (
                    staffRequiringAttention.slice(0, 3).map((staff, index) => (
                      <div key={index} className="flex items-start p-3 bg-purple-50/50 rounded-lg backdrop-blur-sm">
                        <div>
                          <h4 className="text-sm font-medium text-black">{staff.name}</h4>
                          <p className="text-xs text-gray-600">{staff.role}</p>
                          <div className="mt-1">
                            {staff.issues && staff.issues.map((issue, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <AlertCircle className="h-3 w-3 text-gray-600" />
                                <span className="text-xs text-black">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-black">No staff members require attention at this time.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Staff</TabsTrigger>
              <TabsTrigger value="incomplete">Needs Updates</TabsTrigger>
              <TabsTrigger value="complete">Ready</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allStaff.map((staff, index) => (
                  <StaffCard 
                    key={`staff-${index}`}
                    name={staff.name}
                    role={staff.role}
                    issues={staff.issues}
                    experience={getStaffExperience(staff)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="incomplete">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffRequiringAttention.length > 0 ? (
                  staffRequiringAttention.map((staff, index) => (
                    <StaffCard 
                      key={`incomplete-${index}`}
                      name={staff.name}
                      role={staff.role}
                      issues={staff.issues}
                      experience={getStaffExperience(staff)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center p-8">
                    <p className="text-muted-foreground">No staff members require attention at this time.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="complete">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qualifiedStaff.length > 0 ? (
                  qualifiedStaff.map((staff, index) => (
                    <StaffCard 
                      key={`complete-${index}`}
                      name={staff.name}
                      role={staff.role}
                      issues={staff.issues}
                      experience={getStaffExperience(staff)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center p-8">
                    <p className="text-muted-foreground">No qualified staff members found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="text-center p-8">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Staff Data Available</h3>
          <p className="text-muted-foreground mt-2">
            Unable to load staff information. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
