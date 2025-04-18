import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Map, List, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

const SiteCard = ({ site }: { site: typeof mockSites[0] }) => {
  const [isInviting, setIsInviting] = useState(false);

  const handleInviteSite = () => {
    setIsInviting(true);
    // TODO: Implement actual site invitation logic
    setTimeout(() => {
      setIsInviting(false);
      // You might want to show a toast or update UI to indicate invitation sent
    }, 2000);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{site.name}</CardTitle>
          <Badge 
            variant={site.compatibilityScore === 100 ? "default" : site.compatibilityScore >= 70 ? "outline" : "destructive"}
          >
            {site.compatibilityScore}% Compatible
          </Badge>
        </div>
        <CardDescription>
          Eligible Patients: {site.eligiblePatients}/{site.totalPatients} ({((site.eligiblePatients/site.totalPatients)*100).toFixed(1)}%)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Compatibility</span>
            <span className="text-sm font-medium">{site.compatibilityScore}%</span>
          </div>
          <Progress value={site.compatibilityScore} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Compatible Features</h4>
            <ul className="space-y-1">
              {site.features.compatible.map(feature => (
                <li key={feature} className="text-sm flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {feature.replace(/_/g, ' ')}
                </li>
              ))}
            </ul>
          </div>
          
          {site.features.incompatible.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Incompatible Features</h4>
              <ul className="space-y-1">
                {site.features.incompatible.map(feature => (
                  <li key={feature} className="text-sm flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    {feature.replace(/_/g, ' ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Top Rejection Reasons</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {site.rejectionReasons.slice(0, 4).map(reason => (
              <div key={reason.reason} className="text-sm">
                <span className="font-medium">{reason.reason.replace(/_/g, ' ')}: </span>
                <span>{reason.count} patients ({reason.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <Button 
            variant="outline" 
            className="w-full mr-2"
          >
            Send Invitation
          </Button>
          <Button 
            onClick={handleInviteSite} 
            disabled={isInviting}
            className="w-full"
          >
            {isInviting ? "Inviting..." : "Invite Site"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ReadinessPopover = ({ site }: { site: typeof mockSites[0] }) => {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="font-semibold text-base">This site maintains constant readiness</h3>
        <p className="text-sm text-muted-foreground">Average startup time: 2 days</p>
      </div>
      
      <div>
        <h4 className="font-medium text-sm mb-2">Readiness Checklist</h4>
        <ul className="space-y-1">
          <li className="text-sm flex items-center">
            <CheckCircle className={`h-4 w-4 ${site.readiness.dataPrivacyPolicy ? 'text-green-500' : 'text-red-500'} mr-2`} />
            Data Privacy Policy
          </li>
          <li className="text-sm flex items-center">
            <CheckCircle className={`h-4 w-4 ${site.readiness.sourceAgreement ? 'text-green-500' : 'text-red-500'} mr-2`} />
            Source Agreement
          </li>
          <li className="text-sm flex items-center">
            {site.readiness.sopsStorageMonitoring ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-amber-500 mr-2" />
            )}
            SOPs Storage Monitoring
          </li>
          <li className="text-sm flex items-center">
            <CheckCircle className={`h-4 w-4 ${site.readiness.eRegulatoryBinders ? 'text-green-500' : 'text-red-500'} mr-2`} />
            eRegulatory Binders
          </li>
          <li className="text-sm flex items-center">
            {site.readiness.sourceTemplates ? (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
            )}
            Source Templates
          </li>
          <li className="text-sm flex items-center">
            <CheckCircle className={`h-4 w-4 ${site.readiness.iataCertification ? 'text-green-500' : 'text-red-500'} mr-2`} />
            IATA Certification
          </li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-sm mb-2">Staff Readiness</h4>
        <p className="text-sm">Total Staff: {site.staff.total}</p>
        <p className="text-sm">Ready Staff: {site.staff.ready}/{site.staff.total} ({site.staff.readyPercentage}%)</p>
        <p className="text-sm">Checklist: CV, GCP, Medical License, Delegation of Authority</p>
        
        <h5 className="font-medium text-sm mt-2 mb-1">Experience Summary:</h5>
        <ul className="text-sm">
          {Object.entries(site.staff.averageExperience).map(([role, years]) => (
            <li key={role}>{role}: {years} yrs</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium text-sm mb-2">Patient Pool Summary</h4>
        <p className="text-sm">Eligible: {site.eligiblePatients}/{site.totalPatients} ({((site.eligiblePatients/site.totalPatients)*100).toFixed(1)}%)</p>
        
        <h5 className="font-medium text-sm mt-2 mb-1">Rejection Reasons:</h5>
        <ul className="space-y-1">
          {site.rejectionReasons.map(reason => (
            <li key={reason.reason} className="text-sm">
              {reason.reason.replace(/_/g, ' ')}: {reason.count} ({reason.percentage}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                25
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <ReadinessPopover site={mockSites[1]} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="absolute bottom-1/3 right-1/3 bg-white p-2 rounded-full shadow-md">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                15
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <ReadinessPopover site={mockSites[0]} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="absolute top-1/2 right-1/4 bg-white p-2 rounded-full shadow-md">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                16
              </div>
            </TooltipTrigger>
            <TooltipContent className="w-80">
              <ReadinessPopover site={mockSites[2]} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const SponsorFindSites: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedTrial, setSelectedTrial] = useState<string>("Phase 2 Study in Advanced Solid Tumors");

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
              <SelectItem value="Phase 2 Study in Advanced Solid Tumors">Phase 2 Study in Advanced Solid Tumors</SelectItem>
              <SelectItem value="Phase 3 Study in Breast Cancer">Phase 3 Study in Breast Cancer</SelectItem>
              <SelectItem value="Phase 1 Study in Lung Cancer">Phase 1 Study in Lung Cancer</SelectItem>
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
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
        <div className="flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-500" />
          <span className="text-sm">Found {mockSites.length} compatible sites with a total of {mockSites.reduce((sum, site) => sum + site.eligiblePatients, 0)} eligible patients.</span>
        </div>
        <Button variant="outline" size="sm">
          Export Results
        </Button>
      </div>
    </div>
  );
};

export default SponsorFindSites;
