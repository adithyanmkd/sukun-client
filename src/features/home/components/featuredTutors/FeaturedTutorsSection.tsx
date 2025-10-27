import TutorCard from "./TutorCard";
import { type TutorCardType } from "./TutorCard";

// import assets
import Avatar from "@assets/images/demo-user.jpg";

const tutors: TutorCardType[] = [
  {
    name: "Yusuf Ahmed",
    avatar: Avatar,
    subject: "Quran Studies",
  },
  {
    name: "Fatima Khan",
    avatar: Avatar,
    subject: "Arabic Language",
  },
  {
    name: "Ali Raza",
    avatar: Avatar,
    subject: "Islamic History",
  },
  {
    name: "Aisha Begum",
    avatar: Avatar,
    subject: "Fiqh",
  },
  {
    name: "Omar Sharif",
    avatar: Avatar,
    subject: "Hadith",
  },
];

const FeaturedTutorsSection = () => {
  return (
    <div className="pt-10 pb-16">
      <h1 className="pb-8 text-center text-4xl font-semibold">
        Featured Tutors
      </h1>
      <div className="mx-auto grid max-w-7xl grid-cols-5 place-items-center gap-6 pt-10">
        {tutors.map((tutor, index) => (
          <TutorCard key={index} {...tutor} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTutorsSection;
