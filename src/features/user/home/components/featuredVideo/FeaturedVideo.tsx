import VideoCard from "./VideoCard";

const FeaturedVideo = () => {
  return (
    <section className="mt-10 bg-[#28A745] pb-8">
      <h1 className="py-12 text-center text-2xl font-bold text-white sm:text-3xl">
        Featured Videos
      </h1>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {[...Array(5).keys()].map((_, index) => (
            <VideoCard
              key={index}
              source="file_example_MOV_1920_2_2MB_qrexeg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
