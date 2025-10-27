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

// other catetegories data
const otherCategories = [
  {
    name: "Proper Tasfir",
    icon: BookOpenText,
  },
  {
    name: "Halal Food",
    icon: Utensils,
  },
  {
    name: "Islamic Finance",
    icon: IndianRupee,
  },
  {
    name: "Community",
    icon: Users,
  },
  {
    name: "Charity",
    icon: HandHeart,
  },
  {
    name: "Travel",
    icon: Globe,
  },
  {
    name: "Fashion",
    icon: Shirt,
  },
  {
    name: "Art",
    icon: Palette,
  },
  {
    name: "Education",
    icon: BookOpenText,
  },
  {
    name: "Recipes",
    icon: Utensils,
  },
  {
    name: "Investment",
    icon: DollarSign,
  },
  {
    name: "Networking",
    icon: Users,
  },
];

const OtherCategoriesSection = () => {
  return (
    <div className="pt-10 pb-16">
      <h2 className="pb-8 text-center text-4xl font-semibold">
        Other Categories
      </h2>
      <div className="mx-auto grid max-w-5xl grid-cols-6 gap-y-6 pt-2">
        {otherCategories.map((category, index) => (
          <OtherCategoryCard
            key={index}
            {...category}
            borderColor={
              index + 1 > 6 ? "border-[#28A745]" : "border-[#FFC107]"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OtherCategoriesSection;
