
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { findMatchingTrials } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  RefreshCw, 
  Search, 
  XCircle,
  AlertTriangle,
  Users,
  CalendarClock,
  Activity
} from "lucide-react";

const FindMatchingTrials = () => {
  const { user } = useAuth();
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['matchingTrials', user?.id],
    queryFn: () => findMatchingTrials(user?.id || ''),
    enabled: !!user?.id,
  });
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Find Matching Trials
            </h1>
            <p className="text-gray-600 mt-1">
              Discover clinical trials that match your site's capabilities and patient population
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            className="flex items-center bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      ) : isError ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-red-900">Error Loading Trials</h3>
            <p className="text-red-600 text-center mb-4 max-w-md">
              We couldn't load matching trials. Please check your connection and try again.
            </p>
            <Button onClick={() => refetch()} className="bg-red-600 hover:bg-red-700 text-white">Retry</Button>
          </CardContent>
        </Card>
      ) : data?.matching_trials && data.matching_trials.length > 0 ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 p-1 bg-[#F8F9FC]">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white"
            >
              All Matches ({data.matching_trials.length})
            </TabsTrigger>
            <TabsTrigger 
              value="high" 
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white"
            >
              High Match (90%+)
            </TabsTrigger>
            <TabsTrigger 
              value="medium" 
              className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white"
            >
              Medium Match (70-89%)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6">
              {data.matching_trials.map((trial) => (
                <TrialMatchCard key={trial.id} trial={trial} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="high">
            <div className="grid grid-cols-1 gap-6">
              {data.matching_trials
                .filter(trial => trial.compatibility_score >= 90)
                .map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medium">
            <div className="grid grid-cols-1 gap-6">
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
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">No Matching Trials Found</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              We couldn't find any trials that match your site's capabilities.
              Please check back later or update your site profile.
            </p>
            <Button onClick={() => refetch()} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
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
  
  return (
    <Card className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <CardTitle className="text-xl text-gray-900">{trial.name}</CardTitle>
            <CardDescription className="mt-1 text-gray-600">{trial.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`font-bold text-2xl ${scoreColorClass}`}>{compatibilityScore}%</div>
              <div className="text-sm text-gray-600">Match Score</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center text-gray-700">
                <Users className="h-4 w-4 mr-1" /> Eligible Patients
              </span>
              <span className="font-medium text-gray-900">
                {trial.eligible_patient_count}/{trial.total_patient_count}
              </span>
            </div>
            <CustomProgress 
              value={eligibleRatio} 
              className="h-2 bg-gray-100"
              indicatorClassName={compatibilityScore >= 90 ? "bg-green-500" : compatibilityScore >= 70 ? "bg-amber-500" : "bg-red-500"}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center text-gray-900">
                <CheckCircle2 className="h-4 w-4 mr-1.5 text-green-600" /> 
                Compatibility Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> 
                  Site Facilities
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> 
                  Staff Experience
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> 
                  Data Management
                </Badge>
              </div>
            </div>
            
            {topRejectionReasons.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center text-gray-900">
                  <AlertTriangle className="h-4 w-4 mr-1.5 text-amber-600" /> 
                  Top Patient Rejection Factors
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {topRejectionReasons.map(([reason, count]) => (
                    <RejectionReasonBadge key={reason} reason={reason} count={count as number} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 py-4">
        <div className="flex w-full justify-between items-center">
          <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-100">
            <FileText className="h-4 w-4 mr-1.5" />
            View Protocol
          </Button>
          <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">Express Interest</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const RejectionReasonBadge = ({ reason, count }: { reason: string; count: number }) => {
  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case 'age':
        return <Users className="h-3.5 w-3.5 mr-1" />;
      case 'diagnosis_date':
        return <CalendarClock className="h-3.5 w-3.5 mr-1" />;
      case 'performance_status':
        return <Activity className="h-3.5 w-3.5 mr-1" />;
      default:
        return <XCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };
  
  return (
    <div className="bg-amber-50 text-amber-800 border border-amber-200 rounded-md px-2.5 py-1.5 text-xs flex items-center justify-between">
      <span className="flex items-center capitalize">
        {getReasonIcon(reason)}
        {reason.replace(/_/g, ' ')}
      </span>
      <span className="font-medium">{count}</span>
    </div>
  );
};

export default FindMatchingTrials;
