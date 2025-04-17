
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

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
                <span className="font-medium">{analytics.site_readiness?.overall_percentage || 0}%</span>
              </div>
              <Progress value={analytics.site_readiness?.overall_percentage || 0} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analytics.site_readiness?.categories && Object.entries(analytics.site_readiness.categories).map(([category, value]) => (
                <div key={category} className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2 capitalize">{category.replace(/_/g, ' ')}</div>
                  <div className="text-2xl font-bold mb-1">{(value as any)?.percentage || 0}%</div>
                  <Progress value={(value as any)?.percentage || 0} className="h-1.5" />
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
            <div>
              <h3 className="text-lg font-medium mb-2">Age Distribution</h3>
              <div className="space-y-2">
                {analytics.patient_demographics?.age_distribution && Object.entries(analytics.patient_demographics.age_distribution).map(([range, percentage]) => (
                  <div key={range} className="flex justify-between items-center">
                    <span className="text-sm">{range}</span>
                    <span className="text-sm font-medium">{String(percentage)}%</span>
                    <div className="w-1/2 bg-muted rounded-full h-2 ml-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Gender Distribution</h3>
              <div className="grid grid-cols-2 gap-4">
                {analytics.patient_demographics?.gender_distribution && Object.entries(analytics.patient_demographics.gender_distribution).map(([gender, percentage]) => (
                  <div key={gender} className="bg-muted/50 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1 capitalize">{gender}</div>
                    <div className="text-2xl font-bold">{String(percentage)}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Enrollment Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Enrollment</span>
                    <span>{analytics.enrollment_statistics?.current || 0}/{analytics.enrollment_statistics?.target || 0}</span>
                  </div>
                  <Progress 
                    value={((analytics.enrollment_statistics?.current || 0) / (analytics.enrollment_statistics?.target || 1)) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Screening Failure</div>
                    <div className="text-xl font-bold">{analytics.enrollment_statistics?.screening_failure_rate || 0}%</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Dropout Rate</div>
                    <div className="text-xl font-bold">{analytics.enrollment_statistics?.dropout_rate || 0}%</div>
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
                {analytics.documentation_status?.essential_documents && Object.entries(analytics.documentation_status.essential_documents).map(([doc, status]) => (
                  <div key={doc} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-sm capitalize">{doc.replace(/_/g, ' ')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      status === 'complete' ? 'bg-green-100 text-green-800' : 
                      status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {String(status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Regulatory Filings</h3>
              <div className="space-y-2">
                {analytics.documentation_status?.regulatory_filings && Object.entries(analytics.documentation_status.regulatory_filings).map(([filing, status]) => (
                  <div key={filing} className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-sm capitalize">{filing.replace(/_/g, ' ')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      status === 'approved' ? 'bg-green-100 text-green-800' : 
                      status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                      status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {String(status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteAnalytics;
