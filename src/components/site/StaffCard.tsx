
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Edit, User } from "lucide-react";

interface StaffCardProps {
  name: string;
  role: string;
  isComplete: boolean;
  missingItems?: string[];
  experience?: number;
}

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  isComplete,
  missingItems = [],
  experience
}) => {
  return (
    <Card className={isComplete ? "" : "border-amber-200 bg-amber-50/50"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          
          {isComplete ? (
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
      </CardHeader>
      
      <CardContent className="pb-2">
        {isComplete ? (
          <div className="text-sm mt-2">
            <div className="flex items-center text-muted-foreground">
              <span className="font-medium mr-2">Experience:</span> {experience} years
            </div>
            <div className="flex mt-2">
              <Badge variant="secondary" className="mr-1 text-xs">CV</Badge>
              <Badge variant="secondary" className="mr-1 text-xs">GCP</Badge>
              <Badge variant="secondary" className="mr-1 text-xs">License</Badge>
              <Badge variant="secondary" className="text-xs">Delegation</Badge>
            </div>
          </div>
        ) : (
          <div className="space-y-2 mt-2">
            <div className="text-sm font-medium text-amber-700">Missing:</div>
            <div className="flex flex-wrap gap-1">
              {missingItems.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-white">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          <Edit className="h-3 w-3 mr-2" />
          {isComplete ? "Edit Details" : "Update Credentials"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaffCard;
