
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
  ClipboardList,
  Search,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface SponsorLayoutProps {
  children: React.ReactNode;
}

const SponsorLayout: React.FC<SponsorLayoutProps> = ({ children }) => {
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="font-bold text-lg">Uber Trial</div>
            <SidebarTrigger />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.includes("/sponsor/dashboard")}
                  asChild
                >
                  <Link to="/sponsor/dashboard">
                    <ClipboardList />
                    <span>Trials</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.includes("/sponsor/find-sites")}
                  asChild
                >
                  <Link to="/sponsor/find-sites">
                    <Search />
                    <span>Find Sites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname.includes("/sponsor/trials/create")}
                  asChild
                >
                  <Link to="/sponsor/trials/create">
                    <PlusCircle />
                    <span>Create Trial</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem className="mt-auto">
                <SidebarMenuButton
                  isActive={location.pathname.includes("/sponsor/settings")}
                  asChild
                >
                  <Link to="/sponsor/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                  <div className="text-muted-foreground text-xs">Sponsor #{user?.number}</div>
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
            <div className="font-bold text-lg mx-auto">Uber Trial</div>
          </div>
          
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SponsorLayout;
