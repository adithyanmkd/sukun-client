import TutorCard from "./TutorCard";
import { type TutorCardType } from "./TutorCard";
import Avatar from "@assets/images/demo-user.jpg";
import { motion, type Variants } from "framer-motion";

const tutors: TutorCardType[] = [
  { name: "Yusuf Ahmed", avatar: Avatar, subject: "Quran Studies" },
  { name: "Fatima Khan", avatar: Avatar, subject: "Arabic Language" },
  { name: "Ali Raza", avatar: Avatar, subject: "Islamic History" },
  { name: "Aisha Begum", avatar: Avatar, subject: "Fiqh" },
  { name: "Omar Sharif", avatar: Avatar, subject: "Hadith" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FeaturedTutorsSection = () => {
  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center text-2xl font-semibold text-[#171A1F] sm:mb-8 sm:text-3xl md:text-4xl"
      >
        Featured Tutors
      </motion.h1>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5"
        >
          {tutors.map((tutor, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex justify-center"
            >
              <TutorCard {...tutor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTutorsSection;
