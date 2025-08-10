import { Button } from "../ui/button";
import { GrouperManagementContainer } from "../containers/grouper-management-container";
import { Settings } from "lucide-react";
import { useRefresh } from "../../contexts/refresh-context";

export const GrouperManagementView: React.FC = () => {
  const { triggerRefresh, showGrouperManagement, setShowGrouperManagement } = useRefresh();

  if (!showGrouperManagement) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestión de Agrupadores</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowGrouperManagement(false)}
        >
          Cerrar
        </Button>
      </div>
      <GrouperManagementContainer onRefresh={triggerRefresh} />
    </div>
  );
}; 