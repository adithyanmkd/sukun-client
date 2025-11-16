import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon | string;
  link: string;
  isEven: boolean;
}

const CategoryCard = ({
  name,
  icon: Icon,
  link,
  isEven,
}: CategoryCardProps) => {
  return (
    <Link
      to={link}
      className="block w-full transition-transform duration-300 hover:scale-[1.03]"
    >
      <div
        className={clsx(
          "flex w-full flex-col items-center justify-center gap-y-2 rounded-xl border border-gray-300 bg-white p-4 shadow-sm hover:shadow-md",
          "h-[100px] sm:h-[110px] md:h-[120px] lg:h-[138px]",
          isEven ? "hover:-translate-y-1" : "hover:translate-y-1",
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center rounded-full",
            "size-12 sm:size-14 md:size-15 lg:size-16",
            isEven ? "bg-[#FFC107]" : "bg-[#28A745]",
          )}
        >
          {typeof Icon === "string" ? (
            <img
              src={Icon}
              alt={name}
              loading="lazy"
              className="size-7 object-contain sm:size-8 md:size-8.5 lg:size-9"
            />
          ) : (
            <Icon className="size-7 text-white sm:size-8 md:size-8.5 lg:size-9" />
          )}
        </div>

        <p className="line-clamp-2 max-w-full text-center text-xs leading-tight font-medium text-[#171A1F] sm:text-sm md:text-base">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
