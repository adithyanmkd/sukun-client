import type { LucideIcon } from "lucide-react";

interface CardType {
  name: string;
  borderColor: string;
  icon: LucideIcon | string;
}

const OtherCategoryCard = ({ name, borderColor, icon: Icon }: CardType) => {
  return (
    <div
      className={`mx-auto flex h-40 w-36 cursor-pointer flex-col items-center justify-center rounded-lg border-3 border-dashed ${borderColor} bg-white p-2 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
        {typeof Icon === "string" ? (
          <img src={Icon} alt={name} className="h-6 w-6 object-contain" />
        ) : (
          <Icon className="h-6 w-6 text-gray-700" />
        )}
      </div>

      <h3 className="pt-2 text-sm font-light text-gray-800">{name}</h3>
    </div>
  );
};

export default OtherCategoryCard;
