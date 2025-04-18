
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, FileText, Users, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSiteTrials } from "@/lib/api";
import TrialStatusBadge from "@/components/shared/TrialStatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

const Trials = () => {
  const { user } = useAuth();

  const { data: trialsData, isLoading } = useQuery({
    queryKey: ['siteTrials', user?.id],
    queryFn: () => getSiteTrials(user?.id || ''),
    enabled: !!user?.id,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Trials</h1>
          <p className="text-muted-foreground">Welcome, {user?.name || 'Site Admin'}</p>
        </div>
        
        <Link to="/site/trials/find">
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Find More Trials
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : trialsData?.trials && trialsData.trials.length > 0 ? (
          <div className="grid gap-4">
            {trialsData.trials.map((trial) => (
              <Card key={trial.id} className="p-6 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{trial.name}</h3>
                        <TrialStatusBadge status={trial.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">Phase {trial.phase} - {trial.therapeutic_area}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      {trial.status === "enrollment" && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#8B5CF6]" />
                          <span>
                            {trial.enrolled_count} enrolled / {trial.target_count} target
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

                    <div className="flex gap-2">
                      {trial.status === "enrollment" && (
                        <Link to={`/site/trials/${trial.id}/enrollment`}>
                          <Button 
                            variant="ghost"
                            className="text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-purple-50 gap-2"
                          >
                            View Board
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {trial.status === "document_review" && (
                        <Link to={`/site/trials/${trial.id}/documents`}>
                          <Button 
                            variant="ghost"
                            className="text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-purple-50 gap-2"
                          >
                            Review Documents
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center border border-gray-100">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">No Active Trials</h3>
              <p className="text-muted-foreground mb-4">
                You haven't joined any trials yet. Find and join trials that match your site's capabilities.
              </p>
              <Link to="/site/trials/find">
                <Button>Find Matching Trials</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Trials;
