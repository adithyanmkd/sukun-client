import { type LucideIcon } from "lucide-react";
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
    <Link to={link}>
      <div className="flex h-[138px] w-[232px] flex-col items-center justify-center gap-y-2 rounded-md border border-gray-300">
        <div
          className={clsx(
            "flex size-16 items-center justify-center rounded-full",
            isEven ? "bg-[#FFC107]" : "bg-[#28A745]",
          )}
        >
          {typeof Icon === "string" ? <img src={Icon} alt={name} /> : <Icon />}
        </div>
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
