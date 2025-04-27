import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';

// Import layouts
import SiteLayout from '@/components/site/SiteLayout';

// Import pages
import NotFound from '@/pages/NotFound';

// Import site pages
import SiteDashboard from '@/pages/site/Dashboard';
import SiteAnalytics from '@/pages/site/Analytics';
import SiteSettings from '@/pages/site/Settings';
import StaffPage from '@/pages/site/Staff';
import SiteReadiness from '@/pages/site/SiteReadiness';
import EnrollmentBoard from '@/pages/site/EnrollmentBoard';
import ReviewDocuments from '@/pages/site/ReviewDocuments';
import Taskboard from '@/components/task/Taskboard';

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
            <Route path="/" element={<SiteLayout><Outlet /></SiteLayout>}>
              <Route index element={<SiteDashboard />} />
              <Route path="analytics" element={<SiteAnalytics />} />
              <Route path="settings" element={<SiteSettings />} />
              <Route path="staff" element={<StaffPage />} />
              <Route path="readiness" element={<SiteReadiness />} />
              <Route path="trials/:trialId/enrollment" element={<EnrollmentBoard />} />
              <Route path="trials/:trialId/documents" element={<ReviewDocuments />} />
              <Route path="my-task" element={<Taskboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
