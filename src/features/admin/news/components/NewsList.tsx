import { Edit, Trash2, Eye } from "lucide-react";

import type { NewsDto } from "../types";

interface NewsListProps {
  news: NewsDto[];
  onEdit: (item: NewsDto) => void;
  onDelete: (id: string) => void;
}

const NewsList = ({ news, onEdit, onDelete }: NewsListProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="border-b bg-gray-100">
          <tr>
            {["ID", "Title", "Category", "Source", "Actions"].map(
              (val, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
                >
                  {val}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.title}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {item.category.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {item.source.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button className="text-blue-600 transition hover:text-blue-800">
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 transition hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
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

export default NewsList;
