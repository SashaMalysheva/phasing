
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [role, setRole] = useState<"sponsor" | "site" | null>(null);
  const [idNumber, setIdNumber] = useState<string>("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }
    
    if (!idNumber) {
      toast({
        title: "Error",
        description: "Please enter your ID number",
        variant: "destructive",
      });
      return;
    }
    
    const parsedNumber = parseInt(idNumber, 10);
    
    if (isNaN(parsedNumber)) {
      toast({
        title: "Error",
        description: "ID must be a number",
        variant: "destructive",
      });
      return;
    }
    
    // Validate range
    if (role === "sponsor" && (parsedNumber < 0 || parsedNumber > 2)) {
      toast({
        title: "Error",
        description: "Sponsor number must be between 0 and 2",
        variant: "destructive",
      });
      return;
    }
    
    if (role === "site" && (parsedNumber < 0 || parsedNumber > 9)) {
      toast({
        title: "Error",
        description: "Site number must be between 0 and 9",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(role, parsedNumber);
      
      // Redirect based on role
      if (role === "sponsor") {
        navigate("/sponsor/dashboard");
      } else {
        navigate("/site/dashboard");
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome to Uber Trial Platform!`,
      });
    } catch (err) {
      // Error handling is done in the AuthContext
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Uber Trial Platform</CardTitle>
          <CardDescription>
            The clinical research platform that keeps sites ready to start instantly
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Select your role</h3>
              <RadioGroup value={role || ""} onValueChange={(value) => setRole(value as "sponsor" | "site")}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="sponsor" id="sponsor" />
                    <Label htmlFor="sponsor" className="flex-1 cursor-pointer">Sponsor</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="site" id="site" />
                    <Label htmlFor="site" className="flex-1 cursor-pointer">Site</Label>
                  </div>
                </div>
              </RadioGroup>
              
              {role && (
                <div className="mt-4 text-sm text-muted-foreground italic">
                  Sites on Uber Trial stay ready to start — so startup takes days, not months.
                </div>
              )}
            </div>
            
            {role && (
              <div className="space-y-2">
                <Label htmlFor="id-number">
                  {role === "sponsor" ? "Sponsor ID (0-2)" : "Site ID (0-9)"}
                </Label>
                <Input
                  id="id-number"
                  placeholder={role === "sponsor" ? "Enter sponsor number" : "Enter site number"}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full"
                  maxLength={1}
                />
                {error && <p className="text-sm text-destructive mt-1">{error}</p>}
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={loading || !role || !idNumber}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
