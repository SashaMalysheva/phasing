import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import {
  FileText,
  ClipboardList,
  BarChart3,
  Settings,
  Users,
  BookOpen,
  Search,
  LogOut,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const menuItems = [
    {
      icon: Square,
      label: "My Task",
      path: "/my-task",
      tooltip: "My Task",
    },
    {
      icon: ClipboardList,
      label: "Overview",
      path: "/",
      tooltip: "Overview",
    },
    {
      icon: BookOpen,
      label: "Site Details",
      path: "/readiness",
      tooltip: "Site Details",
    },
    {
      icon: BarChart3,
      label: "Enrollment Board",
      path: "/trials/trial_123/enrollment",
      tooltip: "Enrollment Board",
    },
    {
      icon: Users,
      label: "Staff Analytics",
      path: "/staff",
      tooltip: "Staff Analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      tooltip: "Settings",
    },
    {
      icon: Square,
      label: "Audit and logs",
      path: "/audit-logs",
      tooltip: "Audit and logs",
    },
    {
      icon: Square,
      label: "My communication",
      path: "/my-communication",
      tooltip: "My communication",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-5">
                <div className="absolute top-0 right-0 w-5 h-3 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-4 h-3 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-sm"></div>
              </div>
              <div className="font-bold text-lg">Phasing.ai</div>
            </div>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.path}
                    tooltip={item.tooltip}
                    asChild
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-muted-foreground text-xs">Site #{user?.number}</div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="flex md:hidden items-center p-4 border-b">
            <SidebarTrigger />
            <div className="flex items-center gap-2 mx-auto">
              <div className="relative h-6 w-5">
                <div className="absolute top-0 right-0 w-5 h-3 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-4 h-3 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-sm"></div>
              </div>
              <div className="font-bold text-lg">Phasing.ai</div>
            </div>
          </div>
          
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SiteLayout;
