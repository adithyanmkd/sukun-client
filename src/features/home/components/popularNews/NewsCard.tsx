interface NewsCardType {
  title: string;
  image: string;
}

const NewsCard = ({ title, image }: NewsCardType) => {
  return (
    <div className="mx-auto w-[280px] cursor-pointer rounded-lg bg-white shadow-lg">
      <div className="flex h-48 items-center justify-center rounded-t-lg bg-gray-300">
        <img className="rounded-t-lg" src={image} alt={title} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};

export default NewsCard;
