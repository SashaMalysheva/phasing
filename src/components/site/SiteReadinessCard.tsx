
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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

  const readyItems = Object.values(readiness).filter(item => item === true).length;
  const totalItems = Object.keys(readiness).length;

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[#6E59A5]">Site Readiness Status</span>
          <div className="text-right">
            <span className="text-lg font-bold text-[#6E59A5]">{getReadinessPercentage()}%</span>
          </div>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Ready Items</span>
          <span className="text-[#6E59A5]">{readyItems}/{totalItems}</span>
        </div>
        <Progress value={getReadinessPercentage()} className="h-2 bg-purple-100" />
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-medium text-[#6E59A5] mb-2">Readiness Status</h4>
          <div className="space-y-2">
            {Object.entries(readiness).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{readinessLabels[key] || key}</span>
                {getStatusIcon(value)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-[#6E59A5] mb-2">Action Items</h4>
          <div className="space-y-2">
            {Object.entries(readiness)
              .filter(([_, value]) => value !== true)
              .map(([key]) => (
                <div key={`action-${key}`} className="text-sm">
                  <div className="text-muted-foreground">
                    Missing: Update {readinessLabels[key] || key}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t flex justify-between items-center">
        <Link 
          to="/site/readiness" 
          className="flex items-center text-sm text-[#9b87f5] hover:text-[#8B5CF6]"
        >
          View Full Readiness Report <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

export default SiteReadinessCard;
