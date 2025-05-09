import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, Syringe } from 'lucide-react';

interface LabResult {
  name: string;
  categories: {
    name: string;
    percentage: number;
  }[];
}

interface Treatment {
  name: string;
  count: number;
  percentage: number;
}

interface ClinicalSummaryProps {
  labResults: {
    platelets: LabResult;
    hemoglobin: LabResult;
    neutrophils: LabResult;
    liver: LabResult;
    kidney: LabResult;
  };
  treatments: Treatment[];
}

const mockLabResults = {
  platelets: {
    name: "Platelets Status",
    categories: [
      { name: "Normal", percentage: 70 },
      { name: "Mild Thrombocytopenia", percentage: 20 },
      { name: "Moderate Thrombocytopenia", percentage: 10 }
    ]
  },
  hemoglobin: {
    name: "Hemoglobin Levels",
    categories: [
      { name: "Normal", percentage: 65 },
      { name: "Mild Anemia", percentage: 25 },
      { name: "Moderate Anemia", percentage: 10 }
    ]
  },
  neutrophils: {
    name: "Neutrophil Counts",
    categories: [
      { name: "Normal", percentage: 75 },
      { name: "Mild Neutropenia", percentage: 15 },
      { name: "Moderate Neutropenia", percentage: 10 }
    ]
  },
  liver: {
    name: "Liver Function",
    categories: [
      { name: "Normal", percentage: 80 },
      { name: "Mild Impairment", percentage: 15 },
      { name: "Moderate Impairment", percentage: 5 }
    ]
  },
  kidney: {
    name: "Kidney Function",
    categories: [
      { name: "Normal", percentage: 85 },
      { name: "Mild Impairment", percentage: 10 },
      { name: "Moderate Impairment", percentage: 5 }
    ]
  }
};

const mockTreatments: Treatment[] = [
  { name: "Chemotherapy", count: 150, percentage: 50 },
  { name: "Surgery", count: 120, percentage: 40 },
  { name: "Radiation", count: 90, percentage: 30 },
  { name: "Immunotherapy", count: 60, percentage: 20 },
  { name: "Biologics", count: 45, percentage: 15 },
  { name: "Gene Therapy", count: 30, percentage: 10 }
];

const ClinicalSummary: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lab Results Summary */}
        <Card className="h-[360px]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <TestTube className="mr-2 h-5 w-5" />
              Lab Results Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.values(mockLabResults).map((labResult) => (
                <div key={labResult.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-1/3">{labResult.name}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-full bg-[#F1F0FB] rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${labResult.categories[0].percentage}%` }}
                      />
                    </div>
                    <span className="text-sm w-12 text-right">{labResult.categories[0].percentage}%</span>
                  </div>
                </div>
              ))}
              <div className="text-xs text-muted-foreground mt-2">
                * Percentages show normal range values
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment History */}
        <Card className="h-[360px]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Syringe className="mr-2 h-5 w-5" />
              Treatment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Top 3 treatments with progress bars */}
              <div className="space-y-3">
                {mockTreatments.slice(0, 3).map((treatment) => (
                  <div key={treatment.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{treatment.name}</span>
                      <span>{treatment.count} patients</span>
                    </div>
                    <div className="w-full bg-[#F1F0FB] rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${treatment.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Other treatments in grid */}
              <div className="grid grid-cols-2 gap-2">
                {mockTreatments.slice(3).map((treatment) => (
                  <div key={treatment.name} className="bg-[#F1F0FB] p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">{treatment.name}</div>
                    <div className="text-lg font-bold">{treatment.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{treatment.count} patients</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalSummary;
