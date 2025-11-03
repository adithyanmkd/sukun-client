import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  key: string | number;
}

const modernVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    rotateX: -8,
    filter: "blur(2px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    rotateX: 6,
    filter: "blur(1px)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PageTransition = ({ children, key }: PageTransitionProps) => {
  return (
    <motion.div
      key={key}
      variants={modernVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
