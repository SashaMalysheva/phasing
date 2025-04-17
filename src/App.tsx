import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';

// Import layouts
import SponsorLayout from '@/components/sponsor/SponsorLayout';
import SiteLayout from '@/components/site/SiteLayout';

// Import pages
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

// Import sponsor pages
import SponsorDashboard from '@/pages/sponsor/Dashboard';
import SponsorAnalytics from '@/pages/sponsor/Analytics';
import SponsorSettings from '@/pages/sponsor/Settings';
import SponsorFindSites from '@/pages/sponsor/FindSites';
import SponsorCreateTrial from '@/pages/sponsor/CreateTrial';

// Import site pages
import SiteDashboard from '@/pages/site/Dashboard';
import SiteAnalytics from '@/pages/site/Analytics';
import SiteSettings from '@/pages/site/Settings';
import StaffPage from '@/pages/site/Staff';
import SiteReadiness from '@/pages/site/SiteReadiness';
import FindMatchingTrials from '@/pages/site/FindMatchingTrials';
import EnrollmentBoard from '@/pages/site/EnrollmentBoard';
import ReviewDocuments from '@/pages/site/ReviewDocuments';

// Import components
import ProtectedRoute from '@/components/shared/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Sponsor Routes */}
            <Route 
              path="/sponsor/*" 
              element={
                <ProtectedRoute requiredRole="sponsor">
                  <SponsorLayout>
                    <Routes>
                      <Route path="dashboard" element={<SponsorDashboard />} />
                      <Route path="analytics" element={<SponsorAnalytics />} />
                      <Route path="settings" element={<SponsorSettings />} />
                      <Route path="find-sites" element={<SponsorFindSites />} />
                      <Route path="trials/create" element={<SponsorCreateTrial />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SponsorLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Site Routes */}
            <Route 
              path="/site/*" 
              element={
                <ProtectedRoute requiredRole="site">
                  <SiteLayout>
                    <Routes>
                      <Route path="dashboard" element={<SiteDashboard />} />
                      <Route path="analytics" element={<SiteAnalytics />} />
                      <Route path="settings" element={<SiteSettings />} />
                      <Route path="staff" element={<StaffPage />} />
                      <Route path="readiness" element={<SiteReadiness />} />
                      <Route path="trials/find" element={<FindMatchingTrials />} />
                      <Route path="trials/:trialId/enrollment" element={<EnrollmentBoard />} />
                      <Route path="trials/:trialId/documents" element={<ReviewDocuments />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </SiteLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
