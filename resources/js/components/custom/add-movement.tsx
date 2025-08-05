import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { createMovement } from "@/service/movements"
import { Category } from "@/model/category"
import { listCategories } from "@/service/categories"
import { ComboboxSelect } from "../ui/combobox-select"
import { DatePicker } from "../ui/date-picker"

export const AddMovement = () => {
    const [movementType, setMovementType] = useState<'income' | 'expense'>('income');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<number | null>(null);
    const [date, setDate] = useState<Date>(new Date());

    const handleOpen = (movementType: 'income' | 'expense') => {
        setMovementType(movementType);
        listCategories().then((data) => {
            setCategories(data);
        });
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!category) {
            alert('Debes seleccionar una categoría');
            return;
        }
        createMovement({
            description,
            amount,
            type: movementType,
            date: date.toISOString().substring(0,10),
            category_id: category,
        });
    }
    return (
        <div className='flex flex-row gap-4 items-stretch mb-5'>
            <Dialog>
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
                            <Input type='text' placeholder='Descripción' onChange={(e) => setDescription(e.target.value)}/>
                            <Input type='number' placeholder='Monto' onChange={(e) => setAmount(Number(e.target.value))}/>
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
                            <Button type='submit' className={`${movementType === 'income' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                                Agregar {movementType === 'income' ? 'Ingreso' : 'Gasto'}
                            </Button>
                        </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}