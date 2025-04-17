
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

const SiteSettings: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your site account settings and preferences.
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Site Profile</CardTitle>
            <CardDescription>
              Update your site's information and contact details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Site Name</Label>
              <Input id="name" defaultValue={`Site ${user?.number}`} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue="Clinical research site specializing in oncology trials." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Medical Center Dr." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City, State, ZIP</Label>
                <Input id="city" defaultValue="Boston, MA 02115" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Primary Contact Email</Label>
              <Input id="contact" type="email" defaultValue="contact@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Configure how you receive notifications about trials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for important updates.
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="trial-invitations">Trial Invitations</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when sponsors invite you to participate in trials.
                </p>
              </div>
              <Switch id="trial-invitations" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="matching-trials">Matching Trial Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when new trials match your site's capabilities.
                </p>
              </div>
              <Switch id="matching-trials" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staff Certifications</CardTitle>
            <CardDescription>
              Configure automatic reminders for staff certification renewals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="renewal-reminders">Certificate Renewal Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminders when certifications are due for renewal.
                </p>
              </div>
              <Switch id="renewal-reminders" defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="days-before">Days Before Expiry to Send Reminder</Label>
              <Input id="days-before" type="number" defaultValue="30" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SiteSettings;
