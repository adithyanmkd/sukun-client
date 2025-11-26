import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "./sidebarItems"; // data
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const ProfileSidebar = () => {
  const { pathname: currentPath } = useLocation();

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
    </Sidebar>
  );
};

export default ProfileSidebar;
