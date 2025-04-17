
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
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
    <Card className="bg-[#F1F0FB] h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[#6E59A5]">Site Readiness Status</span>
          <span className="text-xl font-bold text-[#6E59A5]">{getReadinessPercentage()}%</span>
        </div>
        <p className="text-sm text-muted-foreground">
          This site maintains constant readiness. Average startup time: 2 days.
        </p>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          {Object.entries(readiness).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-2 rounded hover:bg-muted">
              <span className="text-sm">{readinessLabels[key] || key}</span>
              {getStatusIcon(value)}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-2">Action Items:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {Object.entries(readiness)
              .filter(([_, value]) => value !== true)
              .map(([key]) => (
                <li key={`action-${key}`} className="flex items-center">
                  • Update {readinessLabels[key] || key} documentation
                </li>
              ))
            }
          </ul>
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <Link 
          to="/site/readiness" 
          className="flex items-center justify-end text-sm text-[#9b87f5] hover:text-[#8B5CF6]"
        >
          View Full Readiness Report <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

export default SiteReadinessCard;
