
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Users, MapPin, Send } from "lucide-react";

interface SiteDetailsDialogProps {
  site: any;
  trigger?: React.ReactNode;
  onInvite: (siteId: string) => void;
}

export const SiteDetailsDialog = ({ site, trigger, onInvite }: SiteDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost">View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{site.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              This site maintains constant readiness. Average startup time: 2 days
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm mb-2">Readiness Checklist</h4>
                <div className="space-y-2">
                  {Object.entries({
                    "Data Privacy Policy": true,
                    "Source Agreement": true,
                    "SOPs Storage Monitoring": false,
                    "eRegulatory Binders": true,
                    "Source Templates": false,
                    "IATA Certification": true,
                  }).map(([item, status]) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <div className={`h-2 w-2 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Staff Experience (Years)</h4>
                <div className="space-y-2 text-sm">
                  <div>PI: 12 years</div>
                  <div>Sub-I: 16.7 years</div>
                  <div>CRC: 10 years</div>
                  <div>Pharmacist: 4 years</div>
                  <div>Lab: 16.3 years</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-3">Patient Pool</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Users className="h-4 w-4" />
              <span>{site.eligible_patient_count} / {site.total_patient_count} eligible patients</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{site.address}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Documents
            </Button>
            <Button 
              onClick={() => onInvite(site.id)}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Invite Site
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
