import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrialWithSites, getTrialDetails } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { SiteDetailsDialog } from "./SiteDetailsDialog";

interface FindSitesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trialId: string;
}

const FindSitesSheet: React.FC<FindSitesSheetProps> = ({
  open,
  onOpenChange,
  trialId,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: trialData, isLoading: isLoadingTrial } = useQuery({
    queryKey: ['trial', trialId],
    queryFn: () => getTrialDetails(trialId || ''),
    enabled: !!trialId && open,
  });

  const { data: sitesData, isLoading: isLoadingSites } = useQuery({
    queryKey: ['trialSites', trialId],
    queryFn: () => getTrialWithSites(trialId || ''),
    enabled: !!trialId && open,
  });

  const isLoading = isLoadingTrial || isLoadingSites;

  const handleViewFullDetails = () => {
    navigate(`/sponsor/trials/${trialId}`);
    onOpenChange(false);
  };

  const handleInviteSite = (siteId: string) => {
    toast({
      title: "Invitation Sent",
      description: "The site has been invited to participate in the trial.",
    });
  };

  const getCompatibilityVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "destructive";
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Find Sites</SheetTitle>
          <SheetDescription>
            Available sites and their compatibility scores
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">{trialData?.name}</h3>
            
            <div className="space-y-4">
              {sitesData?.sites.map((site) => (
                <div 
                  key={site.id} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{site.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4" />
                        {site.address}
                      </div>
                    </div>
                    <Badge variant={getCompatibilityVariant(site.compatibility_score)}>
                      Match: {site.compatibility_score}%
                      {site.compatibility_score >= 90 && (
                        <CheckCircle2 className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Users className="h-4 w-4" />
                    <span>{site.eligible_patient_count} eligible patients</span>
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <SiteDetailsDialog 
                      site={site}
                      onInvite={handleInviteSite}
                      trigger={
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      }
                    />
                    <Button 
                      onClick={() => handleInviteSite(site.id)}
                      size="sm"
                      className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Invite Site
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <SheetClose asChild>
                <Button variant="outline" className="mr-2">Close</Button>
              </SheetClose>
              <Button onClick={handleViewFullDetails}>View Full Details</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FindSitesSheet;
