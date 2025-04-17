
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const EnrollmentBoard = () => {
  const { trialId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#6E59A5] mb-6">Enrollment Board</h1>
      <Card>
        <CardHeader>
          <CardTitle>Trial ID: {trialId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Enrollment management interface will be implemented here
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentBoard;
