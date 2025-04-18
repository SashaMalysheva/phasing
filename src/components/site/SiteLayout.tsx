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
      icon: ClipboardList,
      label: "Overview",
      path: "/site/dashboard",
      tooltip: "Overview",
    },
    {
      icon: FileText,
      label: "Trials",
      path: "/site/trials",
      tooltip: "Trials",
    },
    {
      icon: Search,
      label: "Find Matching Trials",
      path: "/site/trials/find",
      tooltip: "Find Matching Trials",
    },
    {
      icon: BookOpen,
      label: "Site Details",
      path: "/site/readiness",
      tooltip: "Site Details",
    },
    {
      icon: BarChart3,
      label: "Patient Analytics",
      path: "/site/analytics",
      tooltip: "Patient Analytics",
    },
    {
      icon: Users,
      label: "Staff Analytics",
      path: "/site/staff",
      tooltip: "Staff Analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/site/settings",
      tooltip: "Settings",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <Square className="h-5 w-5 text-primary fill-primary" />
                <Square className="h-5 w-5 text-primary/80 fill-primary/80" />
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
              <div className="flex -space-x-1">
                <Square className="h-5 w-5 text-primary fill-primary" />
                <Square className="h-5 w-5 text-primary/80 fill-primary/80" />
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
