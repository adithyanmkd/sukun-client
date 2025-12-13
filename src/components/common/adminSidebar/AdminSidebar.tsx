import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import BrandLogo from "@assets/icons/logo.svg";
import { Newspaper } from "lucide-react";
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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <img src={BrandLogo} alt="brand logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItems items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>Logout</SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
