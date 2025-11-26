import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "../components/profileSidebar/ProfileSidebar";
import Navbar from "@/common/Navbar";
import Footer from "@/common/Footer";

const ProfileLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />

        <div className="flex flex-1">
          <ProfileSidebar />

          <main className="h-full flex-1 p-2">
            {/* <SidebarTrigger /> */}
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default ProfileLayout;
