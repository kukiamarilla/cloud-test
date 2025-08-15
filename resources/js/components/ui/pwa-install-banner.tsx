import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './button';
import { X, Download } from 'lucide-react';

// Some browsers don't expose BeforeInstallPromptEvent types
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt: () => Promise<void>;
}

const DISMISS_KEY = 'pwa_install_dismissed_at';
const DISMISS_COOLDOWN_DAYS = 7;

function isIosSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  // Standalone detection for Safari iOS
  const isStandalone = (window.navigator as any).standalone === true;
  // Exclude in-app browsers if possible
  return isIOS && !isStandalone;
}

function isStandaloneMode(): boolean {
  if (typeof window === 'undefined') return false;
  const mq = window.matchMedia('(display-mode: standalone)').matches;
  const iosStandalone = (window.navigator as any).standalone === true;
  return mq || iosStandalone;
}

function shouldShowAgain(): boolean {
  // try {
  //   const ts = localStorage.getItem(DISMISS_KEY);
  //   if (!ts) return true;
  //   const dismissedAt = parseInt(ts, 10);
  //   if (Number.isNaN(dismissedAt)) return true;
  //   const diffDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  //   return diffDays >= DISMISS_COOLDOWN_DAYS;
  // } catch {
  //   return true;
  // }
  return true;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  const isIos = useMemo(() => isIosSafari(), []);

  useEffect(() => {
    if (isStandaloneMode()) {
      setVisible(false);
      return;
    }

    // iOS case: show instructions if not dismissed recently
    if (isIos) {
      if (shouldShowAgain()) setVisible(true);
      return;
    }

    // Android/Chromium case: capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (shouldShowAgain()) setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler as any);

    return () => window.removeEventListener('beforeinstallprompt', handler as any);
  }, [isIos]);

  const handleInstall = async () => {
    try {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setVisible(false);
          setDeferredPrompt(null);
        } else {
          // user dismissed; don't pester for a while
          localStorage.setItem(DISMISS_KEY, String(Date.now()));
          setVisible(false);
        }
      } else {
        // iOS: show instructions section only
        setVisible(true);
      }
    } catch {
      // In any failure, hide for cooldown
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
      setVisible(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-md bg-card border border-border shadow-xl rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-primary">
            <Download className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Añade escama a tu pantalla de inicio</p>
            {isIos ? (
              <p className="text-sm text-muted-foreground mt-1">
                En iPhone/iPad: toca el botón Compartir y luego «Agregar a pantalla de inicio».
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Instala nuestra app para una experiencia más rápida y sin barra de navegador.
              </p>
            )}
            {isIos && (
              <div className="mt-2 text-xs text-muted-foreground">
                Consejo: En Safari, el botón Compartir es el ícono cuadrado con una flecha hacia arriba.
              </div>
            )}
            <div className="mt-3 flex gap-2">
              {!isIos && (
                <Button size="sm" onClick={handleInstall}>
                  Instalar
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={handleClose}>
                No ahora
              </Button>
            </div>
          </div>
          <button onClick={handleClose} aria-label="Cerrar" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

