import { Category } from "@/model/category";
import axios from "axios";


export const listCategories = async (): Promise<Category[]> => {
    const response = await axios.get('/api/categories');
    return response.data;
};

export const createCategory = async (name: string) => {
    const response = await axios.post('/api/categories', { name });
    return response.data;
};

