import type { LucideIcon } from "lucide-react";

interface CardType {
  name: string;
  borderColor: string;
  icon: LucideIcon | string;
}

const OtherCategoryCard = ({ name, borderColor, icon: Icon }: CardType) => {
  return (
    <div
      className={`mx-auto h-40 w-36 ${borderColor} flex flex-col items-center justify-center rounded-lg border-3 border-dashed p-2 text-center`}
    >
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
        {typeof Icon === "string" ? <img src={Icon} alt={name} /> : <Icon />}
      </div>
      <h3 className="pt-2 text-sm font-light text-gray-800">{name}</h3>
    </div>
  );
};

export default OtherCategoryCard;
