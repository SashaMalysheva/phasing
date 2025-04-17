
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
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Users className="h-3 w-3 mr-1" />
          Enrollment
        </Badge>
      );
    case "document_review":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <FileText className="h-3 w-3 mr-1" />
          Document Review
        </Badge>
      );
    case "idle":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Idle
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default TrialStatusBadge;
