
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Users } from "lucide-react";

const SiteAnalytics = () => {
  const { user } = useAuth();
  
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Analytics Data Available</h3>
        <p className="text-muted-foreground mt-2">
          Unable to load analytics information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patient Analytics</h1>
        <p className="text-muted-foreground">
          Overview of patient demographics and key metrics
        </p>
      </div>

      {/* Patient Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Patient Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.patient_statistics && (
              <>
                <div>
                  <h3 className="text-lg font-medium mb-2">Age Distribution</h3>
                  <div className="space-y-2">
                    {analytics.patient_statistics.age_distribution && Object.entries(analytics.patient_statistics.age_distribution).map(([range, data]) => (
                      <div key={range} className="flex justify-between items-center">
                        <span className="text-sm">{range}</span>
                        <span className="text-sm font-medium">{data.percentage}%</span>
                        <div className="w-1/2 bg-[#F1F0FB] rounded-full h-2 ml-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Gender Distribution</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {analytics.patient_statistics.gender_distribution && Object.entries(analytics.patient_statistics.gender_distribution).map(([gender, data]) => (
                      <div key={gender} className="bg-[#F1F0FB] p-4 rounded-lg text-center">
                        <div className="text-sm text-muted-foreground mb-1 capitalize">{gender}</div>
                        <div className="text-2xl font-bold">{data.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div>
              <h3 className="text-lg font-medium mb-2">Enrollment Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Enrollment</span>
                    <span>15/30</span>
                  </div>
                  <div className="w-full bg-[#F1F0FB] rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F1F0FB] p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Screening Failure</div>
                    <div className="text-xl font-bold">12%</div>
                  </div>
                  <div className="bg-[#F1F0FB] p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Dropout Rate</div>
                    <div className="text-xl font-bold">5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteAnalytics;

