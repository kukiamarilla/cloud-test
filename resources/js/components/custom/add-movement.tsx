import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { createMovement } from "@/service/movements"
import { Category } from "@/model/category"
import { listCategories } from "@/service/categories"
import { ComboboxSelect } from "../ui/combobox-select"
import { DatePicker } from "../ui/date-picker"
import { useNotification } from "../../contexts/notification-context"
import { useRefresh } from "../../contexts/refresh-context"

export const AddMovement = () => {
    const [movementType, setMovementType] = useState<'income' | 'expense'>('income');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addNotification } = useNotification();
    const { triggerRefresh } = useRefresh();

    const handleOpen = (movementType: 'income' | 'expense') => {
        setMovementType(movementType);
        setIsOpen(true);
        listCategories().then((data) => {
            setCategories(data);
        }).catch((error) => {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'No se pudieron cargar las categorías'
            });
        });
    }

    const handleClose = () => {
        setIsOpen(false);
        setDescription('');
        setAmount(0);
        setCategory(null);
        setDate(new Date());
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!category) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'Debes seleccionar una categoría'
            });
            return;
        }

        if (!description.trim()) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'Debes ingresar una descripción'
            });
            return;
        }

        if (amount <= 0) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'El monto debe ser mayor a 0'
            });
            return;
        }

        setIsLoading(true);
        
        try {
            await createMovement({
                description: description.trim(),
                amount,
                type: movementType,
                date: date.toISOString().substring(0,10),
                category_id: category,
            });

            addNotification({
                type: 'success',
                title: 'Éxito',
                message: `${movementType === 'income' ? 'Ingreso' : 'Gasto'} agregado correctamente`
            });

            triggerRefresh();
            handleClose();
        } catch (error) {
            addNotification({
                type: 'error',
                title: 'Error',
                message: 'No se pudo agregar el movimiento'
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='flex flex-row gap-4 items-stretch mb-5'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className='bg-green-600 text-white hover:bg-green-700' onClick={() => handleOpen('income')}>Agregar Ingreso</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                    <Button className='bg-red-600 text-white hover:bg-red-700' onClick={() => handleOpen('expense')}>Agregar Gasto</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar {movementType === 'income' ? 'Ingreso' : 'Gasto'}</DialogTitle>
                    </DialogHeader>
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <Input 
                            type='text' 
                            placeholder='Descripción' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <Input 
                            type='number' 
                            placeholder='Monto' 
                            value={amount || ''}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                        />
                        <ComboboxSelect 
                            options={
                                categories.map((category) => ({ 
                                    label: category.name, 
                                    value: category.id 
                                }))
                            } 
                            value={category} 
                            onChange={setCategory} 
                            emptyMessage="No hay categorías" 
                            placeholder="Selecciona una categoría" 
                        />
                        <DatePicker
                            date={date}
                            onChange={setDate}
                            label="Fecha"
                            className="w-full"
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
                                type='submit' 
                                className={`${movementType === 'income' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Agregando...' : `Agregar ${movementType === 'income' ? 'Ingreso' : 'Gasto'}`}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}