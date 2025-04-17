
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Filter, Plus, RefreshCcw, ArrowLeft, PhoneCall, 
  CheckCircle, X, Clock, Edit, Users 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EnrollmentBoard = () => {
  const { trialId } = useParams();
  const [selectedTrial, setSelectedTrial] = useState("Type 2 Diabetes E1224 (Fosravuconazole)");
  const [selectedSite, setSelectedSite] = useState("John Hopkins Clinic");

  const stats = [
    { label: "Enrolled Participants", value: "45", change: "+5" },
    { label: "Enrollment Target", value: "100" },
    { label: "Enrollment Progress", value: "45%" },
    { label: "Identified Leads", value: "150", change: "+12" },
    { label: "Ongoing Outreach", value: "95", change: "-3" },
    { label: "Prescreened", value: "72", change: "+2" }
  ];

  const candidateData = {
    notEligible: [
      { name: "Patricia Jones", source: "Previous Patient" },
      { name: "Robert Davis", source: "EHR" },
      { name: "Susan Thomas", source: "EHR" },
      { name: "Richard White", source: "Social Media" }
    ],
    identifiedLead: [
      { 
        name: "James Smith", 
        source: "Community Outreach",
        status: { failed: true, success: true }
      },
      { 
        name: "Mary Williams", 
        source: "Doctor Referral",
        status: { failed: true, success: true }
      },
      { 
        name: "John Brown", 
        source: "Social Media",
        status: { failed: true, success: true }
      }
    ],
    qualified: [],
    ongoingOutreach: [
      { 
        name: "Jennifer Davis", 
        source: "EHR",
        prescreened: true,
        lastAttempt: "Mar 11, 7:50 AM",
        nextCall: "Mar 14, 7:50 AM",
        previousCalls: 4,
        visited: false
      },
      {
        name: "Linda Taylor",
        source: "EHR",
        prescreened: true,
        lastAttempt: "Mar 11, 7:50 AM",
        nextCall: "Mar 14, 7:50 AM",
        previousCalls: 2,
        visited: false
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/site/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs mb-4">
          Active Trial
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Type 2 Diabetes E1224 (Fosravuconazole) Study
          <div className="float-right space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC]">
              <Users className="h-4 w-4 mr-1" /> Manage Participants
            </Button>
          </div>
        </h1>
        <p className="text-gray-500 text-sm">
          Phase 3 Study of Tirzepatide Monotherapy Compared to Dulaglutide 0.75 mg in Patients with Type 2 Diabetes Mellitus.
        </p>

        <div className="mt-6 flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Clinical Trial</label>
            <div className="w-64">
              <Select value={selectedTrial} onValueChange={setSelectedTrial}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Clinical Trial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type 2 Diabetes E1224 (Fosravuconazole)">Type 2 Diabetes E1224 (Fosravuconazole)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
            <div className="w-64">
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Hopkins Clinic">John Hopkins Clinic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm flex items-center">
            <span className="mr-2">•</span>
            Active Trial & Site Selected
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              <span className="ml-1">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 bg-white shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold">{stat.value}</div>
              {stat.change && (
                <span className={`ml-2 text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="enrollment" className="w-full">
        <TabsList className="mb-6 bg-transparent border-b w-full justify-start rounded-none p-0 h-auto">
          <TabsTrigger 
            value="enrollment" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-2"
          >
            Enrollment Board
          </TabsTrigger>
          <TabsTrigger 
            value="metrics" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-2"
          >
            Metrics & Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-2"
          >
            Voice Call Logs
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none px-4 py-2"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" className="text-gray-600">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { title: 'Not Eligible', data: candidateData.notEligible, count: '4 candidates' },
              { title: 'Identified Lead', data: candidateData.identifiedLead, count: '3 candidates', desc: 'Potential candidates identified from various sources' },
              { title: 'Qualified', data: candidateData.qualified, count: '0 candidates', desc: 'Candidates approved for further contact' },
              { title: 'Ongoing Outreach', data: candidateData.ongoingOutreach, count: '2 candidates', desc: 'Active contact with voice agent' }
            ].map((column) => (
              <div key={column.title} className="bg-white rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{column.title}</h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">{column.count}</p>
                  {column.desc && <p className="text-sm text-gray-400 italic mt-1">{column.desc}</p>}
                </div>

                <div className="p-4 space-y-3">
                  {column.data.map((candidate, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500 mt-1">Source: {candidate.source}</div>

                      {'status' in candidate && (
                        <div className="flex gap-2 mt-2">
                          {candidate.status.failed && (
                            <div className="p-1.5 bg-red-100 rounded-full">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          )}
                          {candidate.status.success && (
                            <div className="p-1.5 bg-green-100 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {'prescreened' in candidate && (
                        <>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" /> Prescreened
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              <X className="h-3 w-3 mr-1" /> No Visit
                            </span>
                          </div>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="text-red-600 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last attempt: {candidate.lastAttempt}
                            </div>
                            <div className="text-blue-600 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Next call: {candidate.nextCall}
                            </div>
                            <div className="text-gray-500">
                              {candidate.previousCalls} previous calls
                            </div>
                          </div>
                          <Button className="w-full mt-3" variant="secondary">
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Call Patient
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {column.data.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No candidates in this stage
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrollmentBoard;
