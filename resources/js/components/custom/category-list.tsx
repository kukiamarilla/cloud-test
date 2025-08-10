import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { listCategories, updateCategory } from "@/service/categories";
import { Category } from "@/model/category";
import { Edit, Tag } from "lucide-react";

interface CategoryListProps {
  onRefresh?: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ onRefresh }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await listCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await updateCategory({
        id: editingCategory.id,
        name: editName
      });
      
      setEditModalOpen(false);
      setEditingCategory(null);
      setEditName('');
      
      // Refresh the list
      await fetchCategories();
      onRefresh?.();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingCategory(null);
    setEditName('');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Cargando categorías...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Lista de Categorías
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay categorías creadas
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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
            <DialogTitle>Editar Categoría</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input
                type="text"
                placeholder="Nombre de la categoría"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              <Button type="submit">Actualizar Categoría</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 