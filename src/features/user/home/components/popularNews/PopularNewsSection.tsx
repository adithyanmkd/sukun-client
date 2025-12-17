import NewsCard from "./NewsCard";
import { motion, type Variants } from "framer-motion";

const newsCollection = [
  {
    title: "Global Halal Industry to Reach $5 Trillion by 2030",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  },
  {
    title: "Tech Innovations in 2025",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  },
  {
    title: "Sustainable Living Trends",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  },
  {
    title: "Islamic Finance Growth in Asia",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PopularNewsSection = () => {
  return (
    <section className="bg-[#FAFAFB] py-10 sm:py-12 lg:py-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center text-2xl font-extrabold text-[#171A1F] sm:mb-8 sm:text-3xl md:text-4xl"
      >
        Popular News
      </motion.h2>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {newsCollection.map((news, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex justify-center"
            >
              <NewsCard {...news} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularNewsSection;
