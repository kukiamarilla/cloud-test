import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input";
import { listCategories } from "@/service/categories";
import { MultiSelect } from "../ui/multiselect";
import { Category } from "@/model/category";
import { createGrouper } from "@/service/grouper";

export const AddGrouper = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createGrouper(name, categories.filter(c => selectedCategoriesIds.includes(c.id)));
    }
    useEffect(() => {
        const fetchCategories = async () => {
            let categories = await listCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);
    return (
        <div className='flex flex-row gap-4 items-stretch mb-5'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="hover:bg-slate-600">Agregar Agrupador</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Agrupador</DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <Input type="text" placeholder="Nombre del Agrupador" onChange={(e) => setName(e.target.value)} />
                        <MultiSelect 
                            options={categories.map((category) => ({ label: category.name, value: category.id }))} 
                            value={selectedCategoriesIds} 
                            onChange={(value) => {setSelectedCategoriesIds(value)}} 
                            emptyMessage="No hay categorías" 
                            placeholder="Selecciona las categorías" 
                        />
                        <Button type="submit">Agregar Agrupador</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}