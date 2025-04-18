import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileText, Upload, Clock, FileUp, Pen, Download, Eye } from "lucide-react";

// Document types for TypeScript
interface Document {
  id: string;
  site_trial_id: string;
  document_type: string;
  status: "draft" | "pending_site_review" | "pending_trial_review" | "site_signed" | "trial_signed" | "completed";
  document_url: string | null;
  updated_at: string;
}

const ReviewDocuments = () => {
  const { trialId } = useParams();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Updated mock documents data to reflect new statuses and counts
  const documents: Document[] = [
    // Draft Documents (3)
    {
      "id": "draft1",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T14:00:00Z"
    },
    {
      "id": "draft2",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T14:00:00Z"
    },
    {
      "id": "draft3",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "draft",
      "document_url": null,
      "updated_at": "2024-01-15T14:00:00Z"
    },
    // Pending Site Review (5)
    {
      "id": "pending_site1",
      "site_trial_id": trialId || "",
      "document_type": "budget_agreement",
      "status": "pending_site_review",
      "document_url": "https://example.com/docs/ba.pdf",
      "updated_at": "2024-01-16T10:00:00Z"
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
    },
    {
      "id": "d7e8f9a0-b1c2-4d5e-1f2a-3b4c5d6e7f8a",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "pending_site_review",
      "document_url": "https://example.com/docs/fq2.pdf",
      "updated_at": "2024-01-15T11:30:00Z"
    },
    {
      "id": "e8f9a0b1-c2d3-4e5f-2a3b-4c5d6e7f8a9b",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "pending_site_review",
      "document_url": null,
      "updated_at": "2024-01-15T12:00:00Z"
    },
    // Pending Trial Review (2)
    {
      "id": "f3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "pending_trial_review",
      "document_url": "https://example.com/docs/sq.pdf",
      "updated_at": "2024-01-12T16:20:00Z"
    },
    {
      "id": "c6d7e8f9-a0b1-4c5d-0e1f-2a3b4c5d6e7f",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "pending_trial_review",
      "document_url": "https://example.com/docs/ca2.pdf",
      "updated_at": "2024-01-14T10:00:00Z"
    },
    // Site Signed (4)
    {
      "id": "site_signed1",
      "site_trial_id": trialId || "",
      "document_type": "budget_agreement",
      "status": "site_signed",
      "document_url": "https://example.com/docs/ba.pdf",
      "updated_at": "2024-01-13T17:00:00Z"
    },
    {
      "id": "site_signed2",
      "site_trial_id": trialId || "",
      "document_type": "clinical_agreement",
      "status": "site_signed",
      "document_url": "https://example.com/docs/cla.pdf",
      "updated_at": "2024-01-14T18:00:00Z"
    },
    {
      "id": "site_signed3",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "site_signed",
      "document_url": "https://example.com/docs/ca2.pdf",
      "updated_at": "2024-01-14T10:00:00Z"
    },
    {
      "id": "site_signed4",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "site_signed",
      "document_url": "https://example.com/docs/fq2.pdf",
      "updated_at": "2024-01-15T11:30:00Z"
    },
    // Trial Signed (1)
    {
      "id": "trial_signed1",
      "site_trial_id": trialId || "",
      "document_type": "clinical_agreement",
      "status": "trial_signed",
      "document_url": "https://example.com/docs/cla.pdf",
      "updated_at": "2024-01-14T18:00:00Z"
    },
    // Completed (8)
    {
      "id": "completed1",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/ca.pdf",
      "updated_at": "2024-01-10T14:30:00Z"
    },
    {
      "id": "completed2",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "completed",
      "document_url": "https://example.com/docs/fq.pdf",
      "updated_at": "2024-01-11T15:45:00Z"
    },
    {
      "id": "completed3",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "completed",
      "document_url": "https://example.com/docs/sq.pdf",
      "updated_at": "2024-01-12T16:20:00Z"
    },
    {
      "id": "completed4",
      "site_trial_id": trialId || "",
      "document_type": "budget_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/ba.pdf",
      "updated_at": "2024-01-13T17:00:00Z"
    },
    {
      "id": "completed5",
      "site_trial_id": trialId || "",
      "document_type": "clinical_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/cla.pdf",
      "updated_at": "2024-01-14T18:00:00Z"
    },
    {
      "id": "completed6",
      "site_trial_id": trialId || "",
      "document_type": "confidentiality_agreement",
      "status": "completed",
      "document_url": "https://example.com/docs/ca2.pdf",
      "updated_at": "2024-01-14T10:00:00Z"
    },
    {
      "id": "completed7",
      "site_trial_id": trialId || "",
      "document_type": "feasibility_questionnaire",
      "status": "completed",
      "document_url": "https://example.com/docs/fq2.pdf",
      "updated_at": "2024-01-15T11:30:00Z"
    },
    {
      "id": "completed8",
      "site_trial_id": trialId || "",
      "document_type": "site_qualification",
      "status": "completed",
      "document_url": null,
      "updated_at": "2024-01-15T12:00:00Z"
    },
  ];

  // Updated document filtering
  const draft = documents.filter(doc => doc.status === "draft");
  const pendingSiteReview = documents.filter(doc => doc.status === "pending_site_review");
  const pendingTrialReview = documents.filter(doc => doc.status === "pending_trial_review");
  const siteSigned = documents.filter(doc => doc.status === "site_signed");
  const trialSigned = documents.filter(doc => doc.status === "trial_signed");
  const completed = documents.filter(doc => doc.status === "completed");

  // Update getStatusBadge function
  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-[#ebf7f5] text-green-800">Completed</Badge>;
      case "pending_site_review":
        return <Badge className="bg-[#fcf7f8] text-[#6E59A5]">Pending Site Review</Badge>;
      case "pending_trial_review":
        return <Badge className="bg-[#fcf7fb] text-blue-800">Pending Trial Review</Badge>;
      case "draft":
        return <Badge className="bg-[#faf7fc] text-gray-800">Draft</Badge>;
      case "site_signed":
        return <Badge className="bg-[#ebf0f7] text-indigo-800">Site Signed</Badge>;
      case "trial_signed":
        return <Badge className="bg-[#ebf6f7] text-cyan-800">Trial Signed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format document type for display
  const formatDocumentType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle document click
  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  // Handle document actions
  const handleDownload = () => {
    if (selectedDocument?.document_url) {
      // In a real app, this would actually download the file
      console.log("Downloading document:", selectedDocument.document_url);
      window.open(selectedDocument.document_url, "_blank");
    }
    setIsDialogOpen(false);
  };

  const handleSign = () => {
    // Show confirm dialog
    setIsConfirmOpen(true);
  };

  const confirmSign = () => {
    console.log("Signing document:", selectedDocument?.id);
    setIsConfirmOpen(false);
    setIsDialogOpen(false);
    // In a real app, this would update the document status via API call
  };

  const handleUpload = () => {
    setIsDialogOpen(false);
    setIsUploadOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploading document for:", selectedDocument?.id);
    setIsUploadOpen(false);
    // In a real app, this would upload the file via API call
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center gap-2">
        <Link to="/site/trials" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Trials
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-black mb-6">Document Review</h1>
      <p className="text-muted-foreground mb-8">
        Review and manage documents for trial ID: {trialId}
      </p>
      
      <div className="space-y-8">
        {/* Draft Documents Section */}
        {draft.length > 0 && (
          <Card className="border border-gray-100 bg-[#faf7fc]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#6E59A5]" />
                Draft ({draft.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents need to be completed or uploaded.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {draft.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-gray-50/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleUpload();
                          }}
                          className="text-gray-600 border-gray-200 hover:bg-gray-50"
                        >
                          <FileUp className="h-4 w-4 mr-1" /> Upload
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Pending Site Review Section */}
        {pendingSiteReview.length > 0 && (
          <Card className="border border-gray-100 bg-[#fcf7f8]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#6E59A5]" />
                Pending Site Review ({pendingSiteReview.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents require your review and signature.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSiteReview.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-[#E5DEFF]/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleSign();
                          }}
                          className="text-[#6E59A5] border-[#E5DEFF] hover:bg-[#E5DEFF]/50"
                        >
                          <Pen className="h-4 w-4 mr-1" /> Sign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Pending Trial Review Section */}
        {pendingTrialReview.length > 0 && (
          <Card className="border border-gray-100 bg-[#fcf7fb]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#6E59A5]" />
                Pending Trial Review ({pendingTrialReview.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents have been submitted and are waiting for the sponsor to review.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingTrialReview.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-blue-50/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleDownload();
                          }}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Site Signed Section */}
        {siteSigned.length > 0 && (
          <Card className="border border-gray-100 bg-[#ebf0f7]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#6E59A5]" />
                Site Signed ({siteSigned.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents have been signed by the site.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteSigned.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-indigo-50/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleDownload();
                          }}
                          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Trial Signed Section */}
        {trialSigned.length > 0 && (
          <Card className="border border-gray-100 bg-[#ebf6f7]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#6E59A5]" />
                Trial Signed ({trialSigned.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents have been signed by the trial sponsor.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trialSigned.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-cyan-50/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleDownload();
                          }}
                          className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Completed Section */}
        {completed.length > 0 && (
          <Card className="border border-gray-100 bg-[#ebf7f5]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#6E59A5]" />
                Completed Documents ({completed.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                These documents have been fully processed and signed by all parties.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completed.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="cursor-pointer hover:bg-green-50/50"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                      <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            handleDownload();
                          }}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Document Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedDocument && formatDocumentType(selectedDocument.document_type)}
            </DialogTitle>
            <DialogDescription>
              {selectedDocument ? getStatusBadge(selectedDocument.status) : null}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Document ID</p>
                  <p className="font-medium">{selectedDocument?.id?.substring(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {selectedDocument?.updated_at && format(new Date(selectedDocument.updated_at), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">
                  {selectedDocument?.status.replace(/_/g, ' ')}
                </p>
              </div>
              
              {selectedDocument?.document_url && (
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
            {selectedDocument?.status === "pending_site_review" && (
              <Button onClick={handleSign} className="w-full sm:w-auto bg-[#6E59A5] hover:bg-[#8B5CF6]">
                <Pen className="h-4 w-4 mr-2" /> Sign Document
              </Button>
            )}
            
            {selectedDocument?.status === "draft" && (
              <Button onClick={handleUpload} className="w-full sm:w-auto bg-[#6E59A5] hover:bg-[#8B5CF6]">
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            )}
            
            {selectedDocument?.document_url && (
              <Button variant="outline" onClick={handleDownload} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Sign Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
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
              onClick={confirmSign}
              className="bg-[#6E59A5] hover:bg-[#8B5CF6]"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Upload Document Sheet */}
      <Sheet open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Upload Document</SheetTitle>
            <SheetDescription>
              Upload a new version of {selectedDocument && formatDocumentType(selectedDocument.document_type)}
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleUploadSubmit} className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/25 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag & drop your file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOCX, XLS (max 10MB)
                </p>
              </div>
              <Input 
                id="file" 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx,.xls,.xlsx"
              />
            </div>
