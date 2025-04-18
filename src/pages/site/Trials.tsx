
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { getSiteTrials } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";

const Trials = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: trialsData, isLoading } = useQuery({
    queryKey: ['siteTrials', user?.id],
    queryFn: () => getSiteTrials(user?.id || ''),
    enabled: !!user?.id,
  });

  const handleTrialClick = (trial: any) => {
    // Navigate based on trial status
    if (trial.status === "document_review") {
      navigate(`/site/trials/${trial.id}/documents`);
    } else {
      navigate(`/site/trials/${trial.id}/enrollment`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Trials</h1>
          <p className="text-gray-600 mt-2">Track your site's progress across different clinical studies</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : trialsData?.trials && trialsData.trials.length > 0 ? (
        <div className="space-y-4">
          {trialsData.trials.map((trial) => (
            <Card 
              key={trial.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTrialClick(trial)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{trial.name}</CardTitle>
                    <p className="text-sm text-gray-600">{trial.sponsor_name}</p>
                  </div>
                  <TrialStatusBadge status={trial.status} />
                </div>
              </CardHeader>
              
              <CardContent>
                {trial.status === "enrollment" && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment Progress</span>
                      <span className="font-medium text-[#6E59A5]">
                        {trial.metrics.enrolled} / {trial.metrics.target}
                      </span>
                    </div>
                    <Progress 
                      value={(trial.metrics.enrolled / trial.metrics.target) * 100} 
                      className="h-2 bg-purple-100"
                    />
                    
                    <div className="grid grid-cols-3 gap-4 mt-2 p-2 bg-purple-50/50 rounded-md">
                      <div className="text-center">
                        <div className="text-lg font-medium text-[#6E59A5]">
                          {trial.metrics.identified_leads}
                        </div>
                        <div className="text-xs text-muted-foreground">Identified</div>
                      </div>
                      <div className="text-center border-x border-purple-100">
                        <div className="text-lg font-medium text-[#6E59A5]">
                          {trial.metrics.qualified}
                        </div>
                        <div className="text-xs text-muted-foreground">Qualified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium text-[#6E59A5]">
                          {trial.metrics.ongoing_outreach}
                        </div>
                        <div className="text-xs text-muted-foreground">Outreach</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {trial.status === "document_review" && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-2">Document Statuses:</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
                        <span className="text-sm text-muted-foreground">Draft</span>
                        <span className="font-medium text-[#6E59A5]">3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
                        <span className="text-sm text-muted-foreground">Pending Site Review</span>
                        <span className="font-medium text-[#6E59A5]">5</span>
                      </div>
                      <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
                        <span className="text-sm text-muted-foreground">Site Signed</span>
                        <span className="font-medium text-[#6E59A5]">4</span>
                      </div>
                      <div className="flex justify-between p-2 bg-purple-50/30 rounded-md">
                        <span className="text-sm text-muted-foreground">Completed</span>
                        <span className="font-medium text-[#6E59A5]">8</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-center mt-8">
            <Link to="/site/trials/find">
              <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]">
                <Search className="mr-2 h-4 w-4" /> Find More Trials
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 p-2 mb-3">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No Trials Found</h3>
            <p className="text-gray-500 text-sm text-center mb-4 max-w-md">
              You're not participating in any trials yet. Start by finding trials that match your site's capabilities.
            </p>
            <Link to="/site/trials/find">
              <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]">
                Find Matching Trials
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Trials;
