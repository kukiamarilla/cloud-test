import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multiselect";
import { Badge } from "../ui/badge";
import { listGrouper, updateGrouper, deleteGrouper, getGrouper } from "@/service/grouper";
import { listCategories } from "@/service/categories";
import { Grouper } from "@/model/grouper";
import { Category } from "@/model/category";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNotification } from "../../contexts/notification-context";

interface GrouperListProps {
  onRefresh?: () => void;
}

export const GrouperList: React.FC<GrouperListProps> = ({ onRefresh }) => {
  const [groupers, setGroupers] = useState<Grouper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingGrouper, setEditingGrouper] = useState<Grouper | null>(null);
  const [editName, setEditName] = useState('');
  const [editSelectedCategoriesIds, setEditSelectedCategoriesIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  const fetchGroupers = async () => {
    try {
      setLoading(true);
      const data = await listGrouper();
      setGroupers(data);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar los agrupadores'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar las categorías'
      });
    }
  };

  useEffect(() => {
    fetchGroupers();
    fetchCategories();
  }, []);

  const handleEdit = async (grouper: Grouper) => {
    setEditingGrouper(grouper);
    setEditName(grouper.name);
    setEditSelectedCategoriesIds(grouper.categories.map(c => c.id));
    setEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingGrouper) return;

    if (!editName.trim()) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Debes ingresar un nombre para el agrupador'
      });
      return;
    }

    if (editSelectedCategoriesIds.length === 0) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Debes seleccionar al menos una categoría'
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateGrouper({
        id: editingGrouper.id,
        name: editName.trim(),
        categories: categories.filter(c => editSelectedCategoriesIds.includes(c.id))
      });
      
      addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Agrupador actualizado correctamente'
      });

      setEditModalOpen(false);
      setEditingGrouper(null);
      setEditName('');
      setEditSelectedCategoriesIds([]);
      
      // Refresh the list
      await fetchGroupers();
      onRefresh?.();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo actualizar el agrupador'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este agrupador?')) {
      return;
    }

    try {
      await deleteGrouper(id);
      
      addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Agrupador eliminado correctamente'
      });

      await fetchGroupers();
      onRefresh?.();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo eliminar el agrupador'
      });
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingGrouper(null);
    setEditName('');
    setEditSelectedCategoriesIds([]);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando agrupadores...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Lista de Agrupadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {groupers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay agrupadores creados
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categorías</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupers.map((grouper) => (
                  <TableRow key={grouper.id}>
                    <TableCell className="font-medium">{grouper.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {grouper.categories.map((category) => (
                          <Badge key={category.id} variant="secondary">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(grouper)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(grouper.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal de edición */}
      <Dialog open={editModalOpen} onOpenChange={handleCloseEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Agrupador</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input
                type="text"
                placeholder="Nombre del Agrupador"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categorías</label>
              <MultiSelect
                options={categories.map((category) => ({ 
                  label: category.name, 
                  value: category.id 
                }))}
                value={editSelectedCategoriesIds}
                onChange={(value) => setEditSelectedCategoriesIds(value)}
                emptyMessage="No hay categorías"
                placeholder="Selecciona las categorías"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseEditModal}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Actualizando...' : 'Actualizar Agrupador'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 