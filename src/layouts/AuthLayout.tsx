import PageTransition from "@/components/common/PageTransition";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import AuthFooter from "@/components/common/AuthFooter";

// import components
import Navbar from "@/components/common/Navbar";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
