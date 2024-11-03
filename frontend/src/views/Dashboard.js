// frontend/src/views/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <>
    <div className="w-[220px]">
    <Sidebar />
  </div>
    <div className="flex flex-col items-center w-full pt-10">
      <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
      <h1 className="text-lg text-gray-600">Select or create new project</h1>
    </div>
    </>
  );
};

export default Dashboard;