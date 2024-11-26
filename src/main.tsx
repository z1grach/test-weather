import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryProvider } from './app/providers';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
