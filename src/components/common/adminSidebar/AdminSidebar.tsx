import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Newspaper } from "lucide-react";

import BrandLogo from "@assets/icons/logo.svg";
import Logo from "@assets/icons/logo_icon.svg";

import SidebarItems from "./SidebarItems";

const data = {
  navMain: [
    {
      title: "News",
      url: "#",
      icon: Newspaper,
      items: [
        {
          title: "News Management",
          url: "/admin/news",
        },
        {
          title: "Manage Category",
          url: "/admin/category",
        },
        {
          title: "Manage Sources",
          url: "/admin/sources",
        },
      ],
    },
  ],
};

const AdminSidebar = () => {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {state === "collapsed" ? (
          <img className="size-10" src={Logo} alt="brand logo without text" />
        ) : (
          <img src={BrandLogo} alt="brand logo with text" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarItems items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>Logout</SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
