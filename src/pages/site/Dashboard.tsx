
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics, getSitePendingInvitations, getSiteTrials } from "@/lib/api";
import PendingInvitationsModal from "@/components/site/PendingInvitationsModal";
import { Skeleton } from "@/components/ui/skeleton";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";
import ActiveTrialsCard from "@/components/site/ActiveTrialsCard";
import EnrollmentOverviewCard from "@/components/site/EnrollmentOverviewCard";
import DocumentStatusCard from "@/components/site/DocumentStatusCard";

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
  
  // Fetch site trials
  const { data: trialsData, isLoading: isLoadingTrials } = useQuery({
    queryKey: ['siteTrials', user?.id],
    queryFn: () => getSiteTrials(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Show invitations modal if there are pending invitations
  useEffect(() => {
    if (invitationsData && invitationsData.total_count > 0) {
      setShowInvitations(true);
    }
  }, [invitationsData]);

  // Count trials by status
  const getTrialCounts = () => {
    if (!trialsData?.trials) return { total: 0, enrollment: 0, document_review: 0 };
    
    const total = trialsData.trials.length;
    const enrollment = trialsData.trials.filter(trial => trial.status === 'enrollment').length;
    const document_review = trialsData.trials.filter(trial => trial.status === 'document_review').length;
    
    return { total, enrollment, document_review };
  };

  const trialCounts = getTrialCounts();

  // Get enrollment trial data if available
  const getEnrollmentData = () => {
    if (!trialsData?.trials) return null;
    
    const enrollmentTrial = trialsData.trials.find(trial => trial.status === 'enrollment');
    return enrollmentTrial ? {
      name: enrollmentTrial.name,
      enrolled: enrollmentTrial.metrics.enrolled,
      target: enrollmentTrial.metrics.target,
      identifiedLeads: enrollmentTrial.metrics.identified_leads,
      qualifiedPatients: enrollmentTrial.metrics.qualified
    } : null;
  };

  const enrollmentData = getEnrollmentData();

  // Get document trial data if available
  const getDocumentData = () => {
    if (!trialsData?.trials) return null;
    
    const documentTrial = trialsData.trials.find(trial => trial.status === 'document_review');
    return documentTrial ? {
      name: documentTrial.name,
      // Mock data since API doesn't provide detailed document counts
      totalDocuments: 20,
      draft: 3,
      pendingReview: 5,
      signed: 4,
      completed: 8
    } : null;
  };

  const documentData = getDocumentData();

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
      
      {/* Trials Overview Section */}
      {isLoadingTrials ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : trialsData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ActiveTrialsCard 
            totalTrials={trialCounts.total}
            enrollmentTrials={trialCounts.enrollment}
            documentTrials={trialCounts.document_review}
          />
          
          {enrollmentData ? (
            <EnrollmentOverviewCard 
              trialCount={trialCounts.enrollment}
              trialName={enrollmentData.name}
              enrolled={enrollmentData.enrolled}
              target={enrollmentData.target}
              identifiedLeads={enrollmentData.identifiedLeads}
              qualifiedPatients={enrollmentData.qualifiedPatients}
            />
          ) : (
            <Card className="bg-white h-full flex flex-col items-center justify-center p-6">
              <p className="text-gray-500 text-center">No enrollment trials</p>
            </Card>
          )}
          
          {documentData ? (
            <DocumentStatusCard 
              trialCount={trialCounts.document_review}
              trialName={documentData.name}
              totalDocuments={documentData.totalDocuments}
              draft={documentData.draft}
              pendingReview={documentData.pendingReview}
              signed={documentData.signed}
              completed={documentData.completed}
            />
          ) : (
            <Card className="bg-white h-full flex flex-col items-center justify-center p-6">
              <p className="text-gray-500 text-center">No document review trials</p>
            </Card>
          )}
        </div>
      )}
      
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
            <SiteReadinessCard readiness={analyticsData.site_readiness} />
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
