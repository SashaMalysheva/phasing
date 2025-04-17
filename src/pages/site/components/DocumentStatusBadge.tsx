
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface DocumentStatusBadgeProps {
  status: string;
}

export const DocumentStatusBadge: React.FC<DocumentStatusBadgeProps> = ({ status }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "pending_site_review":
        return <Badge className="bg-[#E5DEFF] text-[#6E59A5] hover:bg-[#E5DEFF]/80">Pending Site Review</Badge>;
      case "pending_trial_review":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending Trial Review</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return getStatusBadge(status);
};
