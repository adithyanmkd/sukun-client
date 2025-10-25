import NewsCard from "./NewsCard";

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
    title: "Sustainable Living Trends",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  },
];

const PopularNewsSection = () => {
  return (
    <div className="bg-[#FAFAFB] pt-10 pb-16">
      <h2 className="text-center text-4xl font-extrabold">Popular News</h2>

      <div className="mx-auto grid max-w-7xl grid-cols-4 pt-8">
        {newsCollection.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </div>
    </div>
  );
};

export default PopularNewsSection;
