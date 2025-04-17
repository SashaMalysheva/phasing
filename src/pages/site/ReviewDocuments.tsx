import React, { useParams } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Upload, 
  FileUp, 
  Pen, 
  Download, 
  Eye 
} from "lucide-react";

import { Document } from './types/document';
import { useDocumentManagement } from './hooks/useDocumentManagement';
import { DocumentTable } from './components/DocumentTable';
import { format } from "date-fns";

const ReviewDocuments = () => {
  const { trialId } = useParams();
  const documentManagement = useDocumentManagement();

  // Mock documents data - ideally, this would come from an API
  const documents: Document[] = [
    {
      "id": "d1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/ca.pdf",
      "updated_at": "2024-01-10T14:30:00Z"
    },
    {
      "id": "e2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "completed",
      "document_url": "https://example.com/docs/fq.pdf",
      "updated_at": "2024-01-11T15:45:00Z"
    },
    {
      "id": "f3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "completed",
      "document_url": "https://example.com/docs/sq.pdf",
      "updated_at": "2024-01-12T16:20:00Z"
    },
    {
      "id": "a4b5c6d7-e8f9-4a5b-8c7d-9e0f1a2b3c4d",
      "site_trial_id": trialId || "",
      "document_type": "budget_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/ba.pdf",
      "updated_at": "2024-01-13T17:00:00Z"
    },
    {
      "id": "b5c6d7e8-f9a0-4b5c-9d0e-1f2a3b4c5d6e",
      "site_trial_id": trialId || "",
      "document_type": "clinical_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/cla.pdf",
      "updated_at": "2024-01-14T18:00:00Z"
    },
    {
      "id": "c6d7e8f9-a0b1-4c5d-0e1f-2a3b4c5d6e7f",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "pending_trial_review",
      "document_url": "https://example.com/docs/ca2.pdf",
      "updated_at": "2024-01-14T10:00:00Z"
    },
    {
      "id": "d7e8f9a0-b1c2-4d5e-1f2a-3b4c5d6e7f8a",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "pending_trial_review",
      "document_url": "https://example.com/docs/fq2.pdf",
      "updated_at": "2024-01-15T11:30:00Z"
    },
    {
      "id": "e8f9a0b1-c2d3-4e5f-2a3b-4c5d6e7f8a9b",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T12:00:00Z"
    },
    {
      "id": "f9a0b1c2-d3e4-4f5a-3b4c-5d6e7f8a9b0c",
      "site_trial_id": trialId || "",
      "document_type": "budget_agreement",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T13:00:00Z"
    },
    {
      "id": "a0b1c2d3-e4f5-4a5b-4c5d-6e7f8a9b0c1d",
      "site_trial_id": trialId || "",
      "document_type": "clinical_agreement",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T14:00:00Z"
    },
    {
      "id": "b1c2d3e4-f5a6-4b5c-5d6e-7f8a9b0c1d2e",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "pending_site_review",
      "document_url": "https://example.com/docs/ca3.pdf",
      "updated_at": "2024-01-16T10:00:00Z"
    },
    {
      "id": "c2d3e4f5-a6b7-4c5d-6e7f-8a9b0c1d2e3f",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "pending_site_review",
      "document_url": null,
      "updated_at": "2024-01-16T11:00:00Z"
    }
  ];

  // Group documents by status
  const pendingSiteReview = documents.filter(doc => doc.status === "pending_site_review");
  const draft = documents.filter(doc => doc.status === "draft");
  const pendingTrialReview = documents.filter(doc => doc.status === "pending_trial_review");
  const completed = documents.filter(doc => doc.status === "completed");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#6E59A5] mb-6">Document Review</h1>
      <p className="text-muted-foreground mb-8">
        Review and manage documents for trial ID: {trialId}
      </p>
      
      <div className="space-y-8">
        {pendingSiteReview.length > 0 && (
          <DocumentTable
            documents={pendingSiteReview}
            title="Pending Site Review"
            icon={Clock}
            onDocumentClick={documentManagement.handleDocumentClick}
            onActionClick={() => documentManagement.handleSign()}
            actionIcon={Pen}
            actionText="Sign"
            backgroundClass="bg-[#fcf7f8]"
          />
        )}

        {draft.length > 0 && (
          <DocumentTable
            documents={draft}
            title="Draft Documents"
            icon={FileText}
            onDocumentClick={documentManagement.handleDocumentClick}
            onActionClick={() => documentManagement.handleUpload()}
            actionIcon={FileUp}
            actionText="Upload"
            backgroundClass="bg-[#fcf7fb]"
          />
        )}

        {pendingTrialReview.length > 0 && (
          <DocumentTable
            documents={pendingTrialReview}
            title="Pending Trial Review"
            icon={Clock}
            onDocumentClick={documentManagement.handleDocumentClick}
            onActionClick={() => documentManagement.handleDownload()}
            actionIcon={Eye}
            actionText="View"
            backgroundClass="bg-[#faf7fc]"
          />
        )}

        {completed.length > 0 && (
          <DocumentTable
            documents={completed}
            title="Completed Documents"
            icon={CheckCircle2}
            onDocumentClick={documentManagement.handleDocumentClick}
            onActionClick={() => documentManagement.handleDownload()}
            actionIcon={Download}
            actionText="Download"
            backgroundClass="bg-[#ebf0f7]"
          />
        )}
      </div>

      {/* Document Detail Dialog */}
      <Dialog open={documentManagement.isDialogOpen} onOpenChange={documentManagement.setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {documentManagement.selectedDocument && formatDocumentType(documentManagement.selectedDocument.document_type)}
            </DialogTitle>
            <DialogDescription>
              {/* {getStatusBadge(documentManagement.selectedDocument?.status || "")} */}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Document ID</p>
                  <p className="font-medium">{documentManagement.selectedDocument?.id?.substring(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {documentManagement.selectedDocument?.updated_at && format(new Date(documentManagement.selectedDocument.updated_at), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">
                  {documentManagement.selectedDocument?.status.replace(/_/g, ' ')}
                </p>
              </div>
              
              {documentManagement.selectedDocument?.document_url && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">Document Preview</p>
                  <div className="border rounded h-[200px] flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">PDF Document</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {documentManagement.selectedDocument?.status === "pending_site_review" && (
              <Button onClick={documentManagement.handleSign} className="w-full sm:w-auto bg-[#6E59A5] hover:bg-[#8B5CF6]">
                <Pen className="h-4 w-4 mr-2" /> Sign Document
              </Button>
            )}
            
            {documentManagement.selectedDocument?.status === "draft" && (
              <Button onClick={documentManagement.handleUpload} className="w-full sm:w-auto bg-[#6E59A5] hover:bg-[#8B5CF6]">
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            )}
            
            {documentManagement.selectedDocument?.document_url && (
              <Button variant="outline" onClick={documentManagement.handleDownload} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Sign Dialog */}
      <AlertDialog open={documentManagement.isConfirmOpen} onOpenChange={documentManagement.setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Signature</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign this document? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={documentManagement.confirmSign}
              className="bg-[#6E59A5] hover:bg-[#8B5CF6]"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Upload Document Sheet */}
      <Sheet open={documentManagement.isUploadOpen} onOpenChange={documentManagement.setIsUploadOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Upload Document</SheetTitle>
            <SheetDescription>
              Upload a new version of {documentManagement.selectedDocument && formatDocumentType(documentManagement.selectedDocument.document_type)}
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={documentManagement.handleUploadSubmit} className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/25 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag & drop your file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PDF, DOCX, JPG up to 10MB
                </p>
                <input id="file" type="file" className="hidden" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input id="notes" placeholder="Add any relevant notes..." />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => documentManagement.setIsUploadOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#6E59A5] hover:bg-[#8B5CF6]"
              >
                Upload
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );

  // Format document type for display
  function formatDocumentType (type: string) {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
};

export default ReviewDocuments;
