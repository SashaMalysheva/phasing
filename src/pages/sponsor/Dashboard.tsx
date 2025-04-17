
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, FileText, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSponsorDetails, getSponsorPendingInvitations } from "@/lib/api";
import PendingInvitationsModal from "@/components/sponsor/PendingInvitationsModal";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

const SponsorDashboard = () => {
  const { user } = useAuth();
  const [showInvitations, setShowInvitations] = useState(false);
  
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

  const getTrialIcon = (status: string) => {
    switch (status) {
      case "enrollment":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "document_review":
        return <FileText className="h-5 w-5 text-amber-500" />;
      case "idle":
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
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
          <h1 className="text-3xl font-bold">Sponsor Dashboard</h1>
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
              <span className="inline-flex items-center justify-center rounded-full bg-primary w-6 h-6 text-xs text-primary-foreground">
                {invitationsData.total_count}
              </span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Trials section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Trials</h2>
          <Link to="/sponsor/trials/create">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Trial
            </Button>
          </Link>
        </div>
        
        {isLoadingSponsor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : sponsorData?.trials && sponsorData.trials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorData.trials.map((trial) => (
              <Card key={trial.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{trial.name}</CardTitle>
                    <TrialStatusBadge status={trial.status} />
                  </div>
                  <CardDescription>
                    {trial.sites.length} {trial.sites.length === 1 ? 'site' : 'sites'} participating
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {getTrialIcon(trial.status)}
                    <span>
                      {trial.status === "enrollment" && (
                        <>
                          {trial.participants_count} enrolled
                          {trial.target && <> / {trial.target} target</>}
                        </>
                      )}
                      {trial.status === "document_review" && "Document review in progress"}
                      {trial.status === "idle" && "No active recruitment"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/sponsor/trials/${trial.id}`} className="w-full">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground text-center mb-4">
                You don't have any trials yet.
              </p>
              <Link to="/sponsor/trials/create">
                <Button>Create Your First Trial</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SponsorDashboard;
