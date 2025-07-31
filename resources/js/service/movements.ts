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

