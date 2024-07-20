import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '../router.tsx';
import '../tailwind.css';
import AuthContextProvider from '../store/auth-context.tsx';

ReactDOM.createRoot(document.getElementById('vite-app')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>
);
