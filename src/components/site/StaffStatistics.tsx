
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Users, AlertTriangle, Award, Clock } from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface StaffRole {
  name: string;
  value: number;
}

interface CertificationData {
  name: string;
  count: number;
  percentage: number;
}

interface StaffMemberAttention {
  name: string;
  role: string;
  needs: string[];
}

interface StaffExperience {
  role: string;
  years: number;
}

interface StaffStatisticsProps {
  staffStats: {
    total_staff: number;
    role_distribution: Record<string, number>;
    certification_status: {
      cv_uploaded: { count: number; percentage: number };
      gcp_certified: { count: number; percentage: number };
      medical_license: { count: number; percentage: number };
      delegation_of_authority: { count: number; percentage: number };
    };
    experience_by_role: Record<string, number>;
    staff_requiring_attention: StaffMemberAttention[];
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const StaffStatistics: React.FC<StaffStatisticsProps> = ({ staffStats }) => {
  // Transform role distribution for chart
  const roleData: StaffRole[] = Object.entries(staffStats.role_distribution).map(([name, value]) => ({
    name,
    value
  }));

  // Transform certification data for chart
  const certificationData: CertificationData[] = [
    { 
      name: 'CV Uploaded', 
      count: staffStats.certification_status.cv_uploaded.count,
      percentage: staffStats.certification_status.cv_uploaded.percentage
    },
    { 
      name: 'GCP Certified', 
      count: staffStats.certification_status.gcp_certified.count,
      percentage: staffStats.certification_status.gcp_certified.percentage
    },
    { 
      name: 'Medical License', 
      count: staffStats.certification_status.medical_license.count,
      percentage: staffStats.certification_status.medical_license.percentage
    },
    { 
      name: 'Delegation of Authority', 
      count: staffStats.certification_status.delegation_of_authority.count,
      percentage: staffStats.certification_status.delegation_of_authority.percentage
    }
  ];

  // Transform experience data for chart
  const experienceData: StaffExperience[] = Object.entries(staffStats.experience_by_role).map(([role, years]) => ({
    role,
    years
  }));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Staff Overview ({staffStats.total_staff} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role Distribution Chart */}
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Role Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} staff`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Experience by Role */}
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Experience by Role (Years)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={experienceData}>
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} years`, 'Experience']} />
                  <Bar dataKey="years" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Certification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certificationData.map((cert, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cert.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {cert.count}/{staffStats.total_staff} ({cert.percentage}%)
                  </span>
                </div>
                <Progress value={cert.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Staff Requiring Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          {staffStats.staff_requiring_attention.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No issues found</AlertTitle>
              <AlertDescription>
                All staff members are up to date with their certifications and roles.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {staffStats.staff_requiring_attention.slice(0, 5).map((staff, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
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
              
              {staffStats.staff_requiring_attention.length > 5 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {staffStats.staff_requiring_attention.length - 5} more staff members require attention.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StaffStatistics;
