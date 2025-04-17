
import React from 'react';
import { format } from "date-fns";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Document } from '../types/document';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Pen, 
  Upload, 
  Eye, 
  Download 
} from "lucide-react";

interface DocumentTableProps {
  documents: Document[];
  title: string;
  icon: React.ElementType;
  onDocumentClick: (doc: Document) => void;
  onActionClick: (doc: Document) => void;
  actionIcon: React.ElementType;
  actionText: string;
  backgroundClass?: string;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  title,
  icon: Icon,
  onDocumentClick,
  onActionClick,
  actionIcon: ActionIcon,
  actionText,
  backgroundClass = "bg-[#f7f7fc]/30"
}) => {
  const formatDocumentType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className={`border border-gray-100 ${backgroundClass}`}>
      <div className="p-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-[#6E59A5]" />
        <h2 className="text-xl font-semibold">{title} ({documents.length})</h2>
      </div>
      <div className="px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow 
                key={doc.id} 
                className="cursor-pointer hover:bg-[#E5DEFF]/50"
                onClick={() => onDocumentClick(doc)}
              >
                <TableCell className="font-medium">{formatDocumentType(doc.document_type)}</TableCell>
                <TableCell>{format(new Date(doc.updated_at), "MMM d, yyyy")}</TableCell>
                <TableCell><DocumentStatusBadge status={doc.status} /></TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onActionClick(doc);
                    }}
                    className="text-[#6E59A5] border-[#E5DEFF] hover:bg-[#E5DEFF]/50"
                  >
                    <ActionIcon className="h-4 w-4 mr-1" /> {actionText}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
