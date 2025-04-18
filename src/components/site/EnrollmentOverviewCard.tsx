
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface EnrollmentOverviewCardProps {
  trialCount: number;
  trialName: string;
  enrolled: number;
  target: number;
  identifiedLeads: number;
  qualifiedPatients: number;
}

const EnrollmentOverviewCard: React.FC<EnrollmentOverviewCardProps> = ({
  trialCount,
  trialName,
  enrolled,
  target,
  identifiedLeads,
  qualifiedPatients,
}) => {
  const enrollmentPercentage = Math.round((enrolled / target) * 100);

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Enrollment Overview</span>
          <span className="text-sm font-medium text-gray-600">{trialCount} trial</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{trialName}</p>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Patients Enrolled</span>
            <span className="font-medium text-[#6E59A5]">
              {enrolled} / {target}
            </span>
          </div>
          <Progress 
            value={enrollmentPercentage} 
            className="h-2 bg-purple-100"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col p-2 bg-purple-50/30 rounded-md items-center justify-center">
            <span className="font-medium text-[#6E59A5] text-lg">{identifiedLeads}</span>
            <span className="text-xs text-gray-600">Total Leads</span>
          </div>
          <div className="flex flex-col p-2 bg-purple-50/30 rounded-md items-center justify-center">
            <span className="font-medium text-[#6E59A5] text-lg">{qualifiedPatients}</span>
            <span className="text-xs text-gray-600">Qualified</span>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t flex justify-between items-center">
        <Link 
          to="/site/enrollment-board" 
          className="flex items-center text-sm text-[#9b87f5] hover:text-[#8B5CF6]"
        >
          View enrollment board <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

export default EnrollmentOverviewCard;
