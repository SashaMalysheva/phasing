
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, AlertCircle, Map, FileText, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateTrial: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Trial</h1>
        <p className="text-muted-foreground">
          Set up a new clinical trial and find matching sites.
        </p>
      </div>
      
      <Tabs defaultValue="upload">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Protocol</TabsTrigger>
          <TabsTrigger value="details">Trial Details</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="sites">Find Sites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Protocol Document</CardTitle>
              <CardDescription>
                Start by uploading your trial protocol PDF document.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Drag & drop your protocol file</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
                <Button>Select File</Button>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Protocol Requirements</AlertTitle>
                <AlertDescription>
                  Upload a PDF file containing your full trial protocol. The system will extract key information to help match with compatible sites.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Continue to Trial Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Trial Details</CardTitle>
              <CardDescription>
                Enter general information about your clinical trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Trial Title</Label>
                <Input id="title" placeholder="Enter trial title" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phase">Trial Phase</Label>
                  <Select>
                    <SelectTrigger id="phase">
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase1">Phase 1</SelectItem>
                      <SelectItem value="phase2">Phase 2</SelectItem>
                      <SelectItem value="phase3">Phase 3</SelectItem>
                      <SelectItem value="phase4">Phase 4</SelectItem>
                      <SelectItem value="phase1-2">Phase 1/2</SelectItem>
                      <SelectItem value="phase2-3">Phase 2/3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="therapeutic">Therapeutic Area</Label>
                  <Select>
                    <SelectTrigger id="therapeutic">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="immunology">Immunology</SelectItem>
                      <SelectItem value="infectious">Infectious Diseases</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Trial Description</Label>
                <Textarea id="description" placeholder="Enter a description of the trial" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="countries">Trial Countries</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-us" />
                    <Label htmlFor="country-us">United States</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-ca" />
                    <Label htmlFor="country-ca">Canada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-uk" />
                    <Label htmlFor="country-uk">United Kingdom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-fr" />
                    <Label htmlFor="country-fr">France</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-de" />
                    <Label htmlFor="country-de">Germany</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="country-au" />
                    <Label htmlFor="country-au">Australia</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Back</Button>
              <Button>Continue to Requirements</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Trial Requirements</CardTitle>
              <CardDescription>
                Specify the requirements for sites to participate in this trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Procedures & Equipment</h3>
                
                <div className="space-y-2">
                  <Label>Required Procedures</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="proc-biopsy" />
                      <Label htmlFor="proc-biopsy">Biopsy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="proc-infusion" />
                      <Label htmlFor="proc-infusion">IV Infusion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="proc-imaging" />
                      <Label htmlFor="proc-imaging">Imaging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="proc-lumbar" />
                      <Label htmlFor="proc-lumbar">Lumbar Puncture</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Required Equipment</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="equip-centrifuge" />
                      <Label htmlFor="equip-centrifuge">Centrifuge</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="equip-ecg" />
                      <Label htmlFor="equip-ecg">ECG Machine</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="equip-fridge" />
                      <Label htmlFor="equip-fridge">2-8°C Fridge</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="equip-freezer" />
                      <Label htmlFor="equip-freezer">-80°C Freezer</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Patient Criteria</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age-min">Age Range</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="age-min" type="number" placeholder="Min" className="w-full" />
                      <span>to</span>
                      <Input id="age-max" type="number" placeholder="Max" className="w-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gender-male" />
                        <Label htmlFor="gender-male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gender-female" />
                        <Label htmlFor="gender-female">Female</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Prior Therapies</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="therapy-surgery" />
                      <Label htmlFor="therapy-surgery">Surgery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="therapy-chemo" />
                      <Label htmlFor="therapy-chemo">Chemotherapy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="therapy-radio" />
                      <Label htmlFor="therapy-radio">Radiation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="therapy-immuno" />
                      <Label htmlFor="therapy-immuno">Immunotherapy</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Budget & Payment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget per Patient ($)</Label>
                    <Input id="budget" type="number" placeholder="5000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="payment-format">Payment Format</Label>
                    <Select>
                      <SelectTrigger id="payment-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per-patient">Per Patient</SelectItem>
                        <SelectItem value="milestone">Milestone Based</SelectItem>
                        <SelectItem value="flat-rate">Flat Rate</SelectItem>
                        <SelectItem value="success-fee">Flat + Success Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Back</Button>
              <Button>Find Matching Sites</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Compatible Sites</CardTitle>
              <CardDescription>
                Based on your trial requirements, we've found these matching sites.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-medium">Site Compatibility</h3>
                  <p className="text-sm text-muted-foreground">Found 6 compatible sites with 120 potential patients</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Map className="h-4 w-4 mr-2" />
                    Map View
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg border flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Map View</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    This would display an interactive map with site markers showing patient counts and compatibility scores.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Site 0</CardTitle>
                      <Badge>100% Compatible</Badge>
                    </div>
                    <CardDescription>
                      Eligible Patients: 15/300 (5.0%)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Compatibility</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Compatible Features</h4>
                      <ul className="space-y-1">
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Procedures
                        </li>
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Equipment
                        </li>
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Facilities
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">Send Invitation</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Site 5</CardTitle>
                      <Badge>100% Compatible</Badge>
                    </div>
                    <CardDescription>
                      Eligible Patients: 25/300 (8.3%)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Compatibility</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Compatible Features</h4>
                      <ul className="space-y-1">
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Procedures
                        </li>
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Equipment
                        </li>
                        <li className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Facilities
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">Send Invitation</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline">Back</Button>
              <Button>Finalize Trial</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateTrial;
