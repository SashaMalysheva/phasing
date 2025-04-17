
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics, getSiteTrials, getSitePendingInvitations } from "@/lib/api";
import PendingInvitationsModal from "@/components/site/PendingInvitationsModal";
import { AlertTriangle, CheckCircle2, XCircle, SearchIcon, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";

const SiteDashboard = () => {
  const { user } = useAuth();
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
          <h1 className="text-3xl font-bold text-purple-900">Site Overview</h1>
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
            <Button className="bg-purple-600 hover:bg-purple-700">
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
          <h2 className="text-2xl font-semibold text-purple-900 mb-4">Site Readiness Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <SiteReadinessCard readiness={siteReadiness} />
              <Link 
                to="/site/readiness" 
                className="absolute bottom-4 right-4 text-sm text-purple-600 hover:text-purple-700 flex items-center"
              >
                View Full Readiness Report <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="relative">
              <SiteStaffCard staffStats={analyticsData.staff_statistics} />
              <Link 
                to="/site/staff" 
                className="absolute bottom-4 right-4 text-sm text-purple-600 hover:text-purple-700 flex items-center"
              >
                View All Staff Details <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Trials section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Active Trials</h2>
        
        {isLoadingTrials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : trialsData?.trials && trialsData.trials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trialsData.trials.map((trial) => (
              <Card key={trial.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{trial.name}</CardTitle>
                    <TrialStatusBadge status={trial.status} />
                  </div>
                  <p className="text-muted-foreground">{trial.sponsor_name}</p>
                </CardHeader>
                <CardContent>
                  {trial.status === "enrollment" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Enrollment Progress</span>
                        <span className="font-medium">{trial.metrics.enrolled} / {trial.metrics.target}</span>
                      </div>
                      <Progress value={(trial.metrics.enrolled / trial.metrics.target) * 100} className="h-2" />
                      
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center">
                          <div className="text-lg font-medium">{trial.metrics.identified_leads}</div>
                          <div className="text-xs text-muted-foreground">Identified</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium">{trial.metrics.qualified}</div>
                          <div className="text-xs text-muted-foreground">Qualified</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium">{trial.metrics.ongoing_outreach}</div>
                          <div className="text-xs text-muted-foreground">Outreach</div>
                        </div>
                      </div>
                      
                      <Link to={`/site/trials/${trial.id}`} className="block w-full">
                        <Button variant="outline" className="w-full mt-2">
                          Go to Enrollment Board
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  {trial.status === "document_review" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {trial.documents?.map((doc) => (
                          <div key={doc.id} className="flex justify-between items-center p-2 rounded-md bg-muted">
                            <span>{doc.name}</span>
                            {doc.status === "approved" ? (
                              <CheckCircle2 className="text-green-500 h-5 w-5" />
                            ) : doc.status === "pending_signature" ? (
                              <AlertTriangle className="text-amber-500 h-5 w-5" />
                            ) : (
                              <XCircle className="text-red-500 h-5 w-5" />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <Link to={`/site/trials/${trial.id}`} className="block w-full">
                        <Button variant="outline" className="w-full">
                          Review Documents
                        </Button>
                      </Link>
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
                <Button>Find Matching Trials</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SiteDashboard;
