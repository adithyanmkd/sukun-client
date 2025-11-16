import HeroImage from "@assets/images/hero-image.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={HeroImage}
          alt="Hero background"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Find Your Tranquility with SUKUN
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-4 max-w-lg text-sm font-light text-white sm:mt-6 sm:text-base md:text-lg lg:text-xl"
          >
            Your daily companion for an Islamic lifestyle. Learn, discover, and
            grow in your faith.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-[#FFC107] px-5 py-3 text-sm font-medium text-[#594300] transition hover:bg-[#ffb300] focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 focus:outline-none sm:text-base"
            >
              Start Learning
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md border border-white bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none sm:text-base"
            >
              Explore Resources
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
