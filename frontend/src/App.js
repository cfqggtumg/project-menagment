import React, { useEffect, useCallback, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import Dashboard from './views/Dashboard';
import Main from './views/Main';
import UserAdmin from './components/UserAdmin';
import RoleAdmin from './components/RoleAdmin';
import Login from './components/Login';
import Task from './components/Task'; // Asegúrate de importar Task si lo usas
import routes from './routes'; // Importa routes
import TestExecution from './components/TestExecution'; // Importa TestExecution
import DefectManagement from './components/DefectManagement'; // Importa DefectManagement
import Reports from './components/Reports'; // Importa Reports

function App() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isCollapsed, setIsCollapsed] = useState(false); // Define isCollapsed

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
            <Route
              path="/test-execution"
              element={
                <PrivateRoute>
                  <TestExecution />
                </PrivateRoute>
              }
            />
            <Route
              path="/defect-management"
              element={
                <PrivateRoute>
                  <DefectManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
          </Routes>
        </AppLayout>
      </div>
      <ul className={`mt-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        {routes.map((route, index) => (
            <li key={index} className="mb-2">
                <Link to={route.path} className="text-white hover:text-gray-400">
                    {route.name}
                </Link>
            </li>
        ))}
        <li className="mb-2">
            <Link to="/test-execution" className="text-white hover:text-gray-400">
                Ejecución de Pruebas
            </Link>
        </li>
        <li className="mb-2">
            <Link to="/defect-management" className="text-white hover:text-gray-400">
                Gestión de Defectos
            </Link>
        </li>
        <li className="mb-2">
            <Link to="/reports" className="text-white hover:text-gray-400">
                Reportes
            </Link>
        </li>
      </ul>
    </div>
  );
}

export default App;