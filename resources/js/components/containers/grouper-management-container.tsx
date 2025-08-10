import { useState } from "react";
import { Button } from "../ui/button";
import { GrouperList } from "../custom/grouper-list";
import { GrouperManagementModal } from "../custom/grouper-management-modal";
import { Plus } from "lucide-react";

interface GrouperManagementContainerProps {
  onRefresh?: () => void;
}

export const GrouperManagementContainer: React.FC<GrouperManagementContainerProps> = ({ onRefresh }) => {
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
        <h1 className="text-3xl font-bold">Gestión de Agrupadores</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Agrupador
        </Button>
      </div>

      <GrouperList key={refreshKey} onRefresh={handleRefresh} />

      <GrouperManagementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}; 