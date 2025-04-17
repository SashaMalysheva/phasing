

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
