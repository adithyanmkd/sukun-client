import { Pencil, Trash2 } from "lucide-react";

export type Category = {
  id: string;
  name: string;
};

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
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
          {categories.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    className="text-blue-600 transition hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
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
  );
};

export default CategoryList;
