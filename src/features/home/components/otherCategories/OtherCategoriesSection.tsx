import OtherCategoryCard from "./OtherCategoryCard";
import {
  BookOpenText,
  Utensils,
  IndianRupee,
  Users,
  HandHeart,
  Globe,
  Shirt,
  Palette,
  DollarSign,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const otherCategories = [
  { name: "Proper Tasfir", icon: BookOpenText },
  { name: "Halal Food", icon: Utensils },
  { name: "Islamic Finance", icon: IndianRupee },
  { name: "Community", icon: Users },
  { name: "Charity", icon: HandHeart },
  { name: "Travel", icon: Globe },
  { name: "Fashion", icon: Shirt },
  { name: "Art", icon: Palette },
  { name: "Education", icon: BookOpenText },
  { name: "Recipes", icon: Utensils },
  { name: "Investment", icon: DollarSign },
  { name: "Networking", icon: Users },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const OtherCategoriesSection = () => {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center text-2xl font-semibold text-[#171A1F] sm:mb-8 sm:text-3xl md:text-4xl"
      >
        Other Categories
      </motion.h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-6"
        >
          {otherCategories.map((category, index) => {
            const isTopRow = index < 6;
            const borderColor = isTopRow
              ? "border-[#FFC107]"
              : "border-[#28A745]";

            return (
              <motion.div key={index} variants={item} className="w-full">
                <OtherCategoryCard {...category} borderColor={borderColor} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default OtherCategoriesSection;
