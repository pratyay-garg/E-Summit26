import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { AuthUserProvider } from './context/AuthUserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserProvider>
      <RouterProvider router={router} />
    </AuthUserProvider>
  </StrictMode>
)
