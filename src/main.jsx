import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for offline market BOM caching
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('[PC_DOCx PWA] Service Worker registered with scope:', registration.scope);
      },
      (error) => {
        console.warn('[PC_DOCx PWA] Service Worker registration failed:', error);
      }
    );
  });
}
