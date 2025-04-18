
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
  FileText,
  ArrowRight,
  ScrollText,
  CheckCircle,
  AlertTriangle,
  Users
} from "lucide-react";

interface TrialDetailsDialogProps {
  trial: any;
  trigger?: React.ReactNode;
}

export const TrialDetailsDialog = ({ trial, trigger }: TrialDetailsDialogProps) => {
  const compatibilityScore = Math.round(trial.compatibility_score);

  const getFeatures = () => {
    if (compatibilityScore === 100) {
      return {
        compatible: ['procedures', 'lab certifications', 'languages', 'payment format'],
        incompatible: ['equipment', 'facilities', 'budget per patient']
      };
    }
    return {
      compatible: ['procedures', 'equipment', 'facilities', 'lab certifications', 'languages'],
      incompatible: []
    };
  };

  const features = getFeatures();

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

          {/* Features Section */}
          <div>
            <h3 className="font-medium text-base mb-4">Features</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Compatible</h4>
                <ul className="space-y-1">
                  {features.compatible.map((feature) => (
                    <li key={feature} className="text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {features.incompatible.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Incompatible</h4>
                  <ul className="space-y-1">
                    {features.incompatible.map((feature) => (
                      <li key={feature} className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

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

