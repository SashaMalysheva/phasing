
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertCircle } from "lucide-react";

interface StaffDocument {
  type: "cv" | "gcp" | "medical_license" | "delegation";
  label: string;
  uploaded: boolean;
}

interface StaffInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: {
    name: string;
    role: string;
    issues: string[] | null;
    documents?: {
      cv_uploaded?: boolean;
      gcp_certification?: boolean;
      medical_license?: boolean;
      delegation_of_authority?: boolean;
    };
    experience?: number;
  };
}

const StaffInfoDialog = ({ isOpen, onClose, staffMember }: StaffInfoDialogProps) => {
  const documents: StaffDocument[] = [
    { type: "cv", label: "Curriculum Vitae", uploaded: staffMember.documents?.cv_uploaded !== false },
    { type: "gcp", label: "GCP Certification", uploaded: staffMember.documents?.gcp_certification !== false },
    { type: "medical_license", label: "Medical License", uploaded: staffMember.documents?.medical_license !== false },
    { type: "delegation", label: "Delegation of Authority", uploaded: staffMember.documents?.delegation_of_authority !== false },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between text-[#6E59A5]">
            {staffMember.name}
            <Badge 
              variant={staffMember.issues ? "outline" : "default"} 
              className={staffMember.issues 
                ? "bg-[#F1F0FB] text-[#6E59A5] border-[#9B87F5]" 
                : "bg-green-100 text-green-800"}
            >
              {staffMember.issues ? "Needs Update" : "Ready"}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">{staffMember.role}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {staffMember.experience !== undefined && (
            <div className="text-sm">
              <span className="font-medium text-[#6E59A5]">Experience:</span> 
              <span className="ml-2 text-[#6E59A5]">{staffMember.experience} years</span>
            </div>
          )}

          {staffMember.issues && staffMember.issues.length > 0 && (
            <div className="bg-[#F9F7FF] p-3 rounded-lg border border-[#E5DEFF]">
              <h4 className="text-sm font-medium text-[#6E59A5] mb-2">Missing Items:</h4>
              <div className="flex flex-wrap gap-1.5">
                {staffMember.issues.map((issue, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="bg-white border-[#9B87F5] text-[#6E59A5] border-opacity-50"
                  >
                    {issue}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#6E59A5]">Documents</h4>
            {documents.map((doc) => (
              <div
                key={doc.type}
                className="flex items-center justify-between p-3 bg-[#F9F7FF] rounded-lg border border-[#E5DEFF]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#6E59A5]" />
                  <div>
                    <p className="font-medium text-sm text-[#6E59A5]">{doc.label}</p>
                    <p className="text-xs text-[#6E59A5] flex items-center gap-1">
                      {doc.uploaded ? (
                        <>
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 text-[#6E59A5]" />
                          <span>Missing</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffInfoDialog;
