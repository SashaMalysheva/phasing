
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell,
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Activity, Users, Thermometer, Heart, Pill, TestTube } from 'lucide-react';

interface PatientStatisticsProps {
  patientStats: {
    total_patients: number;
    age_distribution: Record<string, { count: number; percentage: number }>;
    gender_distribution: Record<string, { count: number; percentage: number }>;
    ethnicity_distribution: Record<string, { count: number; percentage: number }>;
    prior_therapies: Record<string, { count: number; percentage: number }>;
    lab_results_distribution?: {
      platelets: Record<string, { count: number; percentage: number }>;
      hemoglobin: Record<string, { count: number; percentage: number }>;
      neutrophils: Record<string, { count: number; percentage: number }>;
      liver_function: Record<string, { count: number; percentage: number }>;
      kidney_function: Record<string, { count: number; percentage: number }>;
    };
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
const GENDER_COLORS = {
  male: '#3b82f6',
  female: '#ec4899',
  other: '#8884d8'
};

const formatKeyToLabel = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const PatientStatistics: React.FC<PatientStatisticsProps> = ({ patientStats }) => {
  // Transform data for charts
  const ageData = Object.entries(patientStats.age_distribution).map(([range, { count }]) => ({
    name: range,
    value: count
  }));

  const genderData = Object.entries(patientStats.gender_distribution).map(([gender, { count }]) => ({
    name: formatKeyToLabel(gender),
    value: count
  }));

  const therapiesData = Object.entries(patientStats.prior_therapies)
    .map(([therapy, { count }]) => ({
      name: formatKeyToLabel(therapy),
      value: count
    }))
    .sort((a, b) => b.value - a.value);

  // Transform lab data
  const transformLabData = (labCategory: Record<string, { count: number; percentage: number }>) => {
    return Object.entries(labCategory).map(([status, { count }]) => ({
      name: formatKeyToLabel(status),
      value: count
    }));
  };

  return (
    <div className="space-y-6">
      {/* Patient Demographics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Patient Demographics ({patientStats.total_patients} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Age Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  <Bar dataKey="value" fill="#8884d8" background={{ fill: '#F1F0FB' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gender Distribution */}
            <div className="h-64">
              <h3 className="text-lg font-medium mb-2">Gender Distribution</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={GENDER_COLORS[entry.name.toLowerCase() as keyof typeof GENDER_COLORS] || COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prior Therapies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Treatment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={therapiesData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Bar dataKey="value" fill="#82ca9d" background={{ fill: '#F1F0FB' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lab Results Section */}
      {patientStats.lab_results_distribution && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TestTube className="mr-2 h-5 w-5" />
              Laboratory Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="platelets">
              <TabsList className="mb-4">
                <TabsTrigger value="platelets">Platelets</TabsTrigger>
                <TabsTrigger value="hemoglobin">Hemoglobin</TabsTrigger>
                <TabsTrigger value="neutrophils">Neutrophils</TabsTrigger>
                <TabsTrigger value="liver">Liver Function</TabsTrigger>
                <TabsTrigger value="kidney">Kidney Function</TabsTrigger>
              </TabsList>

              <TabsContent value="platelets">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformLabData(patientStats.lab_results_distribution.platelets)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transformLabData(patientStats.lab_results_distribution.platelets).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="hemoglobin">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformLabData(patientStats.lab_results_distribution.hemoglobin)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transformLabData(patientStats.lab_results_distribution.hemoglobin).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="neutrophils">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformLabData(patientStats.lab_results_distribution.neutrophils)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transformLabData(patientStats.lab_results_distribution.neutrophils).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="liver">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformLabData(patientStats.lab_results_distribution.liver_function)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transformLabData(patientStats.lab_results_distribution.liver_function).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="kidney">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformLabData(patientStats.lab_results_distribution.kidney_function)}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {transformLabData(patientStats.lab_results_distribution.kidney_function).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientStatistics;
