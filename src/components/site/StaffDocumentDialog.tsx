
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";

interface StaffDocument {
  type: "cv" | "gcp" | "medical_license" | "delegation";
  label: string;
  uploaded: boolean;
}

interface StaffDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: {
    full_name: string;
    role: string;
    cv_uploaded: boolean;
    gcp_certification: boolean;
    medical_license: boolean;
    delegation_of_authority: boolean;
  };
}

const StaffDocumentDialog = ({ isOpen, onClose, staffMember }: StaffDocumentDialogProps) => {
  const documents: StaffDocument[] = [
    { type: "cv", label: "Curriculum Vitae", uploaded: staffMember.cv_uploaded },
    { type: "gcp", label: "GCP Certification", uploaded: staffMember.gcp_certification },
    { type: "medical_license", label: "Medical License", uploaded: staffMember.medical_license },
    { type: "delegation", label: "Delegation of Authority", uploaded: staffMember.delegation_of_authority },
  ];

  const handleViewDocument = (type: string) => {
    // Here you would implement the document viewing logic
    console.log("Viewing document:", type);
  };

  const handleUploadDocument = (type: string) => {
    // Here you would implement the document upload logic
    console.log("Uploading document:", type);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {staffMember.full_name} - Documents
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {documents.map((doc) => (
            <div
              key={doc.type}
              className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{doc.label}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {doc.uploaded ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Uploaded</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-amber-500" />
                        <span>Missing</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  doc.uploaded
                    ? handleViewDocument(doc.type)
                    : handleUploadDocument(doc.type)
                }
              >
                {doc.uploaded ? (
                  <FileText className="h-4 w-4 mr-1" />
                ) : (
                  <Upload className="h-4 w-4 mr-1" />
                )}
                {doc.uploaded ? "View" : "Upload"}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDocumentDialog;
