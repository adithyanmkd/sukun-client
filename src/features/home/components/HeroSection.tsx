import HeroImage from "@assets/images/hero-image.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative flex h-[553px] items-center justify-center">
      <div className="absolute w-full">
        <img className="w-full" src={HeroImage} alt="hero image" />
      </div>
      <div className="relative w-full max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="max-w-[560px] text-6xl font-bold text-[#19191F]">
            Find Your Tranquility with SUKUN
          </h1>
        </motion.h1>
        <p className="text-primary max-w-[560px] pt-10 text-xl font-light">
          Your daily companion for an Islamic lifestyle. Learn, discover, and
          grow in your faith.
        </p>
        <div className="space-x-3.5 pt-6">
          <Link
            to={"/"}
            className="rounded-md bg-[#FFC107] px-2.5 py-2.5 text-[#594300]"
          >
            Start Learing
          </Link>
          <Link
            to={"/"}
            className="rounded-md border border-[#28A745] bg-white px-2.5 py-2.5 text-[#28A745]"
          >
            Explore Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
