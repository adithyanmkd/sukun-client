interface PartnerCardProps {
  name: string;
  position: string;
  image: string;
}

const PartnerCard = ({ name, position, image }: PartnerCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="size-40 overflow-hidden rounded-full bg-[#D9D9D9]">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <p className="mt-3 text-lg font-bold text-white uppercase">{name}</p>
      {position && (
        <p className="text-sm font-semibold text-white">{position}</p>
      )}
    </div>
  );
};

export default PartnerCard;
