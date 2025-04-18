
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
import { 
  CheckCircle, 
  XCircle, 
  Users, 
  Building, 
  TrendingUp,
  History,
  BarChart
} from "lucide-react";

interface SiteDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: any; // Using any temporarily since we don't have the type
}

export function SiteDetailsDialog({ site, open, onOpenChange }: SiteDetailsDialogProps) {
  if (!site) return null;

  // Mock data for performance metrics and trial experience
  const performanceMetrics = {
    enrollmentRate: "85%",
    screeningSuccess: "78%",
    retentionRate: "92%"
  };

  const previousTrials = [
    {
      name: "Phase 3 Oncology Trial",
      year: "2023",
      performance: "Exceeded enrollment targets by 15%"
    },
    {
      name: "Phase 2 Cardiovascular Study",
      year: "2022",
      performance: "98% patient retention rate"
    }
  ];

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

          {/* Site Performance Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Site Performance Metrics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <TrendingUp className="h-4 w-4 mb-2 text-primary" />
                <div className="text-sm font-medium">Enrollment Rate</div>
                <div className="text-2xl font-bold">{performanceMetrics.enrollmentRate}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <CheckCircle className="h-4 w-4 mb-2 text-green-500" />
                <div className="text-sm font-medium">Screening Success</div>
                <div className="text-2xl font-bold">{performanceMetrics.screeningSuccess}</div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <Users className="h-4 w-4 mb-2 text-primary" />
                <div className="text-sm font-medium">Retention Rate</div>
                <div className="text-2xl font-bold">{performanceMetrics.retentionRate}</div>
              </div>
            </div>
          </div>

          {/* Previous Trial Experience */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <History className="h-4 w-4" />
              Previous Trial Experience
            </h4>
            <div className="space-y-3">
              {previousTrials.map((trial, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted">
                  <div className="font-medium">{trial.name}</div>
                  <div className="text-sm text-muted-foreground">{trial.year}</div>
                  <div className="text-sm mt-1">{trial.performance}</div>
                </div>
              ))}
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
