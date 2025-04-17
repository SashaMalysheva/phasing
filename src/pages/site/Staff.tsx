
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  User, 
  FileCheck, 
  UserCheck,
  Clock,
  CheckCircle2
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StaffCard from "@/components/site/StaffCard";

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
          {/* Certification Overview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Certification Status</CardTitle>
              <CardDescription>
                Overall staff readiness and credential completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Ready Staff Members</span>
                    <span>{staffStats.ready_staff}/{staffStats.total_staff}</span>
                  </div>
                  <Progress 
                    value={(staffStats.ready_staff / staffStats.total_staff) * 100} 
                    className="h-2 mb-6"
                  />
                  
                  <div className="space-y-4">
                    {Object.entries(staffStats.certifications).map(([cert, status]) => (
                      <div key={cert}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{cert.replace(/_/g, ' ')}</span>
                          <span className="text-sm">{status.complete}/{status.total}</span>
                        </div>
                        <Progress 
                          value={(status.complete / status.total) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Experience by Role</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(staffStats.staff_by_role).map(([role, data]) => (
                      <div key={role} className="bg-muted rounded-lg p-3 text-center">
                        <div className="font-medium">{role}</div>
                        <div className="text-xs text-muted-foreground">
                          {data.count} staff • {data.avg_experience} yrs avg
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Invite New Staff Member
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Staff Members List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Staff</TabsTrigger>
              <TabsTrigger value="incomplete">Needs Updates</TabsTrigger>
              <TabsTrigger value="complete">Ready</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Show all staff here */}
                {staffStats.incomplete_staff.map((staff, index) => (
                  <StaffCard 
                    key={`incomplete-${index}`}
                    name={staff.name}
                    role={staff.role}
                    isComplete={false}
                    missingItems={staff.missing}
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
                {staffStats.incomplete_staff.map((staff, index) => (
                  <StaffCard 
                    key={`incomplete-${index}`}
                    name={staff.name}
                    role={staff.role}
                    isComplete={false}
                    missingItems={staff.missing}
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
