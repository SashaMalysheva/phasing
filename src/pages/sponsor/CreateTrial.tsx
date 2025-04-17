import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react";

const CreateTrial: React.FC = () => {
  const [inclusionCriteria, setInclusionCriteria] = useState([""]);
  const [exclusionCriteria, setExclusionCriteria] = useState([""]);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Trial</h1>
        <p className="text-muted-foreground">
          Define the parameters and criteria for your clinical trial.
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Trial Details</TabsTrigger>
          <TabsTrigger value="criteria">Eligibility Criteria</TabsTrigger>
          <TabsTrigger value="sites">Participating Sites</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
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
                <Input id="trial-name" placeholder="Enter trial name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter trial description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indication">Indication</Label>
                <Input id="indication" placeholder="Enter indication" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phase">Phase</Label>
                <Select>
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
                <Select>
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
                <Select>
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
                <Select>
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
        </TabsContent>

        <TabsContent value="criteria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inclusion Criteria</CardTitle>
              <CardDescription>
                Define the criteria for participants to be included in the trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exclusion Criteria</CardTitle>
              <CardDescription>
                Define the criteria for participants to be excluded from the trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Participating Sites</CardTitle>
              <CardDescription>
                Select the sites that will participate in this clinical trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  No sites selected yet. Go to <a href="/sponsor/find-sites" className="text-primary underline">Find Sites</a> to add participating sites.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex justify-end">
        <Button variant="primary">Create Trial</Button>
      </div>
    </div>
  );
};

export default CreateTrial;
