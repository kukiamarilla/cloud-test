import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { createCategory } from "@/service/categories";

export const AddCategory = () => {
    const [name, setName] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCategory(name);
    }
    return (
        <div className='flex flex-row gap-4 items-stretch mb-5'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="hover:bg-slate-600">Agregar Categoría</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar Categoría</DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <Input type="text" placeholder="Category Name" onChange={(e) => setName(e.target.value)} />
                        <Button type="submit">Agregar Categoría</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}