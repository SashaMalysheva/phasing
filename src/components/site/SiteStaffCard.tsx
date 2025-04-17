
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Updated interfaces to match the API response structure
interface StaffStatisticsProps {
  staffStats: {
    total_staff: number;
    role_distribution: Record<string, number>;
    certification_status: {
      cv_uploaded: { count: number; percentage: number };
      gcp_certified: { count: number; percentage: number };
      medical_license: { count: number; percentage: number };
      delegation_of_authority: { count: number; percentage: number };
    };
    experience_by_role: Record<string, number>;
    staff_requiring_attention: {
      name: string;
      role: string;
      needs: string[];
    }[];
  };
}

const SiteStaffCard: React.FC<StaffStatisticsProps> = ({ staffStats }) => {
  // Calculate ready staff as those who don't require attention
  const readyStaff = staffStats.total_staff - staffStats.staff_requiring_attention.length;
  const readyPercentage = (readyStaff / staffStats.total_staff) * 100;

  // Transform experience data to prepare for display
  const experienceData = Object.entries(staffStats.experience_by_role).map(([role, years]) => ({
    role,
    years
  }));

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
              <span>{readyStaff}/{staffStats.total_staff} Staff Members</span>
            </div>
            <Progress value={readyPercentage} className="h-2" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Certification Status</h4>
            <div className="space-y-1">
              {Object.entries(staffStats.certification_status).map(([cert, status]) => (
                <div key={cert} className="grid grid-cols-4 text-sm items-center">
                  <span className="col-span-2">{cert.replace(/_/g, ' ')}</span>
                  <span className="text-right">{status.count}/{staffStats.total_staff}</span>
                  <span className="pl-2">
                    <Progress 
                      value={status.percentage} 
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
              {experienceData.map(({ role, years }) => (
                <div key={role} className="text-center p-2 bg-muted rounded-md">
                  <div className="font-medium">{role}</div>
                  <div className="text-xs text-muted-foreground">
                    {staffStats.role_distribution[role] || 0} staff • {years} yrs avg
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {staffStats.staff_requiring_attention.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Staff Needing Updates</h4>
              <div className="space-y-1 text-sm">
                {staffStats.staff_requiring_attention.slice(0, 5).map((staff, index) => (
                  <div key={index} className="flex justify-between text-muted-foreground">
                    <span>{staff.name} ({staff.role})</span>
                    <span>Missing: {staff.needs.join(', ')}</span>
                  </div>
                ))}
                {staffStats.staff_requiring_attention.length > 5 && (
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    +{staffStats.staff_requiring_attention.length - 5} more staff need updates
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteStaffCard;
