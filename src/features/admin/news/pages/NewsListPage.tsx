import NewsList, { type News } from "../components/NewsList";
import AddNewsModal from "../components/modals/AddNewsModal";

const ListNewsPage = () => {
  const newsData = [
    {
      id: 1,
      title: "Tech Innovator Reveals New Device",
      category: "Technology",
      source: "Tech News",
      dateCreated: "2024-01-15",
    },
    {
      id: 2,
      title: "Market Analysis: Q4 Results",
      category: "Business",
      source: "Financial Times",
      dateCreated: "2024-01-14",
    },
    {
      id: 3,
      title: "Climate Summit Concludes",
      category: "Environment",
      source: "Global News",
      dateCreated: "2024-01-13",
    },
  ];

  const handleOnEdit = (item: News) => {
    // edit logic
    console.log(item);
  };

  const handleOnDelete = (id: number) => {
    console.log(id);
    // delete logic
  };
  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">News Management</h1>
          <AddNewsModal />
        </div>

        <NewsList
          news={newsData}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      </div>
    </div>
  );
};

export default ListNewsPage;
