
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollText, Users, CalendarRange, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTrialDetails } from "@/lib/api";

interface TrialDetailsDialogProps {
  trialId: string;
  trigger: React.ReactNode;
}

const TrialDetailsDialog = ({ trialId, trigger }: TrialDetailsDialogProps) => {
  const { data: trial, isLoading } = useQuery({
    queryKey: ['trial', trialId],
    queryFn: () => getTrialDetails(trialId),
    enabled: !!trialId,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : trial ? (
          <>
            <DialogHeader>
              <DialogTitle>{trial.name}</DialogTitle>
              <DialogDescription>
                {trial.therapeutic_area} - Phase {trial.phase}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <ScrollText className="h-4 w-4 text-muted-foreground" />
                    <span>Status: {trial.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Target Enrollment: {trial.enrollment_target}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarRange className="h-4 w-4 text-muted-foreground" />
                    <span>Start Date: {new Date(trial.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarRange className="h-4 w-4 text-muted-foreground" />
                    <span>End Date: {new Date(trial.end_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Current Progress</h4>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${(trial.current_enrollment / trial.enrollment_target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {trial.current_enrollment} of {trial.enrollment_target} enrolled
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Protocol Information</h4>
                <p className="text-sm text-muted-foreground">
                  The protocol file for this trial is available for download: {trial.protocol_file}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <ScrollText className="h-4 w-4 mr-2" />
                  View Protocol
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Trial details not available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrialDetailsDialog;
