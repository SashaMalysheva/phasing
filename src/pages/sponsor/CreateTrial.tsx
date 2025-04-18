import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Sparkles } from "lucide-react";
import { ProtocolUploadDialog } from "@/components/sponsor/ProtocolUploadDialog";

const mockTrialData = {
  name: "Phase 2 Oncology Trial",
  description: "A Phase 2 Study of Novel Treatment in Patients with Advanced Solid Tumors",
  indication: "oncology",
  phase: "phase2",
  studyType: "interventional",
  allocation: "randomized",
  masking: "double-blind",
  inclusionCriteria: [
    "Age between 18-75 years",
    "Diagnosed with advanced solid tumors",
    "ECOG performance status ≤ 2",
    "Adequate organ function"
  ],
  exclusionCriteria: [
    "Uncontrolled cardiovascular disease",
    "Active infectious disease",
    "Prior gene therapy",
    "Inadequate organ function"
  ]
};

const CreateTrial: React.FC = () => {
  const navigate = useNavigate();
  const [inclusionCriteria, setInclusionCriteria] = useState([""]);
  const [exclusionCriteria, setExclusionCriteria] = useState([""]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trialName, setTrialName] = useState("");
  const [description, setDescription] = useState("");
  const [indication, setIndication] = useState("");
  const [phase, setPhase] = useState("");
  const [studyType, setStudyType] = useState("");
  const [allocation, setAllocation] = useState("");
  const [masking, setMasking] = useState("");

  const addInclusionCriterion = () => {
    setInclusionCriteria([...inclusionCriteria, ""]);
  };

  const removeInclusionCriterion = (index: number) => {
    const updatedCriteria = [...inclusionCriteria];
    updatedCriteria.splice(index, 1);
    setInclusionCriteria(updatedCriteria);
  };

  const updateInclusionCriterion = (index: number, value: string) => {
    const updatedCriteria = [...inclusionCriteria];
    updatedCriteria[index] = value;
    setInclusionCriteria(updatedCriteria);
  };

  const addExclusionCriterion = () => {
    setExclusionCriteria([...exclusionCriteria, ""]);
  };

  const removeExclusionCriterion = (index: number) => {
    const updatedCriteria = [...exclusionCriteria];
    updatedCriteria.splice(index, 1);
    setExclusionCriteria(updatedCriteria);
  };

  const updateExclusionCriterion = (index: number, value: string) => {
    const updatedCriteria = [...exclusionCriteria];
    updatedCriteria[index] = value;
    setExclusionCriteria(updatedCriteria);
  };

  const handleCreate = () => {
    navigate('/sponsor/find-sites');
  };

  const handleUploadComplete = () => {
    // Auto-fill form with mock data
    setTrialName(mockTrialData.name);
    setDescription(mockTrialData.description);
    setIndication(mockTrialData.indication);
    setPhase(mockTrialData.phase);
    setStudyType(mockTrialData.studyType);
    setAllocation(mockTrialData.allocation);
    setMasking(mockTrialData.masking);
    setInclusionCriteria(mockTrialData.inclusionCriteria);
    setExclusionCriteria(mockTrialData.exclusionCriteria);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Trial</h1>
          <p className="text-muted-foreground">
            Define the parameters and criteria for your clinical trial.
          </p>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-16 text-lg"
          onClick={() => setDialogOpen(true)}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Create with AI
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the basic details of the clinical trial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trial-name">Trial Name</Label>
            <Input 
              id="trial-name" 
              placeholder="Enter trial name" 
              value={trialName}
              onChange={(e) => setTrialName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter trial description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="indication">Indication</Label>
            <Input 
              id="indication" 
              placeholder="Enter indication"
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phase">Phase</Label>
            <Select value={phase} onValueChange={setPhase}>
              <SelectTrigger>
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phase1">Phase 1</SelectItem>
                <SelectItem value="phase2">Phase 2</SelectItem>
                <SelectItem value="phase3">Phase 3</SelectItem>
                <SelectItem value="phase4">Phase 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trial Design</CardTitle>
          <CardDescription>
            Specify the design and methodology of the trial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="study-type">Study Type</Label>
            <Select value={studyType} onValueChange={setStudyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select study type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interventional">Interventional</SelectItem>
                <SelectItem value="observational">Observational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="allocation">Allocation</Label>
            <Select value={allocation} onValueChange={setAllocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select allocation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="randomized">Randomized</SelectItem>
                <SelectItem value="non-randomized">Non-Randomized</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="masking">Masking</Label>
            <Select value={masking} onValueChange={setMasking}>
              <SelectTrigger>
                <SelectValue placeholder="Select masking" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="double-blind">Double Blind</SelectItem>
                <SelectItem value="single-blind">Single Blind</SelectItem>
                <SelectItem value="open-label">Open Label</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eligibility Criteria</CardTitle>
          <CardDescription>
            Define the criteria for participants to be included in the trial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Inclusion Criteria */}
          <div className="space-y-4">
            <h4 className="font-medium">Inclusion Criteria</h4>
            {inclusionCriteria.map((criterion, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={`Inclusion criterion ${index + 1}`}
                  value={criterion}
                  onChange={(e) => updateInclusionCriterion(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInclusionCriterion(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addInclusionCriterion}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Criterion
            </Button>
          </div>

          {/* Exclusion Criteria */}
          <div className="space-y-4">
            <h4 className="font-medium">Exclusion Criteria</h4>
            {exclusionCriteria.map((criterion, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={`Exclusion criterion ${index + 1}`}
                  value={criterion}
                  onChange={(e) => updateExclusionCriterion(index, e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExclusionCriterion(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addExclusionCriterion}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Criterion
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          variant="default" 
          onClick={handleCreate}
          className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
        >
          Create Trial
        </Button>
      </div>

      <ProtocolUploadDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpload={handleUploadComplete}
      />
    </div>
  );
};

export default CreateTrial;
