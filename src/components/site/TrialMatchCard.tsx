
import React from "react";
import { FileText, Users, Microscope } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TrialDetailsDialog } from "./TrialDetailsDialog";

interface TrialMatchCardProps {
  trial: any;
  getScoreIcon: (score: number) => JSX.Element;
}

export const TrialMatchCard = ({ trial, getScoreIcon }: TrialMatchCardProps) => {
  const compatibilityScore = Math.round(trial.compatibility_score);
  
  return (
    <TrialDetailsDialog
      trial={trial}
      trigger={
        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl text-gray-900">{trial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{trial.description}</p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Eligible: {trial.eligible_patients || 0}/{trial.total_patients || 300}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Microscope className="h-4 w-4" />
                    <span>Features: {trial.compatible_features?.length || 0}</span>
                  </div>
                </div>
              </div>
              <Badge 
                variant={compatibilityScore === 100 ? "default" : compatibilityScore >= 70 ? "secondary" : "destructive"}
                className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
              >
                {compatibilityScore}% Match
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Compatibility</span>
                  <span className="font-medium text-[#6E59A5]">{compatibilityScore}%</span>
                </div>
                <Progress value={compatibilityScore} className="h-2 bg-purple-100" />
              </div>

              {trial.rejection_reasons && Object.keys(trial.rejection_reasons).length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Top Rejection Factors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(trial.rejection_reasons)
                        .sort(([, a], [, b]) => (b as number) - (a as number))
                        .slice(0, 3)
                        .map(([reason, count]) => (
                          <Badge 
                            key={reason}
                            variant="outline"
                            className="bg-white border-gray-200"
                          >
                            {reason.replace(/_/g, ' ')} ({count as number})
                          </Badge>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t py-3 px-6 bg-gray-50/50">
            <div className="flex w-full justify-between items-center">
              <Button variant="outline" size="sm" className="text-gray-600">
                <FileText className="h-4 w-4 mr-2" />
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
      }
    />
  );
};
