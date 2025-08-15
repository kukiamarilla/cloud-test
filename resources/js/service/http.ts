import axios from "axios";

export const http = axios.create({
    baseURL: '/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export const setAuthTokenToHeader = (token: string) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthTokenFromHeader = () => {
    delete http.defaults.headers.common['Authorization'];
};