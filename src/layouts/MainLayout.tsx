import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import PageTransition from "@/common/PageTransition";
import ScrollToTop from "@/utils/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <ScrollToTop />
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
