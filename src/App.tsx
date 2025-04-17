
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import SponsorLayout from "@/components/sponsor/SponsorLayout";
import SiteLayout from "@/components/site/SiteLayout";

// Pages
import Login from "@/pages/Login";
import SponsorDashboard from "@/pages/sponsor/Dashboard";
import SiteDashboard from "@/pages/site/Dashboard";
import StaffPage from "@/pages/site/Staff";
import FindMatchingTrials from "@/pages/site/FindMatchingTrials";
import NotFound from "./pages/NotFound";

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
                      {/* Add other sponsor routes here */}
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
                      <Route path="staff" element={<StaffPage />} />
                      <Route path="trials/find" element={<FindMatchingTrials />} />
                      {/* Add other site routes here */}
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
