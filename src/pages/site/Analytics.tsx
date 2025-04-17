
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Users, CheckSquare, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StaffStatistics from "@/components/site/StaffStatistics";
import PatientStatistics from "@/components/site/PatientStatistics";

// Temporary mock data while API is being connected
const mockSiteAnalytics = {
  site_id: "b31ddcea-554c-42f0-9096-fd5b5c1ee137",
  site_name: "Site 0",
  staff_statistics: {
    total_staff: 16,
    role_distribution: {
      "Principal Investigator": 1,
      "Sub-Investigator": 1,
      "Pharmacist": 2,
      "Sub-I": 3,
      "CRC": 2,
      "Lab": 6,
      "PI": 1
    },
    certification_status: {
      cv_uploaded: {
        count: 8,
        percentage: 50.0
      },
      gcp_certified: {
        count: 8,
        percentage: 50.0
      },
      medical_license: {
        count: 11,
        percentage: 68.8
      },
      delegation_of_authority: {
        count: 4,
        percentage: 25.0
      }
    },
    experience_by_role: {
      "PI": 12.0,
      "Sub-I": 16.7,
      "CRC": 10.0,
      "Pharmacist": 4.0,
      "Lab": 16.3
    },
    staff_requiring_attention: [
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
        needs: ["GCP certification", "Role update or reassignment"]
      }
      // Additional staff entries would continue here
    ]
  },
  patient_statistics: {
    total_patients: 300,
    age_distribution: {
      "10-19": { count: 5, percentage: 1.7 },
      "20-29": { count: 28, percentage: 9.3 },
      "30-39": { count: 49, percentage: 16.3 },
      "40-49": { count: 34, percentage: 11.3 },
      "50-59": { count: 40, percentage: 13.3 },
      "60-69": { count: 42, percentage: 14.0 },
      "70-79": { count: 35, percentage: 11.7 },
      "80-89": { count: 42, percentage: 14.0 },
      "90-99": { count: 25, percentage: 8.3 }
    },
    gender_distribution: {
      "female": { count: 144, percentage: 48.0 },
      "male": { count: 156, percentage: 52.0 }
    },
    ethnicity_distribution: {
      "middle_eastern": { count: 60, percentage: 20.0 },
      "asian": { count: 66, percentage: 22.0 },
      "white": { count: 60, percentage: 20.0 },
      "not_recorded": { count: 56, percentage: 18.7 },
      "native_american": { count: 63, percentage: 21.0 },
      "mixed_or_other": { count: 56, percentage: 18.7 },
      "pacific_islander": { count: 44, percentage: 14.7 },
      "site_does_not_track_ethnicity": { count: 69, percentage: 23.0 },
      "hispanic_or_latino": { count: 46, percentage: 15.3 },
      "black_or_african_american": { count: 66, percentage: 22.0 }
    },
    prior_therapies: {
      "biologics": { count: 74, percentage: 24.7 },
      "standard_of_care": { count: 86, percentage: 28.7 },
      "radiation": { count: 83, percentage: 27.7 },
      "surgery": { count: 91, percentage: 30.3 },
      "gene_therapy": { count: 90, percentage: 30.0 },
      "experimental_agents": { count: 87, percentage: 29.0 },
      "chemo": { count: 87, percentage: 29.0 },
      "oral_medications": { count: 92, percentage: 30.7 },
      "immunotherapy": { count: 81, percentage: 27.0 }
    },
    lab_results_distribution: {
      "platelets": {
        "normal": { count: 99, percentage: 33.0 },
        "moderate_thrombocytopenia": { count: 92, percentage: 30.7 },
        "mild_thrombocytopenia": { count: 109, percentage: 36.3 }
      },
      "hemoglobin": {
        "moderate_anemia": { count: 101, percentage: 33.7 },
        "normal": { count: 101, percentage: 33.7 },
        "mild_anemia": { count: 98, percentage: 32.7 }
      },
      "neutrophils": {
        "mild_neutropenia": { count: 106, percentage: 35.3 },
        "moderate_neutropenia": { count: 110, percentage: 36.7 },
        "normal": { count: 84, percentage: 28.0 }
      },
      "liver_function": {
        "normal": { count: 110, percentage: 36.7 },
        "mild_impairment": { count: 92, percentage: 30.7 },
        "moderate_impairment": { count: 98, percentage: 32.7 }
      },
      "kidney_function": {
        "moderate_impairment": { count: 106, percentage: 35.3 },
        "normal": { count: 106, percentage: 35.3 },
        "mild_impairment": { count: 88, percentage: 29.3 }
      }
    }
  }
};

const SiteAnalytics = () => {
  const { toast } = useToast();
  
  // In a real implementation, we would fetch from the API
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ["siteAnalytics"],
    queryFn: async () => {
      // This would be replaced with a real API call
      // return await fetch('/api/v1/sites/{site_id}/analytics').then(res => res.json());
      return mockSiteAnalytics;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-lg">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading analytics",
      description: "There was a problem loading the site analytics. Please try again later.",
    });
    
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load analytics data. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive view of your site's staff, patients, and readiness metrics.
        </p>
      </div>
      
      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="readiness">Site Readiness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff" className="space-y-4">
          {analytics && <StaffStatistics staffStats={analytics.staff_statistics} />}
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          {analytics && <PatientStatistics patientStats={analytics.patient_statistics} />}
        </TabsContent>
        
        <TabsContent value="readiness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Site Readiness Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Implementation Note</AlertTitle>
                <AlertDescription>
                  This section will display site readiness metrics once the API endpoints are available.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Documentation Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">75%</p>
                    <p className="text-xs text-muted-foreground">6/8 required documents up-to-date</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Equipment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">90%</p>
                    <p className="text-xs text-muted-foreground">9/10 required equipment available</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteAnalytics;
