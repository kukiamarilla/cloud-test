import './App.css';
import { NotificationProvider } from './contexts/notification-context';
import { ThemeProvider } from './contexts/theme-context';
import { AuthProvider } from './contexts/auth-context';
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/pages/register';
import { useAuth } from '@/contexts/auth-context';
import { Notifications } from './components/ui/notifications';
import { PwaInstallBanner } from './components/ui/pwa-install-banner';
import ForgotPassword from './components/pages/forgot-password';
import ResetPassword from './components/pages/reset-password';

const AppContent = () => {
    const { auth, loading } = useAuth();
    
    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <NotificationProvider>
            <Notifications />
            <PwaInstallBanner />
            <BrowserRouter basename="/app">
                <Routes>
                    <Route path="/" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
                    {/* Public routes */}
                    <Route path="/login" element={!auth ? <Login /> : <Navigate to="/dashboard" />} />
                    <Route path="/register" element={!auth ? <Register /> : <Navigate to="/dashboard" />} />
                    <Route path="/forgot-password" element={!auth ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
                    <Route path="/reset-password" element={!auth ? <ResetPassword /> : <Navigate to="/dashboard" />} />
                    {/* Private routes */}
                    <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </NotificationProvider>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <NotificationProvider>
                    <Notifications />   
                    <AppContent />
                </NotificationProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;