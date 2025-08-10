import { useState } from "react";
import { Button } from "../ui/button";
import { GrouperList } from "../custom/grouper-list";
import { AddGrouper } from "../custom/add-grouper";
import { Plus } from "lucide-react";

interface GrouperManagementContainerProps {
  onRefresh?: () => void;
}

export const GrouperManagementContainer: React.FC<GrouperManagementContainerProps> = ({ onRefresh }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Agrupadores</h1>
        <AddGrouper />
      </div>

      <GrouperList key={refreshKey} onRefresh={handleRefresh} />

      <div className="hidden">
        <AddGrouper />
      </div>
    </div>
  );
}; 