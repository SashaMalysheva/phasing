import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { getTrialDetails } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface EnrollmentBoardProps {
  // Define any props here
}

const EnrollmentBoard = () => {
  const { trialId } = useParams();
  const [trialDetails, setTrialDetails] = useState(null);

  // Fetch trial details
  const { data: trialData, isLoading } = useQuery({
    queryKey: ['trialDetails', trialId],
    queryFn: () => getTrialDetails(trialId || ''),
    enabled: !!trialId,
  });

  useEffect(() => {
    if (trialData) {
      setTrialDetails(trialData);
    }
  }, [trialData]);

  const stats = [
    { label: "Identified Leads", value: trialDetails?.metrics?.identified_leads || 0 },
    { label: "Qualified", value: trialDetails?.metrics?.qualified || 0 },
    { label: "Ongoing Outreach", value: trialDetails?.metrics?.ongoing_outreach || 0 },
    { label: "Enrolled", value: trialDetails?.metrics?.enrolled || 0 },
    { label: "Target", value: trialDetails?.target || 0 },
  ];

  return (
    <div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : (
        <div className="text-2xl font-bold">
          Enrollment Board for Trial: {trialDetails?.name}
        </div>
      )}
    </div>
  );
};

export default EnrollmentBoard;
