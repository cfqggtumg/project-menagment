import React from 'react';
import MainLayout from "../layouts/MainLayout";
import ErrorBoundary from '../components/ErrorBoundary';
import umgImage from '../assets/img/umg.png'; // Asegúrate de que la ruta a la imagen sea correcta



const Main = () => {
  return (
    <ErrorBoundary>
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <img src={umgImage} alt="UMG" className="w-1/3" />
          <h1 className="text-6xl font-bold">Bienvenidos</h1>
          <p className="text-xl">Proyecto Final Carlos Francisco Quiroa Garavito 090-06-1185</p>
        </div>
      </MainLayout>
    </ErrorBoundary>
  );
};

export default Main;