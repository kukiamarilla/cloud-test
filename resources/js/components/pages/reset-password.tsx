import { useState } from 'react';
import { Lock, ArrowRight, Mail } from 'lucide-react';
import { resetPassword } from '@/service/auth';
import { useNotification } from '@/contexts/notification-context';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addNotification({ type: 'warning', title: 'Atención', message: 'Las contraseñas no coinciden.', duration: 4000 });
      return;
    }
    try {
      setSubmitting(true);
      await resetPassword(email, password, confirmPassword);
      addNotification({ type: 'success', title: 'Listo', message: 'Tu contraseña fue restablecida.', duration: 4000 });
    } catch (error) {
      addNotification({ type: 'error', title: 'Error', message: 'No se pudo restablecer la contraseña.', duration: 5000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl p-8 border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Restablecer contraseña</h1>
        <p className="text-sm text-muted-foreground mb-6">Ingresa tu correo y la nueva contraseña.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Correo electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Nueva contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                placeholder="Nueva contraseña"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium text-foreground">Confirmar contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
                placeholder="Confirmar contraseña"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium hover:bg-primary/90 disabled:opacity-70"
          >
            <span className="flex items-center justify-center">
              Restablecer
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </button>
          <div className="text-center text-sm mt-2">
            <a href="/app/login" className="text-primary hover:text-primary/80">Volver al inicio de sesión</a>
          </div>
        </form>
      </div>
    </div>
  );
}

