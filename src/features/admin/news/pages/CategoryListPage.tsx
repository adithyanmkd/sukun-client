import AddCategoryModal from "../components/modals/AddCategoryModal";
import { useFetchCategoriesQuery } from "../api/newsApi";
import CategoryList from "../components/CategoryList";
import { Spinner } from "@/components/ui/spinner";

const CategoryListPage = () => {
  const { data, isLoading, isError, error } = useFetchCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3">
        <Spinner className="size-10" />
        <p className="text-sm text-gray-500">Loading categories…</p>
      </div>
    );
  }

  if (isError) {
    console.log(error);

    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-red-600">
          Failed to load categories
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const categories = data.data;

  if (categories.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-700">No categories found</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first category to organize news content.
        </p>
        <div className="mt-4">
          <AddCategoryModal />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Category List</h1>

          {/* add category modal */}
          <AddCategoryModal />
        </div>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default CategoryListPage;
