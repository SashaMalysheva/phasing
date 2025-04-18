
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Microscope, FileText } from "lucide-react";

interface ActiveTrialsCardProps {
  totalTrials: number;
  enrollmentTrials: number;
  documentTrials: number;
}

const ActiveTrialsCard: React.FC<ActiveTrialsCardProps> = ({ 
  totalTrials, 
  enrollmentTrials, 
  documentTrials 
}) => {
  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Active Trials</span>
          <span className="text-xl font-bold text-black">{totalTrials}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-3">
          {enrollmentTrials > 0 && (
            <div className="flex items-center justify-between p-2 bg-purple-50/30 rounded-md">
              <div className="flex items-center">
                <Microscope className="h-5 w-5 text-[#9b87f5] mr-2" />
                <span className="text-sm text-gray-700">Enrollment</span>
              </div>
              <span className="font-medium text-[#6E59A5]">{enrollmentTrials}</span>
            </div>
          )}
          
          {documentTrials > 0 && (
            <div className="flex items-center justify-between p-2 bg-purple-50/30 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-[#9b87f5] mr-2" />
                <span className="text-sm text-gray-700">Document Review</span>
              </div>
              <span className="font-medium text-[#6E59A5]">{documentTrials}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTrialsCard;
