import { Category } from "@/model/category";
import { Grouper } from "@/model/grouper";
import { Movement } from "@/model/movement";
import axios from "axios";

export const listGrouper = async (): Promise<Grouper[]> => {
    const response = await axios.get('/api/groupers');
    return response.data;
};

export const createGrouper = async (options: {name: string, categories: Category[]}) => {
    const response = await axios.post('/api/groupers', { 
        name: options.name, 
        categories: options.categories.map(c => c.id) 
    });
    return response.data;
};

export const updateGrouper = async (options: {id: number, name: string, categories: Category[]}) => {
    const response = await axios.put(`/api/groupers/${options.id}`, { 
        name: options.name, 
        categories: options.categories.map(c => c.id) 
    });
    return response.data;
};

export const deleteGrouper = async (id: number) => {
    const response = await axios.delete(`/api/groupers/${id}`);
    return response.data;
};

export const getGrouper = async (id: number): Promise<Grouper> => {
    const response = await axios.get(`/api/groupers/${id}`);
    return response.data;
};

export const listMovementsByGrouper = async (options: {grouperId: number, startDate?: string, endDate?: string}): Promise<Movement[]> => {
    const response = await axios.get(`/api/groupers/${options.grouperId}/movements`, {
        params: {
            start_date: options.startDate,
            end_date: options.endDate
        }
    });
    return response.data;
};