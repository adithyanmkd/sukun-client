import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dhrn2lbuo",
  },
});

const VideoPlayer = ({ source }: { source: string }) => {
  const video = cld.video(source);

  return (
    <AdvancedVideo
      cldVid={video}
      controls
      autoPlay={false}
      className="h-full w-full rounded-t-[10px] object-cover"
    />
  );
};

export default VideoPlayer;
