
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
  Users, 
  Building,
  TrendingUp,
  History,
  MapPin
} from "lucide-react";

interface SiteDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: any; // Using any temporarily since we don't have the type
}

export function SiteDetailsDialog({ site, open, onOpenChange }: SiteDetailsDialogProps) {
  if (!site) return null;

  // Mock data for the new metrics (in a real app, this would come from the API)
  const performanceMetrics = {
    enrollmentRate: "85%",
    screeningSuccess: "72%",
    patientRetention: "94%"
  };

  const previousTrials = [
    "Phase III Oncology Trial (2023) - 98% retention rate",
    "Phase II Cardiology Study (2022) - Top enrolling site",
    "Phase IV Diabetes Trial (2021) - Completed ahead of schedule"
  ];

  const geographicInfo = {
    radius: "50 mile catchment area",
    population: "2.5M total population",
    demographics: "Diverse urban & suburban population"
  };

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

          {/* Site Performance Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Site Performance Metrics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-sm font-medium">Enrollment Rate</div>
                <div className="text-lg font-bold text-primary">{performanceMetrics.enrollmentRate}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-sm font-medium">Screening Success</div>
                <div className="text-lg font-bold text-primary">{performanceMetrics.screeningSuccess}</div>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <div className="text-sm font-medium">Patient Retention</div>
                <div className="text-lg font-bold text-primary">{performanceMetrics.patientRetention}</div>
              </div>
            </div>
          </div>

          {/* Previous Trial Experience */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <History className="h-4 w-4" />
              Previous Trial Experience
            </h4>
            <div className="space-y-2">
              {previousTrials.map((trial, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted text-sm">
                  {trial}
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Reach */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Geographic Reach
            </h4>
            <div className="p-4 rounded-lg bg-muted space-y-2">
              <div className="text-sm">
                <span className="font-medium">Coverage Area:</span> {geographicInfo.radius}
              </div>
              <div className="text-sm">
                <span className="font-medium">Population:</span> {geographicInfo.population}
              </div>
              <div className="text-sm">
                <span className="font-medium">Demographics:</span> {geographicInfo.demographics}
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
