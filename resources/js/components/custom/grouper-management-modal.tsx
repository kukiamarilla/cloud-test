import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input";
import { listCategories } from "@/service/categories";
import { MultiSelect } from "../ui/multiselect";
import { Category } from "@/model/category";
import { createGrouper } from "@/service/grouper";

interface GrouperManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrouperManagementModal: React.FC<GrouperManagementModalProps> = ({
  isOpen,
  onClose
}) => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createGrouper({
                name, 
                categories: categories.filter(c => selectedCategoriesIds.includes(c.id))
            });
            setName('');
            setSelectedCategoriesIds([]);
            onClose();
        } catch (error) {
            console.error('Error creating grouper:', error);
        }
    }

    const handleClose = () => {
        setName('');
        setSelectedCategoriesIds([]);
        onClose();
    }

    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    const categories = await listCategories();
                    setCategories(categories);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            }
            fetchCategories();
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
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
                    />
                    <MultiSelect 
                        options={categories.map((category) => ({ label: category.name, value: category.id }))} 
                        value={selectedCategoriesIds} 
                        onChange={(value) => {setSelectedCategoriesIds(value)}} 
                        emptyMessage="No hay categorías" 
                        placeholder="Selecciona las categorías" 
                    />
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">Agregar Agrupador</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
} 