import { Pencil, Trash2 } from "lucide-react";
import { type Source } from "../pages/SourceListPage";
import { useState } from "react";
import ConfirmAlert from "./alert/ConfirmAlert";
import { useDeleteSourceMutation } from "../api/sourcesApi";
import EditSourceModal from "./modals/EditSourceModal";

type SourceListProps = {
  sources: Source[];
};

const SourceList = ({ sources }: SourceListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Source | null>(null);
  const [deleteItem, setDeleteItem] = useState<Source | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteSource, { isLoading }] = useDeleteSourceMutation();

  // handle delete
  const onDelete = (item: Source) => {
    setDeleteItem(item);
    setConfirmOpen(true);
  };

  // handle edit source
  const onEdit = (source: Source) => {
    setEditingItem(source);
    setIsEditing(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    try {
      setConfirmOpen(false);
      await deleteSource(deleteItem);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteItem(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {editingItem && (
        <EditSourceModal
          source={editingItem}
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      )}
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
            {["ID", "Name", "URL", "Actions"].map((val, index) => (
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
          {sources.map((item, index) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{item.url}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <button
                    className="text-blue-600 transition hover:text-blue-800"
                    title="Edit"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
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

export default SourceList;
