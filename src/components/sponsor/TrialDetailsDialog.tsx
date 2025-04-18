
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
              <DialogDescription>{trial.description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <ScrollText className="h-4 w-4 text-muted-foreground" />
                    <span>Protocol: {trial.protocol_number}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Target Enrollment: {trial.target_enrollment}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarRange className="h-4 w-4 text-muted-foreground" />
                    <span>Phase: {trial.phase}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Sponsor: {trial.sponsor_name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Study Details</h4>
                <p className="text-sm text-muted-foreground">{trial.detailed_description}</p>
              </div>

              {trial.criteria && (
                <div className="space-y-2">
                  <h4 className="font-medium">Key Criteria</h4>
                  <div className="grid gap-2">
                    {Object.entries(trial.criteria).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium">{key.replace(/_/g, ' ')}: </span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
