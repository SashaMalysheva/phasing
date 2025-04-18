
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
import { 
  ScrollText, 
  Users, 
  CalendarRange, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Clock,
  CheckCircle, 
  AlertTriangle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTrialDetails, getTrialWithSites } from "@/lib/api";
import { CustomProgress } from "@/components/ui/custom-progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TrialDetailsDialogProps {
  trialId: string;
  trigger: React.ReactNode;
}

const TrialDetailsDialog = ({ trialId, trigger }: TrialDetailsDialogProps) => {
  const [showAllSites, setShowAllSites] = React.useState(false);
  
  // Fetch basic trial details
  const { data: trial, isLoading: isLoadingTrial } = useQuery({
    queryKey: ['trial', trialId],
    queryFn: () => getTrialDetails(trialId),
    enabled: !!trialId,
  });

  // Fetch trial with sites information
  const { data: trialWithSites, isLoading: isLoadingSites } = useQuery({
    queryKey: ['trialSites', trialId],
    queryFn: () => getTrialWithSites(trialId),
    enabled: !!trialId,
  });

  const isLoading = isLoadingTrial || isLoadingSites;

  // Calculate enrollment metrics
  const calculateMetrics = () => {
    if (!trial || !trialWithSites) return null;
    
    const totalEnrolled = trial.current_enrollment;
    const totalTarget = trial.enrollment_target;
    const remainingNeeded = totalTarget - totalEnrolled;
    
    // Calculate total eligible patients across all sites
    const totalEligible = trialWithSites.sites.reduce(
      (sum, site) => sum + site.eligible_patient_count, 
      0
    );
    
    // Determine if we have enough eligible patients to meet the target
    const isOversubscribed = totalEligible >= remainingNeeded;
    
    // Count confirmed (active sites) vs pending (in negotiation) patients
    const activeSites = trialWithSites.sites.filter(site => site.status === "active");
    const pendingSites = trialWithSites.sites.filter(site => site.status !== "active");
    
    const confirmedPatients = activeSites.reduce(
      (sum, site) => sum + site.enrolled_count || 0, 
      0
    );
    
    const pendingEligible = pendingSites.reduce(
      (sum, site) => sum + site.eligible_patient_count, 
      0
    );
    
    const projectedTotal = confirmedPatients + pendingEligible;
    
    return {
      totalEnrolled,
      totalTarget,
      remainingNeeded,
      totalEligible,
      isOversubscribed,
      confirmedPatients,
      pendingEligible,
      projectedTotal,
      needMorePatients: projectedTotal < totalTarget
    };
  };

  const metrics = calculateMetrics();
  
  // Determine how many sites to show in collapsed view
  const sitesToShow = showAllSites ? 
    trialWithSites?.sites || [] : 
    trialWithSites?.sites.slice(0, 2) || [];
  
  const hasMoreSites = trialWithSites?.sites && trialWithSites.sites.length > 2;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : trial && trialWithSites ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{trial.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {trial.therapeutic_area}
                </Badge>
                <span>–</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Phase {trial.phase}
                </Badge>
                <span className="ml-auto flex items-center gap-1">
                  <span>🎯 Target:</span>
                  <span className="font-semibold">{trial.enrollment_target} patients</span>
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-2">
              {/* Status Panel */}
              <div className="rounded-lg border p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                    <span className="font-medium">Enrollment Status:</span>
                    <span>{trial.status}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarRange className="h-4 w-4 text-muted-foreground" />
                      <span>Start: {new Date(trial.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>End: {new Date(trial.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Summary Section */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold">Enrollment Summary</h3>
                
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {trial.current_enrollment} of {trial.enrollment_target} patients enrolled 
                      ({Math.round((trial.current_enrollment / trial.enrollment_target) * 100)}% complete)
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Remaining needed: {trial.enrollment_target - trial.current_enrollment}
                    </span>
                  </div>
                  <CustomProgress 
                    value={(trial.current_enrollment / trial.enrollment_target) * 100}
                    className="h-2.5"
                    indicatorClassName="bg-purple-600"
                  />
                  
                  <div className="flex items-center text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Available across sites:</span>
                      {metrics?.isOversubscribed ? (
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Oversubscribed ({metrics.totalEligible} eligible patients)
                        </span>
                      ) : (
                        <span>{metrics?.totalEligible} eligible patients</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Sites Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Eligible Patients</TableHead>
                        <TableHead>Enrolled</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sitesToShow.map((site) => (
                        <TableRow key={site.id}>
                          <TableCell className="font-medium">{site.name}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={site.status === "active" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-orange-50 text-orange-700 border-orange-200"
                              }
                            >
                              {site.status === "active" ? "Active" : "In Negotiation"}
                            </Badge>
                          </TableCell>
                          <TableCell>{site.eligible_patient_count}</TableCell>
                          <TableCell>
                            {site.status === "active" ? site.enrolled_count || "0" : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Show more/less sites button */}
                {hasMoreSites && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowAllSites(!showAllSites)}
                    className="flex items-center gap-1 mx-auto text-muted-foreground"
                  >
                    {showAllSites ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show All Sites ({trialWithSites.sites.length})
                      </>
                    )}
                  </Button>
                )}
                
                {/* Summary under table */}
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600">🔒</span>
                    <span className="font-medium">Confirmed:</span>
                    <span>{metrics?.confirmedPatients} enrolled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">🕓</span>
                    <span className="font-medium">Pending:</span>
                    <span>{metrics?.pendingEligible} eligible patients (waiting for document upload)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600">🟢</span>
                    <span className="font-medium">Projected Total:</span>
                    <span>
                      {metrics?.confirmedPatients} + {metrics?.pendingEligible} = {metrics?.projectedTotal} patients
                      (Target = {trial.enrollment_target})
                    </span>
                  </div>
                  
                  {metrics?.needMorePatients && (
                    <div className="mt-2 flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Still need to recruit more patients or add a new site</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Protocol Info */}
              <div className="rounded-lg border p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Protocol File:</span>
                      <span>{trial.protocol_file}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Uploaded: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ScrollText className="h-4 w-4 mr-2" />
                    View Protocol
                  </Button>
                </div>
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
