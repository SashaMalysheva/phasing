
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Users, CheckCircle2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrialWithSites } from "@/lib/api";

const TrialDetails = () => {
  const { trialId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['trialSites', trialId],
    queryFn: () => getTrialWithSites(trialId || ''),
    enabled: !!trialId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  const getCompatibilityVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trial Sites</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sites Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Compatibility</TableHead>
                  <TableHead>Eligible Patients</TableHead>
                  <TableHead>Readiness</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.sites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{site.name}</div>
                        <div className="text-sm text-muted-foreground">{site.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {site.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCompatibilityVariant(site.compatibility_score)}>
                        {site.compatibility_score}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {site.eligible_patient_count} / {site.total_patient_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {Object.entries({
                          "Data Privacy Policy": site.data_privacy_policy,
                          "Source Agreement": site.source_agreement,
                          "SOPs Storage": site.sops_storage_monitoring,
                          "eRegulatory Binders": site.eregulatory_binders,
                          "Source Templates": site.source_templates,
                          "IATA Certification": site.iata_certification,
                        }).map(([key, value], i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            {value === true ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : value === false ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-gray-200" />
                            )}
                            {key}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrialDetails;
