import { Category } from "@/model/category";
import { Grouper } from "@/model/grouper";
import { Movement } from "@/model/movement";
import { http } from "./http";

export const listGrouper = async (): Promise<Grouper[]> => {
    const response = await http.get('/groupers');
    return response.data;
};

export const createGrouper = async (options: {name: string, categories: Category[]}) => {
    const response = await http.post('/groupers', { 
        name: options.name, 
        categories: options.categories.map(c => c.id) 
    });
    return response.data;
};

export const updateGrouper = async (options: {id: number, name: string, categories: Category[]}) => {
    const response = await http.put(`/groupers/${options.id}`, { 
        name: options.name, 
        categories: options.categories.map(c => c.id) 
    });
    return response.data;
};

export const deleteGrouper = async (id: number) => {
    const response = await http.delete(`/groupers/${id}`);
    return response.data;
};

export const getGrouper = async (id: number): Promise<Grouper> => {
    const response = await http.get(`/groupers/${id}`);
    return response.data;
};

export const listMovementsByGrouper = async (options: {grouperId: number, startDate?: string, endDate?: string}): Promise<Movement[]> => {
    const response = await http.get(`/groupers/${options.grouperId}/movements`, {
        params: {
            start_date: options.startDate,
            end_date: options.endDate
        }
    });
    return response.data;
};