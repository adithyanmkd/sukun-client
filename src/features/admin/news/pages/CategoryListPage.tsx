import { Pencil, Trash2 } from "lucide-react";
import AddCategoryModal from "../components/modals/AddCategoryModal";

const CategoryListPage = () => {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Garden" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Toys & Games" },
    { id: 7, name: "Food & Beverages" },
    { id: 8, name: "Beauty & Personal Care" },
  ];

  const handleEdit = (item: { id: number; name: string }) => {
    console.log("Edit:", item);
  };

  const handleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Category List</h1>
          {/* add category modal */}
          <AddCategoryModal />
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                {["ID", "Name", "Actions"].map((val, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 transition hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 transition hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;
