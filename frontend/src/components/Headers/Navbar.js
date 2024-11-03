import React, { useState } from 'react';

const Navbar = () => {
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

  return (
    <div className={`bg-${darkMode ? 'dark' : 'white'} shadow h-14`}>
      <span onClick={toggleDarkMode} className="fixed top-4 right-4 cursor-pointer text-2xl">
        {darkMode ? '🌞' : '🌜'}
      </span>
    </div>
  );
}

export default Navbar;