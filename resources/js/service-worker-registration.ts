export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('SW registration failed:', error);
        });
    });
  }
}