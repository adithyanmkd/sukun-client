import VideoPlayer from "./VideoPlayer";

interface VideoCardProps {
  source: string;
}

const VideoCard = ({ source }: VideoCardProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-sm">
      <div className="flex h-32 items-center justify-center bg-gray-50 sm:h-36 md:h-40 lg:h-44">
        <VideoPlayer source={source} />
      </div>

      <p className="line-clamp-2 px-3 py-2 text-sm font-semibold text-[#28A745] sm:text-base">
        The Beauty of Quranic Recitation
      </p>
    </div>
  );
};

export default VideoCard;
