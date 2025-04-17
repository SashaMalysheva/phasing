
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-purple-900">Staff Readiness</CardTitle>
          <span className="text-2xl font-bold text-purple-700">{Math.round(readyPercentage)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-800">Ready Staff</span>
              <span className="text-purple-600">{readyStaff}/{staffStats.total_staff}</span>
            </div>
            <Progress value={readyPercentage} className="h-2 bg-purple-100" />
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-purple-900 mb-2">Certification Status</h4>
            <div className="space-y-2">
              {Object.entries(staffStats.certification_status).map(([cert, status]) => (
                <div key={cert} className="flex justify-between text-sm text-purple-600">
                  <span>{cert.replace(/_/g, ' ')}</span>
                  <span>{status.count}/{staffStats.total_staff}</span>
                </div>
              ))}
            </div>
          </div>
          
          {staffStats.staff_requiring_attention.length > 0 && (
            <div className="mt-6 pt-4 border-t border-purple-100">
              <h4 className="text-sm font-medium text-purple-900 mb-2">Staff Needing Updates</h4>
              <div className="space-y-2">
                {staffStats.staff_requiring_attention.slice(0, 3).map((staff, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-purple-800">{staff.name}</div>
                    <div className="text-purple-600 text-xs">
                      Missing: {staff.needs.join(', ')}
                    </div>
                  </div>
                ))}
                {staffStats.staff_requiring_attention.length > 3 && (
                  <div className="text-xs text-purple-500 text-center mt-2">
                    +{staffStats.staff_requiring_attention.length - 3} more staff need updates
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
