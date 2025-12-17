import Rating from "@assets/icons/rating.svg";
import { motion } from "framer-motion";

export interface TutorCardType {
  name: string;
  subject: string;
  avatar: string;
}

type TutorCardProps = TutorCardType;

const TutorCard = ({ name, subject, avatar }: TutorCardProps) => {
  return (
    <motion.div
      className="w-full max-w-[140px] rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md sm:max-w-[155px] sm:p-3 md:max-w-[165px] lg:max-w-[180px]"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-center">
        <img
          className="size-20 rounded-full object-cover ring-2 ring-white sm:size-22 md:size-23 lg:size-24"
          src={avatar}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className="mt-2.5 text-center sm:mt-3">
        <p className="truncate text-sm font-semibold text-[#171A1F] sm:text-base lg:text-lg">
          {name}
        </p>
        <p className="truncate text-xs font-light text-[#565D6D] sm:text-sm">
          {subject}
        </p>
        <img
          className="mx-auto mt-1 h-4 w-auto sm:mt-1.5 sm:h-4.5"
          src={Rating}
          alt="rating"
        />
      </div>
    </motion.div>
  );
};

export default TutorCard;
