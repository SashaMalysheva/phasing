
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Microscope, FileText, TrendingUp, Clock, Milestone } from "lucide-react";

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

        <div className="pt-2 border-t">
          <span className="text-sm font-medium text-gray-700">Performance Metrics</span>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between p-2 bg-green-50/30 rounded-md">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">Total Enrollment Rate</span>
              </div>
              <span className="font-medium text-green-700">85%</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-blue-50/30 rounded-md">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-700">On Schedule</span>
              </div>
              <span className="font-medium text-blue-700">2/3</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-indigo-50/30 rounded-md">
              <div className="flex items-center">
                <Milestone className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-700">Key Milestones Met</span>
              </div>
              <span className="font-medium text-indigo-700">92%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTrialsCard;
