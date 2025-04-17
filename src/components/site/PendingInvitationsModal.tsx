
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { acceptTrialInvitation, declineTrialInvitation } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface Invitation {
  trial_id: string;
  trial_name: string;
  sponsor_id: string;
  sponsor_name: string;
  compatibility_score?: number;
  date_requested: string;
}

interface PendingInvitationsModalProps {
  open: boolean;
  onClose: () => void;
  invitations: Invitation[];
}

const PendingInvitationsModal: React.FC<PendingInvitationsModalProps> = ({
  open,
  onClose,
  invitations
}) => {
  const queryClient = useQueryClient();

  const handleAccept = async (siteId: string, trialId: string) => {
    try {
      await acceptTrialInvitation(siteId, trialId);
      queryClient.invalidateQueries({ queryKey: ['siteInvitations'] });
      queryClient.invalidateQueries({ queryKey: ['siteTrials'] });
      toast({
        title: "Invitation Accepted",
        description: "You have joined the trial.",
      });
      
      if (invitations.length === 1) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (siteId: string, trialId: string) => {
    try {
      await declineTrialInvitation(siteId, trialId);
      queryClient.invalidateQueries({ queryKey: ['siteInvitations'] });
      toast({
        title: "Invitation Declined",
        description: "The trial invitation has been declined.",
      });
      
      if (invitations.length === 1) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pending Trial Invitations</DialogTitle>
          <DialogDescription>
            You've been invited to participate in the following trials. Review and respond to these invitations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {invitations.map((invitation) => (
            <div key={invitation.trial_id} className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{invitation.trial_name}</h4>
                {invitation.compatibility_score && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {invitation.compatibility_score}% Match
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                From sponsor: <span className="font-medium">{invitation.sponsor_name}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Invited on {new Date(invitation.date_requested).toLocaleDateString()}
              </p>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDecline(invitation.sponsor_id, invitation.trial_id)}
                >
                  Decline
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleAccept(invitation.sponsor_id, invitation.trial_id)}
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PendingInvitationsModal;
