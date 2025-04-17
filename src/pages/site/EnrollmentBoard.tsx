
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Filter, Plus, RefreshCcw, Edit, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EnrollmentBoard = () => {
  const { trialId } = useParams();
  const [selectedTrial, setSelectedTrial] = useState("Type 2 Diabetes E1224");
  const [selectedSite, setSelectedSite] = useState("John Hopkins Clinic");

  const stats = [
    { label: "Enrolled Participants", value: "45", change: "+5" },
    { label: "Enrollment Target", value: "100" },
    { label: "Enrollment Progress", value: "45%" },
    { label: "Identified Leads", value: "150", change: "+12" },
    { label: "Ongoing Outreach", value: "95", change: "-3" },
    { label: "Prescreened", value: "72", change: "+2" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {selectedTrial}
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
          <div className="w-64">
            <Select value={selectedTrial} onValueChange={setSelectedTrial}>
              <SelectTrigger>
                <SelectValue placeholder="Select Clinical Trial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Type 2 Diabetes E1224">Type 2 Diabetes E1224</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
          <Card key={index} className="p-4">
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="mt-1 flex items-baseline">
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

      <Tabs defaultValue="enrollment">
        <TabsList className="mb-6">
          <TabsTrigger value="enrollment">Enrollment Board</TabsTrigger>
          <TabsTrigger value="metrics">Metrics & Analytics</TabsTrigger>
          <TabsTrigger value="voice">Voice Call Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {['Not Eligible', 'Identified Lead', 'Qualified', 'Ongoing Outreach'].map((stage, index) => (
              <div key={stage} className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">{stage}</h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {index === 0 && '2 candidates'}
                  {index === 1 && '3 candidates identified from various sources'}
                  {index === 2 && '2 candidates approved for further contact'}
                  {index === 3 && '3 candidates active contact with voice agent'}
                </div>
                <Separator className="mb-4" />
                {/* Placeholder for candidate cards */}
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="font-medium">Sample Candidate</div>
                    <div className="text-sm text-gray-500">Source: Patient Portal</div>
                  </div>
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
