import React from "react";
import { FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrialDetailsDialog } from "./TrialDetailsDialog";

interface TrialMatchCardProps {
  trial: any;
  getScoreIcon: (score: number) => JSX.Element;
}

export const TrialMatchCard = ({ trial, getScoreIcon }: TrialMatchCardProps) => {
  const compatibilityScore = Math.round(trial.compatibility_score);
  
  const eligibleRatio = (trial.eligible_patient_count / trial.total_patient_count) * 100;
  
  const topRejectionReasons = trial.rejection_reasons 
    ? Object.entries(trial.rejection_reasons)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 3)
    : [];

  const getStatusIcon = (reason: string, count: number) => {
    if (count > 200) return <XCircle className="h-3.5 w-3.5 text-red-500" />;
    if (count > 100) return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />;
    return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
  };
  
  return (
    <TrialDetailsDialog
      trial={trial}
      trigger={
        <Card className="overflow-hidden border-gray-200 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer">
          <CardHeader className="pb-2 space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium text-gray-900">{trial.name}</CardTitle>
                <p className="text-sm text-gray-500">{trial.description}</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-medium text-gray-700">
                        Match: {compatibilityScore}%
                      </span>
                      {getScoreIcon(compatibilityScore)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Trial Match Score</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          
          <CardContent className="pt-3 pb-2">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Eligible Patients</span>
                  <span className="font-medium">
                    {trial.eligible_patient_count}/{trial.total_patient_count}
                  </span>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid gap-3">
                {topRejectionReasons.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">
                      Top Rejection Factors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {topRejectionReasons.map(([reason, count]) => (
                        <TooltipProvider key={reason}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="outline"
                                className="bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                              >
                                {getStatusIcon(reason, count as number)}
                                <span className="ml-1 capitalize">{reason.replace(/_/g, ' ')}</span>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{count} patients rejected due to {reason.replace(/_/g, ' ')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t py-3 px-6 bg-gray-50/50">
            <div className="flex w-full justify-between items-center">
              <Button variant="outline" size="sm" className="text-gray-600">
                <FileText className="h-4 w-4 mr-1.5" />
                View Protocol
              </Button>
              <Button 
                size="sm" 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                Express Interest
              </Button>
            </div>
          </CardFooter>
        </Card>
      }
    />
  );
};
