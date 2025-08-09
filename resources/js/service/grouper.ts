import { Category } from "@/model/category";
import { Grouper } from "@/model/grouper";
import { Movement } from "@/model/movement";
import axios from "axios";

export const listGrouper = async (): Promise<Grouper[]> => {
    const response = await axios.get('/api/groupers');
    return response.data;
};

export const createGrouper = async (name: string, categories: Category[]) => {
    const response = await axios.post('/api/groupers', { name, categories: categories.map(c => c.id) });
    return response.data;
};

export const listMovementsByGrouper = async (grouperId: number, startDate: string|null, endDate: string|null): Promise<Movement[]> => {
    const response = await axios.get(`/api/groupers/${grouperId}/movements`, {
        params: {
            start_date: startDate,
            end_date: endDate
        }
    });
    return response.data;
};