
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Clock } from "lucide-react";

interface TrialStatusBadgeProps {
  status: string;
}

const TrialStatusBadge: React.FC<TrialStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "enrollment":
      return (
        <Badge className="bg-[#E5DEFF] text-black hover:bg-[#E5DEFF] cursor-default">
          <Users className="h-3 w-3 mr-1" />
          Enrollment
        </Badge>
      );
    case "document_review":
      return (
        <Badge className="bg-[#F3EFFF] text-black hover:bg-[#F3EFFF] cursor-default">
          <FileText className="h-3 w-3 mr-1" />
          Document Review
        </Badge>
      );
    case "idle":
      return (
        <Badge variant="outline" className="text-gray-600 cursor-default">
          <Clock className="h-3 w-3 mr-1" />
          Idle
        </Badge>
      );
    default:
      return <Badge variant="outline" className="cursor-default">{status}</Badge>;
  }
};

export default TrialStatusBadge;
