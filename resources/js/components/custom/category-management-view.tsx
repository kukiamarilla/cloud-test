import { Button } from "../ui/button";
import { CategoryManagementContainer } from "../containers/category-management-container";
import { Tag } from "lucide-react";
import { useRefresh } from "../../contexts/refresh-context";

export const CategoryManagementView: React.FC = () => {
  const { triggerRefresh, showCategoryManagement, setShowCategoryManagement } = useRefresh();

  if (!showCategoryManagement) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestión de Categorías</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowCategoryManagement(false)}
        >
          Cerrar
        </Button>
      </div>
      <CategoryManagementContainer onRefresh={triggerRefresh} />
    </div>
  );
}; 