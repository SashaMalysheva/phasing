
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import PatientStatistics from "@/components/site/PatientStatistics";
import ClinicalSummary from "@/components/site/ClinicalSummary";

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
      {analytics.patient_statistics && (
        <PatientStatistics patientStats={analytics.patient_statistics} />
      )}

      {/* Clinical Summary */}
      <ClinicalSummary />
    </div>
  );
};

export default SiteAnalytics;
