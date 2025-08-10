import { useState } from "react";
import { Button } from "../ui/button";
import { CategoryList } from "../custom/category-list";
import { CategoryManagementModal } from "../custom/category-management-modal";
import { Plus } from "lucide-react";

interface CategoryManagementContainerProps {
  onRefresh?: () => void;
}

export const CategoryManagementContainer: React.FC<CategoryManagementContainerProps> = ({ onRefresh }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    handleRefresh();
    onRefresh?.();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Categoría
        </Button>
      </div>

      <CategoryList key={refreshKey} onRefresh={handleRefresh} />

      <CategoryManagementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}; 