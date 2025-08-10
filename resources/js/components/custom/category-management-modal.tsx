import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { createCategory } from "@/service/categories";

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CategoryManagementModal: React.FC<CategoryManagementModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
    const [name, setName] = useState('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createCategory(name);
            setName('');
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    }

    const handleClose = () => {
        setName('');
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Categoría</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        placeholder="Nombre de la categoría" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">Agregar Categoría</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
} 