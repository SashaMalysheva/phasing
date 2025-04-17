
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ReadinessItem {
  [key: string]: boolean | string;
}

interface SiteReadinessCardProps {
  readiness: ReadinessItem;
}

const readinessLabels: { [key: string]: string } = {
  data_privacy_policy: "Data Privacy Policy",
  source_agreement: "Source Agreement",
  sops_storage_monitoring: "SOPs for Storage & Monitoring",
  eregulatory_binders: "eRegulatory Binders",
  source_templates: "Source Templates",
  iata_certification: "IATA Certification"
};

const SiteReadinessCard: React.FC<SiteReadinessCardProps> = ({ readiness }) => {
  const getStatusIcon = (status: boolean | string) => {
    if (status === true) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (status === "warning") {
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getReadinessPercentage = () => {
    const total = Object.keys(readiness).length;
    const ready = Object.values(readiness).filter(item => item === true).length;
    return Math.round((ready / total) * 100);
  };

  return (
    <Card className="bg-[#F1F0FB]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-[#6E59A5]">
          <span>Site Readiness Status</span>
          <span className="text-2xl font-bold">{getReadinessPercentage()}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground mb-3">
            This site maintains constant readiness. Average startup time: 2 days.
          </p>
          
          {Object.entries(readiness).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-2 rounded hover:bg-muted">
              <span className="text-sm">{readinessLabels[key] || key}</span>
              {getStatusIcon(value)}
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium">Action Items:</p>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(readiness)
                .filter(([_, value]) => value !== true)
                .map(([key]) => (
                  <li key={`action-${key}`} className="text-muted-foreground">
                    • Update {readinessLabels[key] || key} documentation
                  </li>
                ))
              }
            </ul>
          </div>
          
          <Link 
            to="/site/readiness" 
            className="block mt-4 text-sm text-[#9b87f5] hover:text-[#8B5CF6] text-right"
          >
            View Full Readiness Report →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteReadinessCard;
