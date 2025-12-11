import { Pencil, Trash2 } from "lucide-react";
import EditCategoryModal from "./modals/EditCategoryModal";
import { useState } from "react";
import { useDeleteCategoryMutation } from "../api/newsApi";
import ConfirmAlert from "./alert/ConfirmAlert";

export type Category = {
  _id: string;
  name: string;
};

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const [deleteItem, setDeleteItem] = useState<Category | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Category>({
    _id: "",
    name: "",
  });

  // edit category
  const onEdit = (item: Category) => {
    setItem(item);
    setOpen(true);
  };

  // delete category
  const onDelete = async (item: Category) => {
    setDeleteItem(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setConfirmOpen(false);
      await deleteCategory(deleteItem).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteItem(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {/* edit modal */}
      <EditCategoryModal item={item} open={open} onOpenChange={setOpen} />

      {/* confirm alert */}
      <ConfirmAlert
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
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
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 transition hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete({ _id: item._id, name: item.name })}
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
