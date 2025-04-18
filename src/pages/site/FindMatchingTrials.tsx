import React from "react";
import { useQuery } from "@tanstack/react-query";
import { findMatchingTrials } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Search, List, XCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { TrialMatchCard } from "@/components/site/TrialMatchCard";
import { Button } from "@/components/ui/button";

const FindMatchingTrials = () => {
  const { user } = useAuth();
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['matchingTrials', user?.id],
    queryFn: () => findMatchingTrials(user?.id || ''),
    enabled: !!user?.id,
  });

  const getScoreIcon = (score: number): JSX.Element => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Matching Trials</h1>
          <p className="text-muted-foreground mt-1">
            Discover trials that match your site's capabilities and patient population
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
            ))}
          </div>
        ) : isError ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-red-100 p-3 mb-3">
                <Search className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-base font-medium text-red-900 mb-2">Error Loading Trials</h3>
              <p className="text-red-600 text-sm text-center mb-4 max-w-md">
                We couldn't load matching trials. Please try again.
              </p>
              <Button onClick={() => refetch()} size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : data?.matching_trials && data.matching_trials.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Matches ({data.matching_trials.length})
              </TabsTrigger>
              <TabsTrigger value="high">
                High Match (90%+)
              </TabsTrigger>
              <TabsTrigger value="medium">
                Medium Match (70-89%)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-4">
                {data.matching_trials.map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} getScoreIcon={getScoreIcon} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="high">
              <div className="grid grid-cols-1 gap-4">
                {data.matching_trials
                  .filter(trial => trial.compatibility_score >= 90)
                  .map((trial) => (
                    <TrialMatchCard key={trial.id} trial={trial} getScoreIcon={getScoreIcon} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="medium">
              <div className="grid grid-cols-1 gap-4">
                {data.matching_trials
                  .filter(trial => trial.compatibility_score >= 70 && trial.compatibility_score < 90)
                  .map((trial) => (
                    <TrialMatchCard key={trial.id} trial={trial} getScoreIcon={getScoreIcon} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-gray-100 p-3 mb-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">No Matching Trials Found</h3>
              <p className="text-gray-500 text-sm text-center mb-4 max-w-md">
                We couldn't find any trials that match your site's capabilities.
                Please check back later.
              </p>
              <Button onClick={() => refetch()} size="sm" variant="outline">
                Refresh Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindMatchingTrials;
