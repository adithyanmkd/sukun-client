import { Edit, Trash2, Eye } from "lucide-react";

export interface News {
  id: number;
  title: string;
  category: string;
  source: string;
  dateCreated: string;
}

interface NewsListProps {
  news: News[];
  onEdit: (item: News) => void;
  onDelete: (id: number) => void;
}

const NewsList = ({ news, onEdit, onDelete }: NewsListProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="border-b bg-gray-100">
          <tr>
            {[
              "ID",
              "Title",
              "Category",
              "Source",
              "Date Created",
              "Actions",
            ].map((val, index) => (
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
          {news.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.title}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {item.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.source}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {item.dateCreated}
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
                    onClick={() => onDelete(item.id)}
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
