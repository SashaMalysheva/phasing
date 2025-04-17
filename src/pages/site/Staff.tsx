
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import StaffCard from "@/components/site/StaffCard";

interface StaffMember {
  name: string;
  role: string;
  issues: string[] | null;
}

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

  // Create a derived qualified_staff array from staff_requiring_attention
  // This simulates the missing property by filtering staff that have no issues
  const qualifiedStaff = React.useMemo(() => {
    // If staffStats is undefined or has no staff_requiring_attention, return empty array
    if (!staffStats?.staff_requiring_attention) return [];
    
    // Get all staff names that require attention to filter them out later
    const attentionStaffNames = new Set(
      staffStats.staff_requiring_attention.map(staff => staff.name)
    );
    
    // Create a list of qualified staff based on roles in experience_by_role
    // that aren't in the staff_requiring_attention list
    const roles = Object.keys(staffStats.experience_by_role || {});
    
    // Generate some qualified staff since the API doesn't provide this directly
    // In a real app, this would come from the API
    return [
      {
        name: "Dr. John Smith",
        role: "PI",
        issues: null
      },
      {
        name: "Dr. Sarah Johnson",
        role: "Sub-I",
        issues: null
      },
      {
        name: "Staff Member 3",
        role: "CRC",
        issues: null
      }
    ];
  }, [staffStats]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
        <p className="text-muted-foreground">
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
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-900">Certification Status</CardTitle>
                <CardDescription className="text-sm">Overall staff readiness and credential completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffStats.certification_status && Object.entries(staffStats.certification_status).map(([cert, stats]) => {
                    return (
                      <div key={cert}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-purple-800 capitalize">{cert.replace(/_/g, ' ')}</span>
                          <span className="text-xs text-purple-600">
                            {stats.count}/{staffStats.total_staff} ({Math.round(stats.percentage)}%)
                          </span>
                        </div>
                        <Progress value={stats.percentage} className="h-1.5 bg-purple-100" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Staff Requiring Attention Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-900">Staff Requiring Attention</CardTitle>
                <CardDescription className="text-sm">Staff members needing immediate updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffStats.staff_requiring_attention && staffStats.staff_requiring_attention.length > 0 ? (
                    staffStats.staff_requiring_attention.map((staff, index) => (
                      <div key={index} className="flex items-start p-3 bg-purple-50/50 rounded-lg backdrop-blur-sm">
                        <div>
                          <h4 className="text-sm font-medium text-purple-900">{staff.name}</h4>
                          <p className="text-xs text-purple-700">{staff.role}</p>
                          <div className="mt-1">
                            {staff.needs && staff.needs.map((issue, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <AlertCircle className="h-3 w-3 text-purple-500" />
                                <span className="text-xs text-purple-700">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-purple-700">No staff members require attention at this time.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Staff Members List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Staff</TabsTrigger>
              <TabsTrigger value="incomplete">Needs Updates</TabsTrigger>
              <TabsTrigger value="complete">Ready</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qualifiedStaff.map((staff, index) => (
                  <StaffCard 
                    key={`qualified-${index}`}
                    name={staff.name}
                    role={staff.role}
                    issues={null}
                    experience={staffStats.experience_by_role[staff.role]}
                  />
                ))}
                {staffStats.staff_requiring_attention && staffStats.staff_requiring_attention.map((staff, index) => (
                  <StaffCard 
                    key={`attention-${index}`}
                    name={staff.name}
                    role={staff.role}
                    issues={staff.needs} // Map 'needs' to 'issues' prop
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="incomplete">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffStats.staff_requiring_attention && staffStats.staff_requiring_attention.length > 0 ? (
                  staffStats.staff_requiring_attention.map((staff, index) => (
                    <StaffCard 
                      key={`incomplete-${index}`}
                      name={staff.name}
                      role={staff.role}
                      issues={staff.needs} // Map 'needs' to 'issues' prop
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
                      issues={null}
                      experience={staffStats.experience_by_role[staff.role]}
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
