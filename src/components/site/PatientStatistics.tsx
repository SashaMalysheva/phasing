
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface PatientStatisticsProps {
  patientStats: {
    total_patients: number;
    age_distribution: Record<string, { count: number; percentage: number }>;
    gender_distribution: Record<string, { count: number; percentage: number }>;
    ethnicity_distribution: Record<string, { count: number; percentage: number }>;
  };
}

const formatKeyToLabel = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const PatientStatistics: React.FC<PatientStatisticsProps> = ({ patientStats }) => {
  const ethnicityData = Object.entries(patientStats.ethnicity_distribution)
    .map(([ethnicity, { percentage }]) => ({
      name: formatKeyToLabel(ethnicity),
      percentage
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="container mx-auto p-6 space-y-6">
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
            
            {/* Enrollment Status */}
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
