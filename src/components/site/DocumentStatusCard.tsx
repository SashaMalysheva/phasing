
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileCheck } from "lucide-react";

interface TrialDocuments {
  name: string;
  totalDocuments: number;
  draft: number;
  pendingReview: number;
  signed: number;
  completed: number;
}

interface DocumentStatusCardProps {
  trialCount: number;
  trials: TrialDocuments[];
}

const DocumentStatusCard: React.FC<DocumentStatusCardProps> = ({
  trialCount,
  trials
}) => {
  // Calculate totals across all trials
  const totalDocuments = trials.reduce((sum, trial) => sum + trial.totalDocuments, 0);
  const totalDraft = trials.reduce((sum, trial) => sum + trial.draft, 0);
  const totalPendingReview = trials.reduce((sum, trial) => sum + trial.pendingReview, 0);
  const totalSigned = trials.reduce((sum, trial) => sum + trial.signed, 0);
  const totalCompleted = trials.reduce((sum, trial) => sum + trial.completed, 0);

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Document Status</span>
          <span className="text-sm font-medium text-gray-600">{trialCount} {trialCount === 1 ? 'trial' : 'trials'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Total Documents</span>
          <span className="font-medium text-[#6E59A5]">{totalDocuments}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Draft</span>
            <span className="font-medium text-[#6E59A5]">{totalDraft}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Pending Review</span>
            <span className="font-medium text-[#6E59A5]">{totalPendingReview}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Signed</span>
            <span className="font-medium text-[#6E59A5]">{totalSigned}</span>
          </div>
          <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="font-medium text-[#6E59A5]">{totalCompleted}</span>
          </div>
        </div>
        
        {trials.length > 0 && (
          <div className="space-y-3 mt-2">
            <div className="text-sm font-medium text-gray-600">Trial Breakdown</div>
            {trials.map((trial, index) => (
              <div key={index} className="p-2 bg-purple-50/30 rounded-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{trial.name}</span>
                  <span className="font-medium text-[#6E59A5]">{trial.totalDocuments}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium text-[#6E59A5]">{trial.draft}</span>
                    <span className="text-[10px] text-gray-500">Draft</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium text-[#6E59A5]">{trial.pendingReview}</span>
                    <span className="text-[10px] text-gray-500">Pending</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium text-[#6E59A5]">{trial.signed}</span>
                    <span className="text-[10px] text-gray-500">Signed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium text-[#6E59A5]">{trial.completed}</span>
                    <span className="text-[10px] text-gray-500">Done</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentStatusCard;
