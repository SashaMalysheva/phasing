
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Users, Building, Map } from "lucide-react";

interface SiteDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: any; // Using any temporarily since we don't have the type
}

export function SiteDetailsDialog({ site, open, onOpenChange }: SiteDetailsDialogProps) {
  if (!site) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{site.name}</DialogTitle>
          <DialogDescription>
            Site Details and Compatibility Information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Compatibility Score */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Compatibility Score</span>
              <span className="text-sm font-medium">{site.compatibilityScore}%</span>
            </div>
            <Progress value={site.compatibilityScore} className="h-2" />
          </div>

          {/* Staff Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Staff Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <Users className="h-4 w-4 mb-2 text-primary" />
                <div className="text-sm font-medium">Total Staff</div>
                <div className="text-2xl font-bold">{site.staff.total}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <CheckCircle className="h-4 w-4 mb-2 text-green-500" />
                <div className="text-sm font-medium">Ready Staff</div>
                <div className="text-2xl font-bold">{site.staff.ready}</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Features</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-2">Compatible</h5>
                <ul className="space-y-1">
                  {site.features.compatible.map((feature: string) => (
                    <li key={feature} className="text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature.replace(/_/g, ' ')}
                    </li>
                  ))}
                </ul>
              </div>
              {site.features.incompatible.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-2">Incompatible</h5>
                  <ul className="space-y-1">
                    {site.features.incompatible.map((feature: string) => (
                      <li key={feature} className="text-sm flex items-center">
                        <XCircle className="h-4 w-4 text-destructive mr-2" />
                        {feature.replace(/_/g, ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Patient Stats */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Patient Statistics</h4>
            <div>
              <div className="mb-2">
                <span className="text-sm">Eligible Patients: </span>
                <span className="font-medium">{site.eligiblePatients}/{site.totalPatients}</span>
              </div>
              <div className="space-y-2">
                {site.rejectionReasons.map((reason: any) => (
                  <div key={reason.reason} className="flex justify-between text-sm">
                    <span>{reason.reason.replace(/_/g, ' ')}</span>
                    <span className="text-muted-foreground">{reason.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Invite Site</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
