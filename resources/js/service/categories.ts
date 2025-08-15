import { Category } from "@/model/category";
import { http } from "./http"; 

export const listCategories = async (): Promise<Category[]> => {
    const response = await http.get('/categories');
    return response.data;
};

export const createCategory = async (name: string) => {
    const response = await http.post('/categories', { name });
    return response.data;
};

export const updateCategory = async (options: {id: number, name: string}) => {
    const response = await http.put(`/categories/${options.id}`, { 
        name: options.name 
    });
    return response.data;
};

export const getCategory = async (id: number): Promise<Category> => {
    const response = await http.get(`/categories/${id}`);
    return response.data;
};

