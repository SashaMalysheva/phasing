
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
  const readyStaff = staffStats.total_staff - staffStats.staff_requiring_attention.length;
  const readyPercentage = (readyStaff / staffStats.total_staff) * 100;

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Staff Readiness</span>
          <span className="text-xl font-bold text-black">{Math.round(readyPercentage)}%</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Ready Staff</span>
          <span className="text-black">{readyStaff}/{staffStats.total_staff}</span>
        </div>
        <Progress value={readyPercentage} className="h-2 bg-purple-100" />
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-medium text-black mb-2">Certification Status</h4>
          <div className="space-y-2">
            {Object.entries(staffStats.certification_status).map(([cert, status]) => (
              <div key={cert} className="flex justify-between text-sm text-gray-600">
                <span className="capitalize">{cert.replace(/_/g, ' ')}</span>
                <span className="text-black">{status.count}/{staffStats.total_staff}</span>
              </div>
            ))}
          </div>
        </div>
        
        {staffStats.staff_requiring_attention.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-black mb-2">Staff Needing Updates</h4>
            <div className="space-y-2">
              {staffStats.staff_requiring_attention.slice(0, 3).map((staff, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium text-black">{staff.name}</div>
                  <div className="text-gray-600 text-xs">
                    Missing: {staff.needs.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t flex justify-between items-center">
        <Link 
          to="/site/staff" 
          className="flex items-center text-sm text-[#9b87f5] hover:text-[#8B5CF6]"
        >
          View 3 more staff details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

export default SiteStaffCard;
