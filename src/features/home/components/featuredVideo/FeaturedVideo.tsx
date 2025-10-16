import VideoCard from "./VideoCard";

const FeaturedVideo = () => {
  return (
    <div className="mt-10 bg-[#28A745] pb-8">
      <h1 className="py-12 text-center text-3xl font-bold text-white">
        Featured Videos
      </h1>
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-6">
        {/* future loop through video */}
        {[...Array(5).keys()].map(() => (
          <VideoCard source="file_example_MOV_1920_2_2MB_qrexeg" />
        ))}
      </div>
    </div>
  );
};

export default FeaturedVideo;
