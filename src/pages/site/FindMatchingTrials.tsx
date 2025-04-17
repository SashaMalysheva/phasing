
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { findMatchingTrials } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, RefreshCw, Search, XCircle } from "lucide-react";

const FindMatchingTrials = () => {
  const { user } = useAuth();
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['matchingTrials', user?.id],
    queryFn: () => findMatchingTrials(user?.id || ''),
    enabled: !!user?.id,
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Find Matching Trials</h1>
          <p className="text-muted-foreground">
            Discover trials that match your site's capabilities and patient population
          </p>
        </div>
        
        <div className="flex gap-2">
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
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full" />
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium">Error Loading Trials</h3>
            <p className="text-muted-foreground text-center mb-4">
              We couldn't load matching trials. Please try again.
            </p>
            <Button onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      ) : data?.matching_trials && data.matching_trials.length > 0 ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="high">High Match (90%+)</TabsTrigger>
            <TabsTrigger value="medium">Medium Match (70-89%)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {data.matching_trials.map((trial) => (
                <TrialMatchCard key={trial.id} trial={trial} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="high">
            <div className="space-y-4">
              {data.matching_trials
                .filter(trial => trial.compatibility_score >= 90)
                .map((trial) => (
                  <TrialMatchCard key={trial.id} trial={trial} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="medium">
            <div className="space-y-4">
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
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Matching Trials Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              We couldn't find any trials that match your site's capabilities.
            </p>
            <Button onClick={() => refetch()}>Refresh Search</Button>
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
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">{trial.name}</CardTitle>
            <CardDescription>{trial.sponsor_name}</CardDescription>
          </div>
          <div className="text-right">
            <div className="font-bold text-2xl">{Math.round(trial.compatibility_score)}%</div>
            <div className="text-sm text-muted-foreground">Match Score</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Eligible Patients</span>
              <span className="font-medium">{trial.eligible_patients}/{trial.total_patients}</span>
            </div>
            <Progress 
              value={(trial.eligible_patients / trial.total_patients) * 100} 
              className="h-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Compatible Features</h4>
              <div className="flex flex-wrap gap-1">
                {trial.compatible_features.map((feature: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> 
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            {trial.incompatible_features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Incompatible Features</h4>
                <div className="flex flex-wrap gap-1">
                  {trial.incompatible_features.map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-red-200 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" /> 
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {trial.rejection_reasons && Object.keys(trial.rejection_reasons).length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Patient Rejection Reasons</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(trial.rejection_reasons).map(([reason, count]: [string, any]) => (
                  <div key={reason} className="bg-muted rounded p-2 text-sm">
                    <div className="font-medium">{reason.replace(/_/g, ' ')}</div>
                    <div className="text-muted-foreground">{count} patients</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button>Express Interest</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FindMatchingTrials;
