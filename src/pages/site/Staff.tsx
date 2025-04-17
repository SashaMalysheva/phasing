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
import { Badge } from "@/components/ui/badge";

const StaffPage = () => {
  const { user } = useAuth();
  
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
    enabled: !!user?.id,
  });
  
  const staffStats = analyticsData?.staff_statistics;

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
            {/* Certification Status Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-purple-900">Certification Status</CardTitle>
                <CardDescription className="text-sm">Overall staff readiness and credential completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(staffStats.certification_status).map(([cert, status]) => (
                    <div key={cert}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-purple-800 capitalize">{cert.replace(/_/g, ' ')}</span>
                        <span className="text-xs text-purple-600">
                          {status.count}/{staffStats.total_staff} ({status.percentage}%)
                        </span>
                      </div>
                      <Progress value={status.percentage} className="h-1.5 bg-purple-100" />
                    </div>
                  ))}
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
                  {[
                    {
                      name: "Dr. John Smith",
                      role: "Principal Investigator",
                      needs: ["Role update or reassignment"]
                    },
                    {
                      name: "Dr. Sarah Johnson",
                      role: "Sub-Investigator",
                      needs: ["Role update or reassignment"]
                    },
                    {
                      name: "Staff Member 3",
                      role: "Pharmacist",
                      needs: ["GCP certification"]
                    }
                  ].map((staff, index) => (
                    <div key={index} className="flex items-start p-3 bg-purple-50/50 rounded-lg backdrop-blur-sm">
                      <div>
                        <h4 className="text-sm font-medium text-purple-900">{staff.name}</h4>
                        <p className="text-xs text-purple-700">{staff.role}</p>
                        <div className="mt-1">
                          {staff.needs.map((need, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <AlertCircle className="h-3 w-3 text-purple-500" />
                              <span className="text-xs text-purple-700">{need}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Show staff needing updates */}
                {staffStats.staff_requiring_attention.map((staff, index) => (
                  <StaffCard 
                    key={`incomplete-${index}`}
                    name={staff.name}
                    role={staff.role}
                    isComplete={false}
                    missingItems={staff.needs}
                    documents={{
                      cv_uploaded: false,
                      gcp_certification: false,
                      medical_license: false,
                      delegation_of_authority: false,
                    }}
                  />
                ))}
                {/* Add some dummy complete staff */}
                <StaffCard 
                  name="Dr. Alice Roberts"
                  role="PI"
                  isComplete={true}
                  experience={15}
                />
                <StaffCard 
                  name="James Wilson"
                  role="CRC"
                  isComplete={true}
                  experience={8}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="incomplete">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffStats.staff_requiring_attention.map((staff, index) => (
                  <StaffCard 
                    key={`incomplete-${index}`}
                    name={staff.name}
                    role={staff.role}
                    isComplete={false}
                    missingItems={staff.needs}
                    documents={{
                      cv_uploaded: false,
                      gcp_certification: false,
                      medical_license: false,
                      delegation_of_authority: false,
                    }}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="complete">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Just some dummy complete staff */}
                <StaffCard 
                  name="Dr. Alice Roberts"
                  role="PI"
                  isComplete={true}
                  experience={15}
                />
                <StaffCard 
                  name="James Wilson"
                  role="CRC"
                  isComplete={true}
                  experience={8}
                />
                <StaffCard 
                  name="Dr. Michael Chen"
                  role="Sub-I"
                  isComplete={true}
                  experience={12}
                />
                <StaffCard 
                  name="Lisa Jackson"
                  role="Lab"
                  isComplete={true}
                  experience={5}
                />
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
