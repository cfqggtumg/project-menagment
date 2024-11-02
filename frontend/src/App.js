// frontend/src/App.js
import React, { useState } from 'react';
import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";
import Menu from './components/Menu';
import Dashboard from './views/Dashboard';
import Main from './views/Main'; // Importa el nuevo componente


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');

    const elements = document.querySelectorAll('.bg-white, .bg-dark');
    elements.forEach(element => {
      if (darkMode) {
        element.classList.remove('bg-dark');
        element.classList.add('bg-white');
      } else {
        element.classList.remove('bg-white');
        element.classList.add('bg-dark');
      }
    });
  };

  console.log('render app..')
  return (
    <div>
      <div>
        <Menu />
      </div>
      <div className="ml-64">
        <AppLayout>
          <Toaster
            position="top-right"
            gutter={8}
          />
          <button onClick={toggleDarkMode} className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Cambiar Modo
          </button>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:projectId" element={<Task />} />
            <Route path="/main" element={<Main />} />
              
            <Route path="/" element={
              <div className="flex flex-col items-center w-full pt-10">
                <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
                <h1 className="text-lg text-gray-600">Select or create new project</h1>
              </div>
            } />
          </Routes>
        </AppLayout>
      </div>
    </div>
  );
}

export default App;