
import { useState } from 'react';
import { Document } from '../types/document';

export const useDocumentManagement = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const handleDownload = () => {
    if (selectedDocument?.document_url) {
      console.log("Downloading document:", selectedDocument.document_url);
      window.open(selectedDocument.document_url, "_blank");
    }
    setIsDialogOpen(false);
  };

  const handleSign = () => {
    setIsConfirmOpen(true);
  };

  const confirmSign = () => {
    console.log("Signing document:", selectedDocument?.id);
    setIsConfirmOpen(false);
    setIsDialogOpen(false);
  };

  const handleUpload = () => {
    setIsDialogOpen(false);
    setIsUploadOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploading document for:", selectedDocument?.id);
    setIsUploadOpen(false);
  };

  return {
    selectedDocument,
    setSelectedDocument,
    isDialogOpen,
    setIsDialogOpen,
    isUploadOpen,
    setIsUploadOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    handleDocumentClick,
    handleDownload,
    handleSign,
    confirmSign,
    handleUpload,
    handleUploadSubmit
  };
};
