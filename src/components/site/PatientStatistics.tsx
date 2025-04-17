
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell,
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Activity, Users } from 'lucide-react';

interface PatientStatisticsProps {
  patientStats: {
    total_patients: number;
    age_distribution: Record<string, { count: number; percentage: number }>;
    gender_distribution: Record<string, { count: number; percentage: number }>;
    ethnicity_distribution: Record<string, { count: number; percentage: number }>;
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

  const ethnicityData = Object.entries(patientStats.ethnicity_distribution)
    .map(([ethnicity, { percentage }]) => ({
      name: formatKeyToLabel(ethnicity),
      percentage
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Patient Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Patient Demographics ({patientStats.total_patients} total)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Age Distribution */}
            <div>
              <h3 className="text-lg font-medium mb-2">Age Distribution</h3>
              <div className="space-y-2">
                {Object.entries(patientStats.age_distribution).map(([range, data]) => (
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
            
            {/* Gender Distribution */}
            <div>
              <h3 className="text-lg font-medium mb-2">Gender Distribution</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(patientStats.gender_distribution).map(([gender, data]) => (
                  <div key={gender} className="bg-[#F1F0FB] p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1 capitalize">{formatKeyToLabel(gender)}</div>
                    <div className="text-2xl font-bold">{data.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ethnicity Distribution */}
            <div>
              <h3 className="text-lg font-medium mb-2">Ethnicity Distribution</h3>
              <div className="space-y-2">
                {ethnicityData.map(({ name, percentage }) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm">{name}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                    <div className="w-1/2 bg-[#F1F0FB] rounded-full h-2 ml-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
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

export default PatientStatistics;
