
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Flask,
  Target,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrialDetailsDialogProps {
  trial: any;
  trigger?: React.ReactNode;
}

export const TrialDetailsDialog = ({ trial, trigger }: TrialDetailsDialogProps) => {
  const compatibilityScore = Math.round(trial.compatibility_score);
  const isFullMatch = compatibilityScore === 100;
  
  const topRejectionReasons = trial.rejection_reasons 
    ? Object.entries(trial.rejection_reasons)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 3)
    : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-white">
                  <Flask className="h-3.5 w-3.5 mr-1" />
                  Phase {trial.phase}
                </Badge>
                {trial.indication && (
                  <Badge variant="outline" className="bg-white">
                    <Target className="h-3.5 w-3.5 mr-1" />
                    {trial.indication}
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {trial.name}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-base font-medium text-gray-700">
                Match: {compatibilityScore}%
              </span>
              {isFullMatch ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Eligibility Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Patient Eligibility
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Eligible Patients</span>
                  <span className="font-medium text-gray-900">
                    {trial.eligible_patient_count}/{trial.total_patient_count}
                  </span>
                </div>
                {trial.eligible_patient_count === 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-600 mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    No eligible patients currently — try adjusting inclusion criteria.
                  </div>
                )}
              </div>

              {topRejectionReasons.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">
                    Top Rejection Reasons
                  </h4>
                  <div className="space-y-2">
                    {topRejectionReasons.map(([reason, count]) => (
                      <div 
                        key={reason} 
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 capitalize">
                          {reason.replace(/_/g, ' ')}
                        </span>
                        <span className="text-gray-900 font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Site Readiness - Only show if 100% match */}
          {isFullMatch && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Site Readiness
                </h3>
                <p className="text-sm text-gray-600">
                  All site infrastructure requirements met
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Protocol Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Protocol Overview</h3>
            <p className="text-sm text-gray-600 mb-4">{trial.description}</p>
            <Button variant="outline" size="sm" className="text-gray-600">
              <FileText className="h-4 w-4 mr-1.5" />
              View Protocol
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 mt-6 border-t">
          <Button 
            size="sm" 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
          >
            Express Interest
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
