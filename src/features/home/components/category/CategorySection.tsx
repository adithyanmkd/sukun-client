// import components
import CategoryCard from "./CategoryCard";

// import icons
import {
  BookOpen,
  Newspaper,
  Video,
  Search,
  Compass,
  AlarmClock,
  CalendarDays,
  Lightbulb,
  School,
  BookOpenText,
  Briefcase,
  Users,
  ListTodo,
  Calculator,
} from "lucide-react";
import masjidIcon from "@assets/icons/masjid.svg";

// categoryis data and icons
const categories = [
  {
    name: "Quran",
    icon: BookOpen,
    link: "/",
  },
  {
    name: "News",
    icon: Newspaper,
    link: "/",
  },
  {
    name: "Videos",
    icon: Video,
    link: "/",
  },
  {
    name: "Discover",
    icon: Search,
    link: "/",
  },
  {
    name: "Qibla Direction",
    icon: Compass,
    link: "/",
  },
  {
    name: "Adhan Times",
    icon: AlarmClock,
    link: "/",
  },
  {
    name: "Calendar& Events",
    icon: CalendarDays,
    link: "/",
  },
  {
    name: "Date Converter",
    icon: Lightbulb,
    link: "/",
  },
  {
    name: "Madrasa",
    icon: School,
    link: "/",
  },
  {
    name: "Books",
    icon: BookOpenText,
    link: "/",
  },
  {
    name: "Jobs",
    icon: Briefcase,
    link: "/",
  },
  {
    name: "Tutors",
    icon: Users,
    link: "/",
  },
  {
    name: "Masjid & Prayer Hall",
    icon: masjidIcon,
    link: "/",
  },
  {
    name: "To-do List",
    icon: ListTodo,
    link: "/",
  },
  {
    name: "Zakath Calculator",
    icon: Calculator,
    link: "/",
  },
];

const CategorySection = () => {
  return (
    <div className="pt-10">
      <h2 className="pb-8 text-center text-4xl font-bold text-[#171A1F]">
        Our Categories
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-5 justify-items-center gap-6 pt-10">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} isEven={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
