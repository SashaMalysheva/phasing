import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, FileText, Users, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSponsorDetails, getSponsorPendingInvitations } from "@/lib/api";
import PendingInvitationsModal from "@/components/sponsor/PendingInvitationsModal";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import FindSitesSheet from "@/components/sponsor/FindSitesSheet";
import TrialDetailsDialog from "@/components/sponsor/TrialDetailsDialog";

const SponsorDashboard = () => {
  const { user } = useAuth();
  const [showInvitations, setShowInvitations] = useState(false);
  const [selectedTrialId, setSelectedTrialId] = useState<string | null>(null);
  const [showTrialDetails, setShowTrialDetails] = useState(false);
  
  // Fetch sponsor details
  const { data: sponsorData, isLoading: isLoadingSponsor } = useQuery({
    queryKey: ['sponsorDetails', user?.id],
    queryFn: () => getSponsorDetails(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Fetch pending invitations
  const { data: invitationsData, isLoading: isLoadingInvitations } = useQuery({
    queryKey: ['sponsorInvitations', user?.id],
    queryFn: () => getSponsorPendingInvitations(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Show invitations modal if there are pending invitations
  useEffect(() => {
    if (invitationsData && invitationsData.total_count > 0) {
      setShowInvitations(true);
    }
  }, [invitationsData]);

  const handleViewTrialDetails = (trialId: string) => {
    setSelectedTrialId(trialId);
    setShowTrialDetails(true);
  };

  const getTrialIcon = (status: string) => {
    switch (status) {
      case "enrollment":
        return <Users className="h-5 w-5 text-[#9b87f5]" />;
      case "document_review":
        return <FileText className="h-5 w-5 text-[#9b87f5]" />;
      case "idle":
        return <Clock className="h-5 w-5 text-[#9b87f5]" />;
      default:
        return <FileText className="h-5 w-5 text-[#9b87f5]" />;
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
          <h1 className="text-3xl font-bold text-black">Sponsor Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name || 'Sponsor'}</p>
        </div>
        
        <div className="flex gap-4">
          {invitationsData && invitationsData.total_count > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowInvitations(true)}
              className="flex items-center gap-2"
            >
              <span>Pending Invitations</span>
              <span className="flex items-center justify-center rounded-full bg-black w-5 h-5 text-xs text-white">
                {invitationsData.total_count}
              </span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Trials</h2>
          <Link to="/sponsor/trials/create">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Trial
            </Button>
          </Link>
        </div>
        
        {isLoadingSponsor ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : sponsorData?.trials && sponsorData.trials.length > 0 ? (
          <div className="grid gap-4">
            {sponsorData.trials.map((trial) => (
              <TrialDetailsDialog
                key={trial.id}
                trialId={trial.id}
                trigger={
                  <Card key={trial.id} className="p-6 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer border border-gray-100">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">{trial.name}</h3>
                            <TrialStatusBadge status={trial.status} />
                          </div>
                          <p className="text-sm text-gray-600">{trial.sites.length} {trial.sites.length === 1 ? 'site' : 'sites'} participating</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          {trial.status === "enrollment" && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-[#8B5CF6]" />
                              <span>
                                {trial.participants_count} enrolled
                                {trial.target && <> / {trial.target} target</>}
                              </span>
                            </div>
                          )}
                          {trial.status === "document_review" && (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[#8B5CF6]" />
                              <span>Document review in progress</span>
                            </div>
                          )}
                          {trial.status === "idle" && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#8B5CF6]" />
                              <span>No active recruitment</span>
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="ghost"
                          className="text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-purple-50 gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewTrialDetails(trial.id);
                          }}
                        >
                          Find Sites
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                }
              />
            ))}
          </div>
        ) : (
          <Card className="p-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                You don't have any trials yet.
              </p>
              <Link to="/sponsor/trials/create">
                <Button>Create Your First Trial</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>

      {/* Find Sites Sheet */}
      {selectedTrialId && (
        <FindSitesSheet
          open={showTrialDetails}
          onOpenChange={setShowTrialDetails}
          trialId={selectedTrialId}
        />
      )}
    </div>
  );
};

export default SponsorDashboard;
