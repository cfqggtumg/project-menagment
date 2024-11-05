// Navbar.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import UserMenuModal from './UserMenuModal';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode');

    const elements = document.querySelectorAll('.bg-white, .bg-dark');
    elements.forEach(element => {
      if (newDarkMode) {
        element.classList.remove('bg-white');
        element.classList.add('bg-dark');
      } else {
        element.classList.remove('bg-dark');
        element.classList.add('bg-white');
      }
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`bg-${darkMode ? 'dark' : 'white'} shadow h-14 flex justify-between items-center px-4`}>
      <span onClick={toggleDarkMode} className="cursor-pointer text-2xl">
        {darkMode ? '🌞' : '🌜'}
      </span>
      <button onClick={toggleModal} className="preferences-icon">
        <FaUserCircle size={24} />
      </button>
      {isModalOpen && <UserMenuModal onClose={toggleModal} />}
    </div>
  );
}

export default Navbar;