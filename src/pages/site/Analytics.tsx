import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";

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

  // Calculate site readiness percentage manually since it's not included in the API response
  const calculateSiteReadiness = () => {
    if (!analytics.site_readiness) return 0;
    
    const readinessItems = Object.values(analytics.site_readiness);
    const totalItems = readinessItems.length;
    if (totalItems === 0) return 0;
    
    const readyItems = readinessItems.filter(item => item === true).length;
    return Math.round((readyItems / totalItems) * 100);
  };

  const siteReadinessPercentage = calculateSiteReadiness();

  // Rest of the analytics components without the Staff Requiring Attention section
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Site Analytics</h1>
        <p className="text-muted-foreground">
          Overview of site performance and key metrics
        </p>
      </div>

      {/* Site Readiness Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Site Readiness Overview</CardTitle>
          <CardDescription>Current status of your site's readiness for clinical trials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Readiness</span>
                <span className="font-medium">{siteReadinessPercentage}%</span>
              </div>
              <Progress value={siteReadinessPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.site_readiness && Object.entries(analytics.site_readiness).map(([category, value]) => (
                <div key={category} className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2 capitalize">{category.replace(/_/g, ' ')}</div>
                  <div className="text-sm font-medium">
                    {value === true ? (
                      <span className="text-green-600">Complete</span>
                    ) : value === "warning" ? (
                      <span className="text-amber-600">Warning</span>
                    ) : (
                      <span className="text-red-600">Incomplete</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Demographics</CardTitle>
          <CardDescription>Overview of patient population and enrollment statistics</CardDescription>
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
                        <div className="w-1/2 bg-muted rounded-full h-2 ml-2">
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
                      <div key={gender} className="bg-muted/50 p-4 rounded-lg text-center">
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
                  <Progress 
                    value={50} 
                    className="h-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Screening Failure</div>
                    <div className="text-xl font-bold">12%</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Dropout Rate</div>
                    <div className="text-xl font-bold">5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation Status</CardTitle>
          <CardDescription>Status of essential documents and regulatory filings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Essential Documents</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">Informed Consent Form</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Complete</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">Site Qualification Questionnaire</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Complete</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">Financial Disclosure Form</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">Pending</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Regulatory Filings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">IRB Application</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Approved</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">Protocol Amendment</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Submitted</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-sm">Safety Report</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">Pending</span>
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
