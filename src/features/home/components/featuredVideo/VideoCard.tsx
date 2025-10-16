import VideoPlayer from "./VideoPlayer";

const VideoCard = ({ source }: { source: string }) => {
  return (
    <div className="h-56 rounded-[10px] bg-white">
      <div className="flex h-32 items-center justify-center">
        <VideoPlayer source={source} />
      </div>
      <p className="text-primary px-2 py-2 font-semibold">
        The Beauty of Quranic Recitation
      </p>
    </div>
  );
};

export default VideoCard;
