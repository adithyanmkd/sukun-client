import CategoryCard from "./CategoryCard";
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
  Repeat,
} from "lucide-react";
import masjidIcon from "@assets/icons/masjid.svg";

const categories = [
  { name: "Quran", icon: BookOpen, link: "/quran" },
  { name: "Dhikr Counter", icon: Repeat, link: "/dhikr" },
  { name: "News", icon: Newspaper, link: "/news" },
  { name: "Videos", icon: Video, link: "/" },
  { name: "Discover", icon: Search, link: "/" },
  { name: "Qibla Direction", icon: Compass, link: "/" },
  { name: "Adhan Times", icon: AlarmClock, link: "/" },
  { name: "Calendar & Events", icon: CalendarDays, link: "/" },
  { name: "Date Converter", icon: Lightbulb, link: "/" },
  { name: "Madrasa", icon: School, link: "/" },
  { name: "Books", icon: BookOpenText, link: "/" },
  { name: "Jobs", icon: Briefcase, link: "/" },
  { name: "Tutors", icon: Users, link: "/" },
  { name: "Masjid & Prayer Hall", icon: masjidIcon, link: "/" },
  { name: "To-do List", icon: ListTodo, link: "/" },
  { name: "Zakath Calculator", icon: Calculator, link: "/" },
];

const CategorySection = () => {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-[#171A1F] sm:text-3xl md:text-4xl">
        Our Categories
      </h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
