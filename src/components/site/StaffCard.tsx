
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, User } from "lucide-react";
import StaffInfoDialog from "./StaffInfoDialog";

interface StaffCardProps {
  name: string;
  role: string;
  issues: string[] | null;
  experience?: number;
  documents?: {
    cv_uploaded: boolean;
    gcp_certification: boolean;
    medical_license: boolean;
    delegation_of_authority: boolean;
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

  return (
    <>
      <Card 
        className={`${issues ? "border-amber-200 bg-amber-50/50" : ""} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>
            
            {!issues ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="h-3 w-3 mr-1" />
                Ready
              </Badge>
            ) : (
              <Badge variant="outline" className="text-amber-600 border-amber-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Needs Update
              </Badge>
            )}
          </div>
          
          {issues && issues.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {issues.map((item, i) => (
                  <Badge key={i} variant="outline" className="bg-white">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {!issues && experience && (
            <div className="text-sm">
              <div className="flex items-center text-muted-foreground">
                <span className="font-medium mr-2">Experience:</span> {experience} years
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
          issues,
          documents,
          experience,
        }}
      />
    </>
  );
};

export default StaffCard;
