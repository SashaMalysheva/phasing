
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { findMatchingTrials } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomProgress } from "@/components/ui/custom-progress";
import { 
  RefreshCw, 
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FindMatchingTrials = () => {
  const { user } = useAuth();
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['matchingTrials', user?.id],
    queryFn: () => findMatchingTrials(user?.id || ''),
    enabled: !!user?.id,
  });

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Find Matching Trials
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Discover clinical trials that match your site's capabilities
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            className="flex items-center bg-white hover:bg-gray-50"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      ) : isError ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-red-100 p-2 mb-3">
              <XCircle className="h-6 w-6 text-red-600" />
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
                <TrialMatchCard key={trial.id} trial={trial} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="high">
            <div className="grid grid-cols-1 gap-4">
              {data.matching_trials
                .filter(trial => trial.compatibility_score >= 90)
                .map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medium">
            <div className="grid grid-cols-1 gap-4">
              {data.matching_trials
                .filter(trial => trial.compatibility_score >= 70 && trial.compatibility_score < 90)
                .map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-gray-100 p-2 mb-3">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No Matching Trials Found</h3>
            <p className="text-gray-500 text-sm text-center mb-4 max-w-md">
              We couldn't find any trials that match your site's capabilities.
              Please check back later.
            </p>
            <Button onClick={() => refetch()} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const TrialMatchCard = ({ trial }: { trial: any }) => {
  const compatibilityScore = Math.round(trial.compatibility_score);
  const scoreColorClass = compatibilityScore >= 90 
    ? "text-green-600" 
    : compatibilityScore >= 70 
      ? "text-amber-600" 
      : "text-red-600";
  
  const eligibleRatio = (trial.eligible_patient_count / trial.total_patient_count) * 100;
  
  const topRejectionReasons = trial.rejection_reasons 
    ? Object.entries(trial.rejection_reasons)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 3)
    : [];

  const getStatusIcon = (reason: string, count: number) => {
    if (count > 200) return <XCircle className="h-3.5 w-3.5 text-red-500" />;
    if (count > 100) return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />;
    return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
  };
  
  return (
    <Card className="overflow-hidden border-gray-200 hover:bg-gray-50/50 transition-all duration-200">
      <CardHeader className="pb-2 space-y-2">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium text-gray-900">{trial.name}</CardTitle>
            <p className="text-sm text-gray-500">{trial.description}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1.5">
                  <span className={`text-base font-medium ${scoreColorClass}`}>
                    {compatibilityScore}%
                  </span>
                  {getScoreIcon(compatibilityScore)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Trial Match Score</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Eligible Patients</span>
            <span className="font-medium">
              {trial.eligible_patient_count}/{trial.total_patient_count}
            </span>
          </div>
          
          <div className="grid gap-4">
            {topRejectionReasons.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  Top Rejection Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topRejectionReasons.map(([reason, count]) => (
                    <TooltipProvider key={reason}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline"
                            className="bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                          >
                            {getStatusIcon(reason, count as number)}
                            <span className="ml-1 capitalize">{reason.replace(/_/g, ' ')}</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{count} patients rejected due to {reason.replace(/_/g, ' ')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t py-3 px-6 bg-gray-50/50">
        <div className="flex w-full justify-between items-center">
          <Button variant="outline" size="sm" className="text-gray-600">
            <FileText className="h-4 w-4 mr-1.5" />
            View Protocol
          </Button>
          <Button 
            size="sm" 
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
          >
            Express Interest
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FindMatchingTrials;
