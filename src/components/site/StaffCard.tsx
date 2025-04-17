
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, User } from "lucide-react";
import StaffInfoDialog from "./StaffInfoDialog";

interface StaffCardProps {
  name: string;
  role: string;
  issues: string[] | null;
  experience?: number;
  documents?: {
    cv_uploaded?: boolean;
    gcp_certification?: boolean;
    medical_license?: boolean;
    delegation_of_authority?: boolean;
  };
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  issues,
  experience,
  documents,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const displayIssues = issues && issues.length > 0 ? issues : null;
  const hasIssues = !!displayIssues;

  return (
    <>
      <Card 
        className={`
          ${hasIssues 
            ? "border-[#E5DEFF] bg-[#F9F7FF]" 
            : "border-gray-200 bg-white"} 
          cursor-pointer hover:shadow-md transition-shadow
        `}
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-[#6E59A5]">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>
            
            {!hasIssues ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="h-3 w-3 mr-1" />
                Ready
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-[#F1F0FB] text-[#6E59A5] border-[#9B87F5]">
                <AlertCircle className="h-3 w-3 mr-1" />
                Needs Update
              </Badge>
            )}
          </div>
          
          {hasIssues && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 mt-2">
                {displayIssues.map((item, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="bg-white border-[#9B87F5] text-[#6E59A5] border-opacity-50"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {!hasIssues && experience !== undefined && (
            <div className="text-sm mt-2">
              <div className="flex items-center text-muted-foreground">
                <span className="font-medium mr-2 text-[#6E59A5]">Experience:</span> 
                <span className="text-[#6E59A5]">{experience} years</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <StaffInfoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        staffMember={{
          name,
          role,
          issues: displayIssues,
          documents,
          experience,
        }}
      />
    </>
  );
};

export default StaffCard;
