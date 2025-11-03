import PageTransition from "@/common/PageTransition";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import AuthFooter from "src/common/AuthFooter";

// import components
import Navbar from "src/common/Navbar";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col justify-between">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
