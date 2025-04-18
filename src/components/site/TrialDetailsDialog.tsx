
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  FileText,
  Users,
  ArrowRight,
  ScrollText,
  CheckCircle
} from "lucide-react";

interface TrialDetailsDialogProps {
  trial: any;
  trigger?: React.ReactNode;
}

export const TrialDetailsDialog = ({ trial, trigger }: TrialDetailsDialogProps) => {
  const compatibilityScore = Math.round(trial.compatibility_score);
  
  const calculateEligiblePatients = () => {
    // Generate a number between 1-25 based on compatibility score
    // Higher compatibility scores get more patients
    const minPatients = 1;
    const maxPatients = 25;
    
    // Calculate a value between min and max based on compatibility percentage
    // Use compatibility score to determine where in the range we fall
    const eligibleCount = Math.round(minPatients + ((maxPatients - minPatients) * compatibilityScore / 100));
    
    // Ensure we always return at least 1 patient if score is above 0
    return compatibilityScore > 0 ? Math.max(1, eligibleCount) : 0;
  };

  const sortedRejectionReasons = trial.rejection_reasons 
    ? Object.entries(trial.rejection_reasons)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
    : [];

  const formatReason = (reason: string) => {
    return reason
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="sr-only">Trial Details</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed information about the trial
        </DialogDescription>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {trial.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  Match: {compatibilityScore}%
                </span>
                {compatibilityScore >= 90 && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
            </div>
            <p className="text-sm text-gray-600">{trial.description}</p>
          </div>

          <Separator />

          {/* Patient Matching Section */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Eligible Patients
            </h3>
            <div className="flex items-center gap-2">
              {calculateEligiblePatients() === 0 ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : (
                <ScrollText className="h-4 w-4 text-blue-500" />
              )}
              <span className="text-sm font-medium">
                {calculateEligiblePatients()} patients
              </span>
            </div>
          </div>

          {/* Exclusion Reasons Section */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">
              📌 Most Common Exclusion Reasons
            </h3>
            <div className="space-y-2">
              {sortedRejectionReasons.map(([reason, count]) => (
                <div 
                  key={reason}
                  className="flex items-center justify-between text-sm text-gray-600"
                >
                  <span>• {formatReason(reason)}</span>
                  <span>{String(count)} patients excluded</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" className="text-gray-600">
              <FileText className="h-4 w-4 mr-1.5" />
              View Protocol
            </Button>
            <Button 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
            >
              Express Interest
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
