import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// @ts-ignore
import logo from '../../../img/escama-logo.svg';
import { useTheme } from '../../contexts/theme-context';
import { ThemeToggle } from '../ui/theme-toggle';
import { LogoText } from '../ui/logo';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/notification-context';
import { Notifications } from '../ui/notifications';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password, () => {
            addNotification({
                type: 'success',
                title: '¡Inicio de sesión exitoso!',
                message: 'Bienvenido a escama.',
                duration: 3000
            });
            navigate('/dashboard');
        }).catch((error) => {
            console.error(error);
            addNotification({
                type: 'error',
                title: 'Error al iniciar sesión',
                message: 'Por favor, verifica tus credenciales e intenta nuevamente.',
                duration: 5000
            });
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            {/* Theme Toggle Button */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Logo/Brand Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                        <img 
                            src={logo} 
                            alt="escama logo" 
                            className={`w-32 h-32 ${theme === 'dark' ? 'invert' : ''}`} 
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-2" style={{position: 'relative'}}>
                            <span className="text-3xl font-bold text-foreground">escama</span>
                            <span className="text-sm text-muted-foreground" style={{position: 'absolute', bottom: '8px', left: 'calc(100% + 10px)'}}>v0.1.0</span>
                            <span style={{
                                position: 'absolute', 
                                bottom: '0px', 
                                left: "2px",
                                width: '13px',
                                height: '2px',
                                backgroundColor: '#11dd11',
                                content: '""',
                            }}/>
                            <span style={{
                                position: 'absolute', 
                                top: '8px', 
                                right: '2px',
                                width: '13px',
                                height: '2px',
                                backgroundColor: 'red',
                                content: '""',
                            }}/>
                        </div>
                        <p className="text-muted-foreground">Inicia sesión para continuar</p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background focus:bg-background"
                                    placeholder="Introduce tu correo electrónico"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-12 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background focus:bg-background"
                                    placeholder="Introduce tu contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-center">                        
                            <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                Olvidé mi contraseña
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                            <span className="flex items-center justify-center">
                                Iniciar sesión
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-muted-foreground">O continua con</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="w-full inline-flex justify-center py-2 px-4 border border-input rounded-xl shadow-sm bg-background text-sm font-medium text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>
                        <button className="w-full inline-flex justify-center py-2 px-4 border border-input rounded-xl shadow-sm bg-background text-sm font-medium text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="ml-2">GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            No tienes una cuenta?{' '}
                            <a href="/app/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                                Regístrate 
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        Al iniciar sesión, aceptas nuestros{' '}
                        <a href="#" className="text-primary hover:text-primary/80">Términos de servicio</a>
                        {' '}y{' '}
                        <a href="#" className="text-primary hover:text-primary/80">Política de privacidad</a>
                    </p>
                </div>
            </div>
        </div>
    );
}