import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.25 },
        layout: { duration: 0.25, ease: "easeOut" },
      }}
      className="w-full"
    >
      <div className="w-full">{children}</div>
    </motion.div>
  );
};

export default PageTransition;
