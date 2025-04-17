
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
              Find Matching Trials
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover clinical trials that match your site's capabilities and patient population
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      ) : isError ? (
        <Card className="border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-destructive/10 p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-medium">Error Loading Trials</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              We couldn't load matching trials. Please check your connection and try again.
            </p>
            <Button onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      ) : data?.matching_trials && data.matching_trials.length > 0 ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-purple-100 dark:bg-purple-900/20 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All Matches ({data.matching_trials.length})
            </TabsTrigger>
            <TabsTrigger value="high" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              High Match (90%+)
            </TabsTrigger>
            <TabsTrigger value="medium" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
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
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="medium">
            <div className="grid grid-cols-1 gap-6">
              {data.matching_trials
                .filter(trial => trial.compatibility_score >= 70 && trial.compatibility_score < 90)
                .map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">No Matching Trials Found</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              We couldn't find any trials that match your site's capabilities.
              Please check back later or update your site profile.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper component for trial card
interface TrialCardProps {
  trial: any;
}

const TrialMatchCard: React.FC<TrialCardProps> = ({ trial }) => {
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
    <Card className="overflow-hidden border border-purple-100 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900/20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <CardTitle className="text-xl text-purple-900 dark:text-purple-300">{trial.name}</CardTitle>
            <CardDescription className="mt-1">{trial.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`font-bold text-2xl ${scoreColorClass}`}>{compatibilityScore}%</div>
              <div className="text-sm text-muted-foreground">Match Score</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" /> Eligible Patients
              </span>
              <span className="font-medium">
                {trial.eligible_patient_count}/{trial.total_patient_count}
              </span>
            </div>
            <CustomProgress 
              value={eligibleRatio} 
              className="h-2 bg-purple-100"
              indicatorClassName="bg-purple-600"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center">
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
                <h4 className="text-sm font-medium mb-3 flex items-center">
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
          
          {Object.keys(trial.rejection_reasons || {}).length > 3 && (
            <div>
              <h4 className="text-sm font-medium mb-3">All Rejection Reasons</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criteria</TableHead>
                    <TableHead className="text-right">Patients Affected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(trial.rejection_reasons)
                    .sort((a, b) => (b[1] as number) - (a[1] as number))
                    .map(([reason, count]) => (
                      <TableRow key={reason}>
                        <TableCell className="capitalize">{reason.replace(/_/g, ' ')}</TableCell>
                        <TableCell className="text-right">{count as number} patients</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gradient-to-r from-white to-purple-50 dark:from-gray-900/20 dark:to-purple-950/30 py-4">
        <div className="flex w-full justify-between items-center">
          <Button variant="outline" size="sm" className="text-purple-700 border-purple-200 hover:bg-purple-50">
            <FileText className="h-4 w-4 mr-1.5" />
            View Protocol
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Express Interest</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const RejectionReasonBadge: React.FC<{reason: string; count: number}> = ({ reason, count }) => {
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
