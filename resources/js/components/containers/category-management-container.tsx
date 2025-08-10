import { useState } from "react";
import { Button } from "../ui/button";
import { CategoryList } from "../custom/category-list";
import { AddCategory } from "../custom/add-category";
import { Plus } from "lucide-react";

interface CategoryManagementContainerProps {
  onRefresh?: () => void;
}

export const CategoryManagementContainer: React.FC<CategoryManagementContainerProps> = ({ onRefresh }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <AddCategory />
      </div>

      <CategoryList key={refreshKey} onRefresh={handleRefresh} />

      <div className="hidden">
        <AddCategory />
      </div>
    </div>
  );
}; 