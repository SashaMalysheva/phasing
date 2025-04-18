import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics, getSitePendingInvitations } from "@/lib/api";
import PendingInvitationsModal from "@/components/site/PendingInvitationsModal";
import { Skeleton } from "@/components/ui/skeleton";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";

const SiteDashboard = () => {
  const { user } = useAuth();
  const [showInvitations, setShowInvitations] = useState(false);
  
  // Fetch site analytics
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['siteAnalytics', user?.id],
    queryFn: () => getSiteAnalytics(user?.id || ''),
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
          <h1 className="text-3xl font-bold text-black">Site Overview</h1>
          <p className="text-gray-600">Welcome, {user?.name || 'Site Admin'}</p>
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
      
      {/* Site Analytics Section */}
      {isLoadingAnalytics ? (
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      ) : analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <SiteReadinessCard readiness={siteReadiness} />
          </div>
          <div>
            <SiteStaffCard staffStats={analyticsData.staff_statistics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteDashboard;
