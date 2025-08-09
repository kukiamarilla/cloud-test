import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './service-worker-registration';

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);

registerServiceWorker(); 