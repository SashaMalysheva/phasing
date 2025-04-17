
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Plus, RefreshCcw, ArrowLeft, PhoneCall, CheckCircle, X, Clock, Edit, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Enrolled Participants", value: "45" },
  { label: "Enrollment Target", value: "100" },
  { label: "Enrollment Progress", value: "45%" },
  { label: "Identified Leads", value: "150" },
  { label: "Ongoing Outreach", value: "95" },
  { label: "Prescreened", value: "72" }
];

const EnrollmentBoard = () => {
  const { trialId } = useParams();
  const [selectedTrial, setSelectedTrial] = useState("Type 2 Diabetes E1224 (Fosravuconazole)");
  const [selectedSite, setSelectedSite] = useState("John Hopkins Clinic");

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
        status: { 
          rejected: true, 
          approved: true 
        }
      },
      { 
        name: "Mary Williams", 
        source: "Doctor Referral",
        status: { 
          rejected: true, 
          approved: true 
        }
      },
      { 
        name: "John Brown", 
        source: "Social Media",
        status: { 
          rejected: true, 
          approved: true 
        }
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
        <div className="flex items-center gap-2 mb-4">
          <Link to="/site/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <Badge variant="secondary" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
            Active Trial
          </Badge>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center justify-between">
          <span>Type 2 Diabetes E1224 (Fosravuconazole) Study</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button size="sm" className="h-9 bg-[#0066FF] hover:bg-[#0052CC]">
              <Users className="h-4 w-4 mr-2" />
              Manage Participants
            </Button>
          </div>
        </h1>
        <p className="text-gray-500 text-sm">
          Phase 3 Study of Tirzepatide Monotherapy Compared to Dulaglutide 0.75 mg in Patients with Type 2 Diabetes Mellitus.
        </p>

        <div className="mt-6 flex gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Clinical Trial</label>
            <Select value={selectedTrial} onValueChange={setSelectedTrial}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Clinical Trial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Type 2 Diabetes E1224 (Fosravuconazole)">Type 2 Diabetes E1224 (Fosravuconazole)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Hopkins Clinic">John Hopkins Clinic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="ml-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="p-4 shadow-sm rounded-lg bg-white hover:shadow-md transition-shadow duration-300 border border-purple-100"
          >
            <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold">{stat.value}</div>
              {/* Removed conditional render with stat.change since it doesn't exist in the stats objects */}
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="enrollment">
        <TabsList className="border-b w-full justify-start space-x-8 bg-transparent rounded-none p-0">
          <TabsTrigger 
            value="enrollment" 
            className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#0066FF]"
          >
            Enrollment Board
          </TabsTrigger>
          <TabsTrigger 
            value="metrics" 
            className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#0066FF]"
          >
            Metrics & Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#0066FF]"
          >
            Voice Call Logs
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="px-0 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0066FF] bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-[#0066FF]"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="mt-6">
          <div className="grid grid-cols-4 gap-6">
            {[
              { 
                title: 'Not Eligible', 
                count: '4 candidates', 
                data: candidateData.notEligible,
                className: 'bg-gradient-to-b from-[#F5E6FF]/30 to-[#E6D1FF]/20 border-purple-100/20' 
              },
              { 
                title: 'Identified Lead', 
                count: '3 candidates', 
                data: candidateData.identifiedLead,
                className: 'bg-gradient-to-b from-[#E6D1FF]/30 to-[#D6BCFA]/20 border-purple-200/20' 
              },
              { 
                title: 'Qualified', 
                count: '0 candidates', 
                data: candidateData.qualified,
                className: 'bg-gradient-to-b from-[#D6BCFA]/30 to-[#C5A7F2]/20 border-purple-300/20' 
              },
              { 
                title: 'Ongoing Outreach', 
                count: '2 candidates', 
                data: candidateData.ongoingOutreach,
                className: 'bg-gradient-to-b from-[#C5A7F2]/30 to-[#B492E6]/20 border-purple-400/20' 
              }
            ].map((column) => (
              <div key={column.title} className={`rounded-lg border ${column.className}`}>
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{column.title}</h3>
                    <p className="text-sm text-gray-600">{column.count}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  {column.data.map((candidate, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-600">Source: {candidate.source}</div>

                      {'status' in candidate && (
                        <div className="flex gap-2 mt-2 justify-end">
                          <div className={`p-1 rounded-full ${candidate.status.rejected ? 'bg-red-50' : 'bg-gray-50'}`}>
                            <X className={`h-4 w-4 ${candidate.status.rejected ? 'text-red-400' : 'text-gray-300'}`} />
                          </div>
                          <div className={`p-1 rounded-full ${candidate.status.approved ? 'bg-gray-50' : 'bg-gray-50'}`}>
                            <CheckCircle className={`h-4 w-4 ${candidate.status.approved ? 'text-gray-400' : 'text-gray-300'}`} />
                          </div>
                        </div>
                      )}
                      
                      {'prescreened' in candidate && (
                        <>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-gray-50 text-gray-600 hover:bg-gray-100 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Prescreened
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1 bg-gray-50 text-gray-500">
                              <X className="h-3 w-3" />
                              No Visit
                            </Badge>
                          </div>
                          <div className="mt-2 space-y-1.5 text-sm">
                            <div className="text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last attempt: {candidate.lastAttempt}
                            </div>
                            <div className="text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Next call: {candidate.nextCall}
                            </div>
                            <div className="text-gray-500">
                              {candidate.previousCalls} previous calls
                            </div>
                          </div>
                          <Button variant="outline" className="w-full mt-3 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600">
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Call Patient
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {column.data.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
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
