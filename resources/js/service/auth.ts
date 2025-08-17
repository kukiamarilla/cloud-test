import { User } from "@/model/user";
import { http } from "./http";

export const login = async (email: string, password: string) => {
    const response = await http.post('/login', { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await http.post('/logout');
    return response.data;
};

export const register = async (user: User) => {
    const response = await http.post('/register', user);
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await http.post('/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (email: string, password: string, password_confirmation: string) => {
    const response = await http.post('/reset-password', { email, password, password_confirmation });
    return response.data;
};