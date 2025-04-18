
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TrialEnrollment {
  name: string;
  enrolled: number;
  target: number;
  identifiedLeads: number;
  qualifiedPatients: number;
}

interface EnrollmentOverviewCardProps {
  trialCount: number;
  trials: TrialEnrollment[];
}

const EnrollmentOverviewCard: React.FC<EnrollmentOverviewCardProps> = ({
  trialCount,
  trials
}) => {
  // Calculate totals across all trials
  const totalEnrolled = trials.reduce((sum, trial) => sum + trial.enrolled, 0);
  const totalTarget = trials.reduce((sum, trial) => sum + trial.target, 0);
  const totalIdentifiedLeads = trials.reduce((sum, trial) => sum + trial.identifiedLeads, 0);
  const totalQualifiedPatients = trials.reduce((sum, trial) => sum + trial.qualifiedPatients, 0);
  
  const enrollmentPercentage = totalTarget > 0 ? Math.round((totalEnrolled / totalTarget) * 100) : 0;

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Enrollment Overview</span>
          <span className="text-sm font-medium text-gray-600">{trialCount} {trialCount === 1 ? 'trial' : 'trials'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Patients Enrolled</span>
            <span className="font-medium text-[#6E59A5]">
              {totalEnrolled} / {totalTarget}
            </span>
          </div>
          <Progress 
            value={enrollmentPercentage} 
            className="h-2 bg-purple-100"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col p-2 bg-purple-50/30 rounded-md items-center justify-center">
            <span className="font-medium text-[#6E59A5] text-lg">{totalIdentifiedLeads}</span>
            <span className="text-xs text-gray-600">Total Leads</span>
          </div>
          <div className="flex flex-col p-2 bg-purple-50/30 rounded-md items-center justify-center">
            <span className="font-medium text-[#6E59A5] text-lg">{totalQualifiedPatients}</span>
            <span className="text-xs text-gray-600">Qualified</span>
          </div>
        </div>
        
        {trials.length > 0 && (
          <div className="space-y-3 mt-2">
            <div className="text-sm font-medium text-gray-600">Trial Breakdown</div>
            {trials.map((trial, index) => (
              <div key={index} className="p-2 bg-purple-50/30 rounded-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{trial.name}</span>
                  <span className="font-medium text-[#6E59A5]">
                    {trial.enrolled} / {trial.target}
                  </span>
                </div>
                <Progress 
                  value={trial.target > 0 ? Math.round((trial.enrolled / trial.target) * 100) : 0} 
                  className="h-1.5 bg-purple-100"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnrollmentOverviewCard;
