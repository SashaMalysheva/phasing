import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, FileText, Users, Clipboard, Thermometer, Lock, ShieldCheck } from "lucide-react";
import SiteReadinessCard from "@/components/site/SiteReadinessCard";

const readinessCategories = [
  {
    id: "documents",
    title: "Document Readiness",
    progress: 75,
    description: "Status of required documentation",
    items: [
      { id: "data_privacy_policy", name: "Data Privacy Policy", status: "complete" },
      { id: "source_agreement", name: "Source Agreement", status: "complete" },
      { id: "sops_storage", name: "SOPs Storage & Monitoring", status: "warning" },
      { id: "eregulatory_binders", name: "eRegulatory Binders", status: "complete" },
      { id: "source_templates", name: "Source Templates", status: "incomplete" },
      { id: "iata_certification", name: "IATA Certification", status: "complete" }
    ]
  },
  {
    id: "facilities",
    title: "Facilities Readiness",
    progress: 90,
    description: "Status of required facilities and equipment",
    items: [
      { id: "procedure_room", name: "Procedure Room", status: "complete" },
      { id: "storage_room", name: "Storage Room", status: "complete" },
      { id: "secure_drug_cabinet", name: "Secure Drug Cabinet", status: "complete" },
      { id: "temperature_controlled", name: "Temperature Controlled Room", status: "complete" },
      { id: "archive_room", name: "Archive Room", status: "complete" },
      { id: "patient_waiting", name: "Patient Waiting Area", status: "complete" },
      { id: "sample_prep", name: "Sample Preparation Area", status: "complete" },
      { id: "emergency_equipment", name: "Emergency Equipment Area", status: "incomplete" },
      { id: "monitoring_desk", name: "Dedicated Monitoring Desk", status: "warning" }
    ]
  },
  {
    id: "equipment",
    title: "Equipment Readiness",
    progress: 85,
    description: "Status of required equipment for trials",
    items: [
      { id: "centrifuge", name: "Centrifuge", status: "complete" },
      { id: "ecg_machine", name: "ECG Machine", status: "complete" },
      { id: "fridge", name: "Fridge (2-8°C)", status: "complete" },
      { id: "freezer", name: "Freezer (-80°C)", status: "incomplete" },
      { id: "vitals_monitor", name: "Vitals Monitor", status: "complete" },
      { id: "infusion_pump", name: "Infusion Pump", status: "complete" },
      { id: "balance_scale", name: "Balance Scale", status: "complete" },
      { id: "spirometer", name: "Spirometer", status: "complete" },
      { id: "temp_logger", name: "Temperature Logger", status: "complete" },
      { id: "barcode_scanner", name: "Barcode Scanner", status: "complete" }
    ]
  },
  {
    id: "training",
    title: "Training Readiness",
    progress: 60,
    description: "Status of staff training and certifications",
    items: [
      { id: "gcp_training", name: "GCP Training", status: "warning" },
      { id: "protocol_training", name: "Protocol Training", status: "complete" },
      { id: "safety_reporting", name: "Safety Reporting", status: "complete" },
      { id: "informed_consent", name: "Informed Consent Process", status: "complete" },
      { id: "source_documentation", name: "Source Documentation", status: "warning" },
      { id: "delegation_training", name: "Delegation of Authority", status: "incomplete" },
      { id: "edc_training", name: "EDC System Training", status: "incomplete" }
    ]
  }
];

const CategoryIcon = ({ id }: { id: string }) => {
  switch (id) {
    case "documents":
      return <FileText className="h-5 w-5" />;
    case "facilities":
      return <Thermometer className="h-5 w-5" />;
    case "equipment":
      return <Clipboard className="h-5 w-5" />;
    case "training":
      return <Users className="h-5 w-5" />;
    default:
      return <ShieldCheck className="h-5 w-5" />;
  }
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />;
    case "incomplete":
      return <XCircle className="h-4 w-4 text-[#DC2626]" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />;
    default:
      return null;
  }
};

const SiteReadiness: React.FC = () => {
  const overallScore = Math.round(
    readinessCategories.reduce((sum, category) => sum + category.progress, 0) / 
    readinessCategories.length
  );
  
  const statusCounts = readinessCategories.flatMap(category => category.items).reduce(
    (counts, item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1F2C] tracking-tight mb-1">Site Readiness Details</h1>
        <p className="text-[#8E9196] text-sm">
          Track your site's readiness status for clinical trial participation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#8E9196]">Overall Readiness</h3>
              <div className="text-3xl font-semibold text-[#1A1F2C]">{overallScore}%</div>
              <Progress value={overallScore} className="h-2 bg-[#F1F0FB]" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-8 w-8 text-[#16A34A]" />
              <div>
                <h3 className="text-sm font-medium text-[#8E9196]">Complete Items</h3>
                <div className="text-3xl font-semibold text-[#1A1F2C]">{statusCounts.complete || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-[#F59E0B]" />
              <div>
                <h3 className="text-sm font-medium text-[#8E9196]">Warning Items</h3>
                <div className="text-3xl font-semibold text-[#1A1F2C]">{statusCounts.warning || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <XCircle className="h-8 w-8 text-[#DC2626]" />
              <div>
                <h3 className="text-sm font-medium text-[#8E9196]">Incomplete Items</h3>
                <div className="text-3xl font-semibold text-[#1A1F2C]">{statusCounts.incomplete || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {readinessCategories.map(category => (
          <Card key={category.id} className="bg-white">
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="mr-2 bg-[#F1F0FB] p-2 rounded-full">
                    <CategoryIcon id={category.id} />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-[#1A1F2C]">{category.title}</CardTitle>
                    <p className="text-xs text-[#8E9196]">{category.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#8E9196]">Status of required items</div>
                  <Badge 
                    variant={category.progress >= 85 ? "default" : category.progress >= 60 ? "outline" : "destructive"}
                    className="text-xs px-2 py-0.5 rounded-full"
                  >
                    {category.progress}% Complete
                  </Badge>
                </div>
                <Progress value={category.progress} className="h-1.5 bg-[#F1F0FB]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {category.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-[#F1F0FB] text-sm">
                    <div className="flex items-center">
                      <StatusIcon status={item.status} />
                      <span className="ml-2 text-[#1A1F2C]">{item.name}</span>
                    </div>
                    <Badge
                      variant={
                        item.status === "complete" ? "default" : 
                        item.status === "warning" ? "outline" :
                        "destructive"
                      }
                      className="text-xs px-2 py-0.5 rounded-full"
                    >
                      {item.status === "complete" ? "Complete" : 
                       item.status === "warning" ? "Attention Needed" : 
                       "Incomplete"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SiteReadiness;
