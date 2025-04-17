
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, User } from "lucide-react";
import StaffCard from "@/components/site/StaffCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";
import { Badge } from "@/components/ui/badge";

const StaffPage = () => {
  const { user } = useAuth();
  
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
    enabled: !!user?.id,
  });
  
  const staffStats = analyticsData?.staff_statistics;
  
  // Calculate the number of ready staff members
  const readyStaff = staffStats ? staffStats.total_staff - staffStats.staff_requiring_attention.length : 0;
  
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
          {/* Staff Requiring Attention Section */}
          <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-900">Staff Requiring Attention</CardTitle>
              <CardDescription>Staff members needing immediate updates or action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffStats.staff_requiring_attention.length === 0 ? (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-green-600">All staff members are up to date!</p>
                  </div>
                ) : (
                  staffStats.staff_requiring_attention.map((staff, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-purple-50/50 rounded-lg backdrop-blur-sm">
                      <div>
                        <h4 className="font-medium text-purple-900">{staff.name}</h4>
                        <p className="text-sm text-purple-700">{staff.role}</p>
                        <div className="mt-2 space-y-1">
                          {staff.needs.map((need, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-purple-500" />
                              <span className="text-sm text-purple-700">{need}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Action Needed
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Certification Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="text-purple-900">Certification Status</CardTitle>
                  <CardDescription>
                    Overall staff readiness and credential completion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-purple-800">Ready Staff Members</span>
                        <span className="text-purple-700">{readyStaff}/{staffStats.total_staff}</span>
                      </div>
                      <Progress 
                        value={(readyStaff / staffStats.total_staff) * 100} 
                        className="h-2 mb-6 bg-purple-100"
                      />
                      
                      <div className="space-y-4">
                        {Object.entries(staffStats.certification_status).map(([cert, status]) => (
                          <div key={cert}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-purple-800">{cert.replace(/_/g, ' ')}</span>
                              <span className="text-sm text-purple-600">{status.count}/{staffStats.total_staff} ({status.percentage}%)</span>
                            </div>
                            <Progress 
                              value={status.percentage} 
                              className="h-2 bg-purple-100"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-purple-900 mb-4">Experience by Role</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {staffStats.experience_by_role && Object.entries(staffStats.experience_by_role).map(([role, years]) => (
                          <div key={role} className="bg-purple-50/50 rounded-lg p-3 text-center backdrop-blur-sm">
                            <div className="font-medium text-purple-900">{role}</div>
                            <div className="text-xs text-purple-600">
                              {staffStats.role_distribution[role] || 0} staff • {years} yrs avg
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <SiteStaffCard staffStats={staffStats} />
            </div>
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
