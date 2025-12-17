import { motion } from "framer-motion";

export interface NewsCardType {
  title: string;
  image: string;
}

type NewsCardProps = NewsCardType;

const NewsCard = ({ title, image }: NewsCardProps) => {
  return (
    <motion.div
      className="w-full max-w-60 cursor-pointer rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl sm:max-w-[260px] md:max-w-[270px] lg:max-w-[280px]"
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      layout
    >
      <div className="overflow-hidden rounded-t-xl">
        <img
          className="aspect-3/2 w-full object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="p-3 sm:p-4">
        <h2 className="line-clamp-2 flex min-h-[2.5em] items-center text-sm leading-tight font-bold text-gray-800 sm:text-base lg:text-lg">
          {title}
        </h2>
      </div>
    </motion.div>
  );
};

export default NewsCard;
