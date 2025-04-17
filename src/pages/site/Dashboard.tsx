import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics, getSiteTrials, getSitePendingInvitations } from "@/lib/api";
import PendingInvitationsModal from "@/components/site/PendingInvitationsModal";
import { Skeleton } from "@/components/ui/skeleton";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const SiteDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showInvitations, setShowInvitations] = useState(false);
  
  // Fetch site analytics
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Fetch site trials
  const { data: trialsData, isLoading: isLoadingTrials } = useQuery({
    queryKey: ['siteTrials', user?.id],
    queryFn: () => getSiteTrials(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Fetch pending invitations
  const { data: invitationsData, isLoading: isLoadingInvitations } = useQuery({
    queryKey: ['siteInvitations', user?.id],
    queryFn: () => getSitePendingInvitations(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Show invitations modal if there are pending invitations
  useEffect(() => {
    if (invitationsData && invitationsData.total_count > 0) {
      setShowInvitations(true);
    }
  }, [invitationsData]);

  // Create a mock site readiness object for the SiteReadinessCard
  const siteReadiness = {
    data_privacy_policy: true,
    source_agreement: true,
    sops_storage_monitoring: "warning",
    eregulatory_binders: true,
    source_templates: false,
    iata_certification: true
  };

  const handleTrialClick = (trial: any) => {
    if (trial.status === "enrollment") {
      navigate(`/site/trials/${trial.id}/enrollment`);
    } else if (trial.status === "document_review") {
      navigate(`/site/trials/${trial.id}/documents`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Pending Invitations Modal */}
      {invitationsData && (
        <PendingInvitationsModal
          open={showInvitations}
          onClose={() => setShowInvitations(false)}
          invitations={invitationsData.pending_invitations}
        />
      )}
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#6E59A5]">Site Overview</h1>
          <p className="text-muted-foreground">Welcome, {user?.name || 'Site Admin'}</p>
        </div>
        
        <div className="flex gap-4">
          {invitationsData && invitationsData.total_count > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowInvitations(true)}
              className="flex items-center gap-2 border-purple-200"
            >
              <span>Pending Invitations</span>
              <span className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-600 w-6 h-6 text-xs">
                {invitationsData.total_count}
              </span>
            </Button>
          )}
          
          <Link to="/site/trials/find">
            <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]">
              <SearchIcon className="mr-2 h-4 w-4" /> Find Matching Trials
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Site Readiness Overview */}
      {isLoadingAnalytics ? (
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      ) : analyticsData && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#6E59A5] mb-4">Site Readiness Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SiteReadinessCard readiness={siteReadiness} />
            </div>
            <div>
              <SiteStaffCard staffStats={analyticsData.staff_statistics} />
            </div>
          </div>
        </div>
      )}
      
      {/* Trials section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#6E59A5] mb-4">Your Active Trials</h2>
        
        {isLoadingTrials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : trialsData?.trials && trialsData.trials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trialsData.trials.map((trial) => (
              <Card 
                key={trial.id} 
                className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTrialClick(trial)}
              >
                <CardHeader className="pb-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-[#6E59A5]">{trial.name}</CardTitle>
                      <p className="text-muted-foreground">{trial.sponsor_name}</p>
                    </div>
                    <TrialStatusBadge status={trial.status} />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {trial.status === "enrollment" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Enrollment Progress</span>
                        <span className="font-medium text-[#6E59A5]">{trial.metrics.enrolled} / {trial.metrics.target}</span>
                      </div>
                      <Progress 
                        value={(trial.metrics.enrolled / trial.metrics.target) * 100} 
                        className="h-2 bg-purple-100"
                      />
                      
                      <div className="grid grid-cols-3 gap-4 mt-4 p-2 bg-purple-50/50 rounded-md">
                        <div className="text-center">
                          <div className="text-lg font-medium text-[#6E59A5]">{trial.metrics.identified_leads}</div>
                          <div className="text-xs text-muted-foreground">Identified</div>
                        </div>
                        <div className="text-center border-x border-purple-100">
                          <div className="text-lg font-medium text-[#6E59A5]">{trial.metrics.qualified}</div>
                          <div className="text-xs text-muted-foreground">Qualified</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-[#6E59A5]">{trial.metrics.ongoing_outreach}</div>
                          <div className="text-xs text-muted-foreground">Outreach</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {trial.status === "document_review" && (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground mb-4">Document Statuses:</div>
                      {[
                        "DRAFT",
                        "PENDING_SITE_REVIEW",
                        "PENDING_TRIAL_REVIEW",
                        "SITE_SIGNED",
                        "TRIAL_SIGNED",
                        "COMPLETED"
                      ].map((status) => (
                        <div 
                          key={status} 
                          className="flex justify-between items-center p-2 rounded-md hover:bg-purple-50/50"
                        >
                          <span className="text-sm text-muted-foreground">
                            {status.toLowerCase()
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground text-center mb-4">
                You're not participating in any trials yet.
              </p>
              <Link to="/site/trials/find">
                <Button className="bg-[#9b87f5] hover:bg-[#6E59A5] transition-colors">
                  Find Matching Trials
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SiteDashboard;
