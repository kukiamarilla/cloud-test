import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input";
import { listCategories } from "@/service/categories";
import { MultiSelect } from "../ui/multiselect";
import { Category } from "@/model/category";
import { createGrouper } from "@/service/grouper";
import { useNotification } from "../../contexts/notification-context";
import { useRefresh } from "../../contexts/refresh-context";

export const AddGrouper = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addNotification } = useNotification();
    const { triggerRefresh } = useRefresh();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!name.trim()) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'Debes ingresar un nombre para el agrupador'
            });
            return;
        }

        if (selectedCategoriesIds.length === 0) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'Debes seleccionar al menos una categoría'
            });
            return;
        }

        setIsLoading(true);
        
        try {
            await createGrouper({
                name: name.trim(), 
                categories: categories.filter(c => selectedCategoriesIds.includes(c.id))
            });
            
            addNotification({
                type: 'success',
                title: 'Éxito',
                message: 'Agrupador creado correctamente'
            });

            setName('');
            setSelectedCategoriesIds([]);
            triggerRefresh();
            setIsOpen(false);
        } catch (error) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'No se pudo crear el agrupador'
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
        setName('');
        setSelectedCategoriesIds([]);
    }

    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const categories = await listCategories();
                    setCategories(categories);
                } catch (error) {
                    addNotification({
                        type: 'error',
                        title: 'Error',
                        message: 'No se pudieron cargar las categorías'
                    });
                }
            }
            fetchCategories();
        }
    }, [isOpen, addNotification]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="hover:bg-slate-600" onClick={() => setIsOpen(true)}>Agregar Agrupador</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Agrupador</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        placeholder="Nombre del Agrupador" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <MultiSelect 
                        options={categories.map((category) => ({ label: category.name, value: category.id }))} 
                        value={selectedCategoriesIds} 
                        onChange={(value) => {setSelectedCategoriesIds(value)}} 
                        emptyMessage="No hay categorías" 
                        placeholder="Selecciona las categorías" 
                    />
                    <div className="flex gap-2 justify-end">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creando...' : 'Agregar Agrupador'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}