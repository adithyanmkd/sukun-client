import { Share2, Bookmark, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { type NewsDto } from "@/features/admin/news/types";
import { Button } from "@/components/ui/button";

interface NewsCardProps extends NewsDto {
  onReadMore?: (id: string) => void;
  onShare?: (id: string) => void;
  onBookmark?: (id: string) => void;
}

const NewsCard = ({
  _id,
  title,
  description,
  image,
  source,
  onShare,
  onBookmark,
  readMoreUrl,
}: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Fixed Size */}
        <motion.div
          className="h-64 w-full overflow-hidden lg:h-80 lg:w-96 lg:shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image.url}
            alt={title}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h2 className="mb-4 text-2xl leading-tight font-bold text-gray-900">
            {title}
          </h2>

          {/* Description */}
          <p className="mb-4 grow leading-relaxed text-gray-700">
            {description}
          </p>

          {/* Source and Date */}
          <div className="mb-6 text-sm text-gray-600">
            <span className="font-medium">Source: {source.name}</span>
            <span className="mx-2">|</span>
            <span>Updated: {new Date().toLocaleDateString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-[#2E8A56] hover:bg-[#26754a]">
              <a
                href={readMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => console.log(readMoreUrl)}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </a>
            </Button>

            <Button asChild variant="outline">
              <motion.button
                onClick={() => onShare?.(_id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </motion.button>
            </Button>

            <Button asChild variant="outline">
              <motion.button
                onClick={() => onBookmark?.(_id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Bookmark
              </motion.button>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
