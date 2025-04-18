
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

interface ProtocolUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => void;
}

export const ProtocolUploadDialog: React.FC<ProtocolUploadDialogProps> = ({
  open,
  onOpenChange,
  onUpload,
}) => {
  const handleClick = () => {
    // Just close the dialog and trigger mock data filling
    onUpload();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Protocol PDF</DialogTitle>
          <DialogDescription>
            Upload your protocol PDF file to automatically extract trial information
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <Button variant="outline" onClick={handleClick}>
            <Upload className="mr-2 h-4 w-4" />
            Select PDF File
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            PDF files up to 10MB
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
