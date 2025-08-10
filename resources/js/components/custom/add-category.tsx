import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { createCategory } from "@/service/categories";
import { useNotification } from "../../contexts/notification-context";
import { useRefresh } from "../../contexts/refresh-context";

export const AddCategory = () => {
    const [name, setName] = useState('');
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
                message: 'Debes ingresar un nombre para la categoría'
            });
            return;
        }

        setIsLoading(true);
        
        try {
            await createCategory(name.trim());
            
            addNotification({
                type: 'success',
                title: 'Éxito',
                message: 'Categoría creada correctamente'
            });

            setName('');
            triggerRefresh();
            setIsOpen(false);
        } catch (error) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'No se pudo crear la categoría'
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
        setName('');
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="hover:bg-slate-600" onClick={() => setIsOpen(true)}>Agregar Categoría</Button>
            </DialogTrigger>
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
                        required
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
                            {isLoading ? 'Creando...' : 'Agregar Categoría'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}