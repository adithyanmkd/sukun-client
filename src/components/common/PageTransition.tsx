import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div className="w-full">
      <div className="w-full">{children}</div>
    </motion.div>
  );
};

export default PageTransition;
