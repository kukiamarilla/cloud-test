import axios from 'axios';

export const listMovements = async (options: { 
    page?: number, 
    per_page?: number,
    date_from?: string,
    date_to?: string,
    type?: string,
    category_id?: number,
    sort_by?: string,
    sort_order?: string,
}) => {
    const response = await axios.get('/api/movements', { params: options });
    return response.data;
};

export const getMovementStatistics = async (options: {
    date_from?: string,
    date_to?: string,
    category_id?: number,
}) => {
    const response = await axios.get('/api/movements/statistics', { params: options });
    return response.data;
};

export const createMovement = async (options: {
    description: string,
    amount: number,
    type: 'income' | 'expense',
    date: string,
    category_id: number,
}) => {
    const response = await axios.post('/api/movements', options);
    return response.data;
};

export const deleteMovement = async (id: number) => {
    const response = await axios.delete(`/api/movements/${id}`);
    return response.data;
};