import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loadAuth, isTokenExpired, removeAuth, saveAuth } from '../lib/auth-db';
import { Auth } from '@/model/auth';
import { login as loginService, logout as logoutService } from '../service/auth';
import { removeAuthTokenFromHeader, setAuthTokenToHeader } from '../service/http';

interface AuthContextType {
  auth: Auth | null;
  loading: boolean;
  login: (email: string, password: string, onSuccess?: () => void) => Promise<void>;
  logout: (onSuccess?: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      setAuthTokenToHeader(auth.token);
    } else {
      removeAuthTokenFromHeader();
    }
  }, [auth]);
  
  useEffect(() => {
    (async () => {
      try {
        const auth = loadAuth();
        
        if (auth) {
          // Handle both expires_at and expiresAt formats
          const expiresAt = auth.expiresAt;
          
          if (expiresAt && !isTokenExpired(expiresAt)) {
            setAuthTokenToHeader(auth.token);
            setAuth(auth);
          } else {
            setAuth(null);
            removeAuthTokenFromHeader();
            await removeAuth();
          }
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error('Error loading auth:', error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string, onSuccess?: () => void) => {
    try {
      const res = await loginService(email, password);
      
      if (!res) throw new Error('Credenciales inválidas');

      const data = res as Auth;
      saveAuth(data);
      setAuth(data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async (onSuccess?: () => void) => {
    try {
      if (auth) {
        await logoutService();
      }
      removeAuth();
      setAuth(null);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if the service call fails, clear local auth
      removeAuth();
      setAuth(null);
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [auth]);

  const value = {
    auth,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 