import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "./sidebarItems"; // data
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";

const ProfileSidebar = () => {
  const { pathname: currentPath } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Sidebar className="sticky h-full" variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => {
                const isActive = currentPath === item.path;

                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      className={cn(
                        isActive &&
                          "rounded-md bg-[#e9af00] hover:bg-[#FFC107]",
                      )}
                      asChild
                    >
                      <Link to={item.path}>
                        <item.icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ProfileSidebar;
