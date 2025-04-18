import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building, Map, List, Users, CheckCircle } from "lucide-react";
import { SiteDetailsDialog } from "@/components/sponsor/SiteDetailsDialog";

const mockSites = [
  {
    id: 1,
    name: "Site 0",
    location: { lat: 40.7128, lng: -74.006 },
    compatibilityScore: 100,
    eligiblePatients: 15,
    totalPatients: 300,
    features: {
      compatible: ["procedures", "equipment", "facilities", "lab_certifications", "languages"],
      incompatible: []
    },
    rejectionReasons: [
      { reason: "diagnosis_date", count: 235, percentage: 78.3 },
      { reason: "performance_status", count: 68, percentage: 22.7 },
      { reason: "ethnicity", count: 39, percentage: 13.0 },
      { reason: "comorbidities", count: 103, percentage: 34.3 },
      { reason: "lab_values", count: 38, percentage: 12.7 },
      { reason: "age", count: 51, percentage: 17.0 }
    ],
    readiness: {
      dataPrivacyPolicy: true,
      sourceAgreement: true,
      sopsStorageMonitoring: false,
      eRegulatoryBinders: true,
      sourceTemplates: false,
      iataCertification: true
    },
    staff: {
      total: 16,
      ready: 9,
      readyPercentage: 56.3,
      averageExperience: {
        PI: 12,
        "Sub-I": 16.7,
        CRC: 10,
        Pharmacist: 4,
        Lab: 16.3
      }
    }
  },
  {
    id: 2,
    name: "Site 5",
    location: { lat: 34.0522, lng: -118.2437 },
    compatibilityScore: 100,
    eligiblePatients: 25,
    totalPatients: 300,
    features: {
      compatible: ["procedures", "equipment", "facilities", "lab_certifications", "languages"],
      incompatible: []
    },
    rejectionReasons: [
      { reason: "age", count: 59, percentage: 19.7 },
      { reason: "diagnosis_date", count: 234, percentage: 78.0 },
      { reason: "performance_status", count: 58, percentage: 19.3 },
      { reason: "lab_values", count: 34, percentage: 11.3 },
      { reason: "comorbidities", count: 99, percentage: 33.0 },
      { reason: "ethnicity", count: 30, percentage: 10.0 }
    ],
    readiness: {
      dataPrivacyPolicy: true,
      sourceAgreement: true,
      sopsStorageMonitoring: true,
      eRegulatoryBinders: true,
      sourceTemplates: true,
      iataCertification: true
    },
    staff: {
      total: 18,
      ready: 15,
      readyPercentage: 83.3,
      averageExperience: {
        PI: 15,
        "Sub-I": 12,
        CRC: 8,
        Pharmacist: 6,
        Lab: 10
      }
    }
  },
  {
    id: 3,
    name: "Site 1",
    location: { lat: 41.8781, lng: -87.6298 },
    compatibilityScore: 67,
    eligiblePatients: 16,
    totalPatients: 300,
    features: {
      compatible: ["procedures", "lab_certifications", "languages", "payment_format"],
      incompatible: ["equipment", "facilities", "budget_per_patient"]
    },
    rejectionReasons: [
      { reason: "lab_values", count: 38, percentage: 12.7 },
      { reason: "ethnicity", count: 39, percentage: 13.0 },
      { reason: "diagnosis_date", count: 241, percentage: 80.3 },
      { reason: "comorbidities", count: 105, percentage: 35.0 },
      { reason: "age", count: 64, percentage: 21.3 },
      { reason: "performance_status", count: 80, percentage: 26.7 }
    ],
    readiness: {
      dataPrivacyPolicy: true,
      sourceAgreement: false,
      sopsStorageMonitoring: false,
      eRegulatoryBinders: true,
      sourceTemplates: false,
      iataCertification: false
    },
    staff: {
      total: 14,
      ready: 6,
      readyPercentage: 42.9,
      averageExperience: {
        PI: 8,
        "Sub-I": 5,
        CRC: 3,
        Pharmacist: 4,
        Lab: 7
      }
    }
  }
];

const MapView = ({ sites }: { sites: typeof mockSites }) => {
  return (
    <div className="bg-gray-100 relative min-h-[500px] rounded-lg border flex items-center justify-center">
      <div className="text-center p-4">
        <Map className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Interactive Map View</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          This would display an interactive map with site markers showing patient counts and compatibility scores.
        </p>
      </div>
      
      {/* Site Markers - These would be positioned absolutely in a real implementation */}
      <div className="absolute top-1/4 left-1/4 bg-white p-2 rounded-full shadow-md">
        
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                25
              </div>
            
            
              
            
          
        
      </div>
      
      <div className="absolute bottom-1/3 right-1/3 bg-white p-2 rounded-full shadow-md">
        
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                15
              </div>
            
            
              
            
          
        
      </div>
      
      <div className="absolute top-1/2 right-1/4 bg-white p-2 rounded-full shadow-md">
        
              <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                16
              </div>
            
            
              
            
          
        
      </div>
    </div>
  );
};

const SiteCard = ({ site, onClick }: { site: typeof mockSites[0], onClick: () => void }) => {
  return (
    <Card 
      className="mb-4 hover:bg-accent/5 transition-colors cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-1">{site.name}</h3>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Ready Staff: {site.staff.ready}/{site.staff.total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Compatible Features: {site.features.compatible.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{site.eligiblePatients}/{site.totalPatients} eligible patients</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Compatibility</span>
                <span className="text-sm font-medium">{site.compatibilityScore}%</span>
              </div>
              <Progress value={site.compatibilityScore} className="h-2" />
            </div>
          </div>
          
          <Badge 
            variant={site.compatibilityScore === 100 ? "default" : site.compatibilityScore >= 70 ? "secondary" : "destructive"}
            className="ml-4 bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            {site.compatibilityScore}% Match
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const SponsorFindSites: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedTrial, setSelectedTrial] = useState<string>("Phase 2 Study in Advanced Solid Tumors");
  const [selectedSite, setSelectedSite] = useState<typeof mockSites[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSiteClick = (site: typeof mockSites[0]) => {
    setSelectedSite(site);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Matching Sites</h1>
        <p className="text-muted-foreground">
          Discover compatible sites for your clinical trials based on capability matching and patient eligibility.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="w-full md:w-1/2">
          <Select value={selectedTrial} onValueChange={setSelectedTrial}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Trial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phase 2 Study in Advanced Solid Tumors">
                Phase 2 Study in Advanced Solid Tumors
              </SelectItem>
              <SelectItem value="Phase 3 Study in Breast Cancer">
                Phase 3 Study in Breast Cancer
              </SelectItem>
              <SelectItem value="Phase 1 Study in Lung Cancer">
                Phase 1 Study in Lung Cancer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <MapView sites={mockSites} />
      ) : (
        <div className="space-y-4">
          {mockSites.map(site => (
            <SiteCard 
              key={site.id} 
              site={site} 
              onClick={() => handleSiteClick(site)}
            />
          ))}
        </div>
      )}

      <SiteDetailsDialog 
        site={selectedSite}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default SponsorFindSites;
