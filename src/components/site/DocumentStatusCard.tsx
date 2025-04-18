
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileCheck } from "lucide-react";

interface DocumentStatusCardProps {
  trialCount: number;
  trialName: string;
  totalDocuments: number;
  draft: number;
  pendingReview: number;
  signed: number;
  completed: number;
}

const DocumentStatusCard: React.FC<DocumentStatusCardProps> = ({
  trialCount,
  trialName,
  totalDocuments,
  draft,
  pendingReview,
  signed,
  completed,
}) => {
  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Document Status</span>
          <span className="text-sm font-medium text-gray-600">{trialCount} trial</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{trialName}</p>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Total Documents</span>
          <span className="font-medium text-[#6E59A5]">{totalDocuments}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Draft</span>
            <span className="font-medium text-[#6E59A5]">{draft}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Pending Review</span>
            <span className="font-medium text-[#6E59A5]">{pendingReview}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Signed</span>
            <span className="font-medium text-[#6E59A5]">{signed}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-medium text-[#6E59A5]">{completed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentStatusCard;
