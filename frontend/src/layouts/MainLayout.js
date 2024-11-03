// frontend/src/layouts/MainLayout.js
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
};

export default MainLayout;