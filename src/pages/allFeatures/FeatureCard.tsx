import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface FeatureCardProps {
  icon: LucideIcon | string;
  title: string;
  href: string;
  color?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  href,
  color = "bg-#FFC107",
}: FeatureCardProps) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-2 rounded-md px-4 py-3 text-black transition-transform duration-200 hover:scale-105 ${color}`}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} alt={`icon`} />
      ) : (
        <Icon size={22} />
      )}
      <p className="font-semibold">{title}</p>
    </Link>
  );
};

export default FeatureCard;
