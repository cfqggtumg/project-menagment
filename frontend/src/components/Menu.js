import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

const Menu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex`}>
      <div className={`menu bg-gray-800 text-white ${isCollapsed ? 'w-16' : 'w-64'} h-full fixed transition-width duration-300`}>
        <div className="p-4">
          <button onClick={toggleMenu} className="text-white mb-4">
            <div className="hamburger-icon">
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
          <h2 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Menú</h2>
          <ul className={`mt-4 ${isCollapsed ? 'hidden' : 'block'}`}>
            {routes.map((route, index) => (
              <li key={index} className="mb-2">
                <Link to={route.path} className="text-white hover:text-gray-400">
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`ml-${isCollapsed ? '16' : '64'} transition-margin duration-300`}>
        {/* Aquí va el contenido principal */}
      </div>
    </div>
  );
};

export default Menu;