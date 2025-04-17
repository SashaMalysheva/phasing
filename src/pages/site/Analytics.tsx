
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  AlertCircle, Users, CheckSquare, AlertTriangle, 
  FileCheck, FileX, CheckCircle2, XCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, Bar, XAxis, YAxis, 
  Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

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
      },
      {
        name: "Staff Member 7",
        role: "Pharmacist",
        needs: ["GCP certification", "Role update or reassignment"]
      },
      {
        name: "Staff Member 9",
        role: "Sub-I",
        needs: ["Role update or reassignment"]
      },
      {
        name: "Staff Member 10",
        role: "Sub-I",
        needs: ["GCP certification", "Role update or reassignment"]
      },
      {
        name: "Staff Member 11",
        role: "CRC",
        needs: ["Role update or reassignment"]
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
    }
  },
  site_readiness: {
    documentation: {
      data_privacy_policy: true,
      source_agreement: true,
      sops_storage_monitoring: false,
      eregulatory_binders: true,
      source_templates: true,
      iata_certification: false,
      clinical_trial_agreement: true,
      site_qualification_questionnaire: true
    },
    equipment: {
      refrigerator_freezer: true,
      temperature_monitoring: true,
      centrifuge: true,
      backup_generator: true,
      biomedical_waste_disposal: true,
      laboratory_equipment: true,
      pharmacy_storage: true,
      shipping_materials: false,
      secure_file_storage: true,
      internet_connectivity: true
    }
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const GENDER_COLORS = {
  male: '#3b82f6',
  female: '#ec4899'
};

const formatKeyToLabel = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getStatusIcon = (status: boolean) => {
  if (status) {
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  } else {
    return <XCircle className="h-5 w-5 text-red-500" />;
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

  // Ensure analytics data is available before proceeding
  if (!analytics) {
    return (
      <Alert className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          No analytics data is currently available. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // Transform gender data for chart
  const genderData = Object.entries(analytics.patient_statistics.gender_distribution).map(([gender, data]) => ({
    name: formatKeyToLabel(gender),
    value: data.count
  }));

  // Transform age data for chart
  const ageData = Object.entries(analytics.patient_statistics.age_distribution).map(([range, data]) => ({
    name: range,
    value: data.count
  }));

  // Get document and equipment counts
  const docStats = analytics && analytics.site_readiness && analytics.site_readiness.documentation ? {
    total: Object.keys(analytics.site_readiness.documentation).length,
    ready: Object.values(analytics.site_readiness.documentation).filter(Boolean).length
  } : { total: 0, ready: 0 };

  const equipStats = analytics && analytics.site_readiness && analytics.site_readiness.equipment ? {
    total: Object.keys(analytics.site_readiness.equipment).length,
    ready: Object.values(analytics.site_readiness.equipment).filter(Boolean).length
  } : { total: 0, ready: 0 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive view of your site's staff, patients, and readiness metrics.
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Staff Requiring Attention - First and Most Important */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Staff Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.staff_statistics.staff_requiring_attention.length === 0 ? (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>No issues found</AlertTitle>
                <AlertDescription>
                  All staff members are up to date with their certifications and roles.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground mb-2">
                  {analytics.staff_statistics.staff_requiring_attention.length} of {analytics.staff_statistics.total_staff} staff members need attention
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analytics.staff_statistics.staff_requiring_attention.map((staff, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <h4 className="font-medium">{staff.name}</h4>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                      <ul className="mt-2 space-y-1">
                        {staff.needs.map((need, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <AlertCircle className="h-3 w-3 mr-2 text-amber-500" />
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Certification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.staff_statistics.certification_status).map(([cert, status]) => (
                  <div key={cert} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{formatKeyToLabel(cert)}</span>
                      <span className="text-sm text-muted-foreground">
                        {status.count}/{analytics.staff_statistics.total_staff} ({status.percentage}%)
                      </span>
                    </div>
                    <Progress value={status.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Demographics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Patient Demographics ({analytics.patient_statistics.total_patients} total)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age Distribution */}
                <div className="h-32">
                  <h3 className="text-sm font-medium mb-1">Age Distribution</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis hide />
                      <RechartsTooltip formatter={(value) => [`${value} patients`, 'Count']} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gender Distribution */}
                <div className="h-32">
                  <h3 className="text-sm font-medium mb-1">Gender Distribution</h3>
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-4 mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">Male: {analytics.patient_statistics.gender_distribution.male.count} ({analytics.patient_statistics.gender_distribution.male.percentage}%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                          <span className="text-sm">Female: {analytics.patient_statistics.gender_distribution.female.count} ({analytics.patient_statistics.gender_distribution.female.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-l-full" 
                          style={{ width: `${analytics.patient_statistics.gender_distribution.male.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Site Readiness Overview */}
        {analytics.site_readiness && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Site Readiness Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Documentation Status */}
                {analytics.site_readiness.documentation && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Documentation Status</h3>
                      <span className="text-xl font-bold">{docStats.ready}/{docStats.total}</span>
                    </div>
                    <Progress 
                      value={(docStats.ready / docStats.total) * 100} 
                      className="h-2 mb-4"
                    />
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead className="w-[100px] text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(analytics.site_readiness.documentation).map(([doc, status]) => (
                          <TableRow key={doc}>
                            <TableCell className="font-medium">{formatKeyToLabel(doc)}</TableCell>
                            <TableCell className="text-right">{getStatusIcon(status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                
                {/* Equipment Status */}
                {analytics.site_readiness.equipment && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Equipment Status</h3>
                      <span className="text-xl font-bold">{equipStats.ready}/{equipStats.total}</span>
                    </div>
                    <Progress 
                      value={(equipStats.ready / equipStats.total) * 100} 
                      className="h-2 mb-4"
                    />
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equipment</TableHead>
                          <TableHead className="w-[100px] text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(analytics.site_readiness.equipment).map(([item, status]) => (
                          <TableRow key={item}>
                            <TableCell className="font-medium">{formatKeyToLabel(item)}</TableCell>
                            <TableCell className="text-right">{getStatusIcon(status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SiteAnalytics;
