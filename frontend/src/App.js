// frontend/src/App.js
import React from 'react';
import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import UserAdmin from './components/UserAdmin';  // Importa UserAdmin
import RoleAdmin from './components/RoleAdmin';  // Importa RoleAdmin
import Dashboard from './views/Dashboard';
import Main from './views/Main';


function App() {


  console.log('render app..')
  return (
    <div>
      <div className="ml-64">
        <AppLayout>
          <Toaster
            position="top-right"
            gutter={8}
          />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:projectId" element={<Task />} />
            <Route path="/" element={<Main />} />
            <Route path="/admin/users" element={<UserAdmin />} />
            <Route path="/admin/roles" element={<RoleAdmin />} />
          </Routes>
        </AppLayout>
      </div>
    </div>
  );
}

export default App;