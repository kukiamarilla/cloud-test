import { Auth } from '@/model/auth';

const AUTH_KEY = 'escama_auth';

export function saveAuth(auth: Auth) {
    try {
        const authString = JSON.stringify(auth);
        localStorage.setItem(AUTH_KEY, authString);
    } catch (error) {
        console.error('Error saving auth to localStorage:', error);
        throw error;
    }
}

export function loadAuth() {
    try {
        const auth = localStorage.getItem(AUTH_KEY);
        const parsedAuth = auth ? JSON.parse(auth) : null;
        const normalizedAuth = {
            ...parsedAuth,
            expiresAt: parsedAuth.expires_at
        };
        return normalizedAuth as Auth;
    } catch (error) {
        console.error('Error loading auth from localStorage:', error);
        return null;
    }
}

export function removeAuth() {
    try {
        localStorage.removeItem(AUTH_KEY);
    } catch (error) {
        console.error('Error removing auth from localStorage:', error);
    }
}

export function isTokenExpired(expiresAt: number | string) {
    const now = Date.now();
    // Convert string date to timestamp if needed
    const expiresTimestamp = typeof expiresAt === 'string' ? new Date(expiresAt).getTime() : expiresAt;
    const isExpired = now > expiresTimestamp;
    return isExpired;
}


export function clearLocalStorage() {
    try {
        localStorage.removeItem(AUTH_KEY);
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}