
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
  // Default all document statuses to true unless explicitly set to false
  // This is because some staff members may not have all document fields defined
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
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            {staffMember.name}
            <Badge variant={staffMember.issues ? "outline" : "default"} 
                  className={staffMember.issues 
                    ? "bg-white text-[#6E59A5] border-[#6E59A5]" 
                    : "bg-green-100 text-green-800"}>
              {staffMember.issues ? "Needs Update" : "Ready"}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">{staffMember.role}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {staffMember.experience !== undefined && (
            <div className="text-sm">
              <span className="font-medium">Experience:</span> {staffMember.experience} years
            </div>
          )}

          {staffMember.issues && staffMember.issues.length > 0 && (
            <div className="bg-[#F1F0FB] p-3 rounded-lg border border-[#E5DEFF]">
              <h4 className="text-sm font-medium text-[#6E59A5] mb-2">Missing Items:</h4>
              <div className="flex flex-wrap gap-1.5">
                {staffMember.issues.map((issue, i) => (
                  <Badge key={i} variant="outline" className="bg-white border-[#E5DEFF] text-[#6E59A5]">
                    {issue}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Documents</h4>
            {documents.map((doc) => (
              <div
                key={doc.type}
                className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{doc.label}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
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
