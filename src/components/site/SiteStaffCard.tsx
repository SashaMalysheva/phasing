
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StaffRole {
  count: number;
  avg_experience: number;
}

interface Certification {
  complete: number;
  total: number;
}

interface IncompleteStaff {
  name: string;
  role: string;
  missing: string[];
}

interface StaffStatistics {
  total_staff: number;
  ready_staff: number;
  staff_by_role: {
    [key: string]: StaffRole;
  };
  certifications: {
    [key: string]: Certification;
  };
  incomplete_staff: IncompleteStaff[];
}

interface SiteStaffCardProps {
  staffStats: StaffStatistics;
}

const SiteStaffCard: React.FC<SiteStaffCardProps> = ({ staffStats }) => {
  const readyPercentage = (staffStats.ready_staff / staffStats.total_staff) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Staff Readiness</span>
          <span className="text-2xl font-bold">{Math.round(readyPercentage)}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Ready Staff</span>
              <span>{staffStats.ready_staff}/{staffStats.total_staff} Staff Members</span>
            </div>
            <Progress value={readyPercentage} className="h-2" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Certification Status</h4>
            <div className="space-y-1">
              {Object.entries(staffStats.certifications).map(([cert, status]) => (
                <div key={cert} className="grid grid-cols-4 text-sm items-center">
                  <span className="col-span-2">{cert}</span>
                  <span className="text-right">{status.complete}/{status.total}</span>
                  <span className="pl-2">
                    <Progress 
                      value={(status.complete / status.total) * 100} 
                      className="h-2"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Experience by Role</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(staffStats.staff_by_role).map(([role, data]) => (
                <div key={role} className="text-center p-2 bg-muted rounded-md">
                  <div className="font-medium">{role}</div>
                  <div className="text-xs text-muted-foreground">
                    {data.count} staff • {data.avg_experience} yrs avg
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {staffStats.incomplete_staff.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Staff Needing Updates</h4>
              <div className="space-y-1 text-sm">
                {staffStats.incomplete_staff.map((staff, index) => (
                  <div key={index} className="flex justify-between text-muted-foreground">
                    <span>{staff.name} ({staff.role})</span>
                    <span>Missing: {staff.missing.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteStaffCard;
