import Rating from "@assets/icons/rating.svg";

export interface TutorCardType {
  name: string;
  subject: string;
  avatar: string;
}

const TutorCard = ({ name, subject, avatar }: TutorCardType) => {
  return (
    <div className="max-w-[180px] rounded-[10px] border border-gray-300 px-4 py-6">
      <div className="px-5">
        <img className="size-24 rounded-full" src={avatar} alt={name} />
      </div>
      <div className="pt-4">
        <p className="text-lg font-semibold">{name}</p>
        <p className="font-light text-[#565D6D]">{subject}</p>
        <img className="pt-1" src={Rating} alt="rating" />
      </div>
    </div>
  );
};

export default TutorCard;
