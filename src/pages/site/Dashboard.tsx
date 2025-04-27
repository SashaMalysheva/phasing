import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getSiteAnalytics, getSiteTrials } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";
import SiteStaffCard from "@/components/site/SiteStaffCard";

const SiteDashboard = () => {
  const { user } = useAuth();
  
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Site Overview</h1>
          <p className="text-gray-600">Welcome, {user?.name || 'Site Admin'}</p>
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
