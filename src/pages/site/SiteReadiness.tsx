import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, FileText, Users, Clipboard, Thermometer, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />;
    case "incomplete":
      return <XCircle className="h-5 w-5 text-[#DC2626]" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />;
    default:
      return null;
  }
};

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

  const totalItems = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  const completedItems = statusCounts.complete || 0;
  const pendingItems = totalItems - completedItems;

  return (
    <div className="space-y-8 p-6">
      {/* Compact Site Readiness Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#1A1F2C]">Site Readiness Status</h1>
      </div>

      {/* Compact Overall Readiness Section */}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#8E9196]">Ready Items</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#1A1F2C]">{completedItems}</span>
              <span className="text-xs text-[#8E9196]">of {totalItems}</span>
            </div>
          </div>
          <div className="text-lg font-bold text-[#16A34A]">{overallScore}%</div>
        </div>
        <Progress 
          value={overallScore} 
          className="h-2 bg-[#E6E6E6]" 
        />
      </div>

      {/* Readiness Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {readinessCategories.map(category => (
          <Card key={category.id} className="bg-white">
            <CardHeader className="pb-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#F1F0FB] p-2 rounded-lg">
                    <CategoryIcon id={category.id} />
                  </div>
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base font-semibold text-[#1A1F2C]">{category.title}</CardTitle>
                    <p className="text-xs text-[#8E9196]">{category.description}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-[#8E9196]">Required Items</div>
                    <Badge 
                      variant="outline"
                      className="text-xs rounded-full bg-[#F1F0FB] text-[#6E59A5] hover:bg-[#F1F0FB] hover:text-[#6E59A5] border-0"
                    >
                      {category.progress}% Complete
                    </Badge>
                  </div>
                  <Progress 
                    value={category.progress} 
                    className="h-2 bg-[#E6E6E6]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-[#F1F0FB] text-sm">
                    <span className="text-[#1A1F2C]">{item.name}</span>
                    <StatusIcon status={item.status} />
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
