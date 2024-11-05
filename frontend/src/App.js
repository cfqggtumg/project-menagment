import React, { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import Dashboard from './views/Dashboard';
import Main from './views/Main';
import UserAdmin from './components/UserAdmin';
import RoleAdmin from './components/RoleAdmin';
import Login from './components/Login';
import Task from './components/Task'; // Asegúrate de importar Task si lo usas

function App() {
  const navigate = useNavigate();

  // Usar useCallback para memorizar la función
  const checkSession = useCallback(() => {
    const lastActivity = localStorage.getItem('lastActivity');
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (lastActivity && Date.now() - lastActivity > 600000) { // 10 minutos
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]); // Incluir navigate como dependencia

  useEffect(() => {
    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [checkSession]); // Incluir checkSession como dependencia

  // Actualizar lastActivity en cada interacción
  useEffect(() => {
    const handleActivity = () => {
      localStorage.setItem('lastActivity', Date.now());
    };
    
    document.addEventListener('click', handleActivity);
    return () => document.removeEventListener('click', handleActivity);
  }, []);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <div className="ml-64">
        <AppLayout>
          <Toaster position="top-right" gutter={8} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/:projectId"
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <UserAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/roles"
              element={
                <PrivateRoute>
                  <RoleAdmin />
                </PrivateRoute>
              }
            />
          </Routes>
        </AppLayout>
      </div>
    </div>
  );
}

export default App;