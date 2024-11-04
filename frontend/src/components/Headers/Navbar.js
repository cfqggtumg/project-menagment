import React, { useState } from 'react';

/**
 * Componente de barra de navegación que incluye un interruptor para cambiar entre modo claro y oscuro.
 * @component
 * @returns {JSX.Element} Retorna un elemento div que contiene la barra de navegación con un botón para alternar el modo oscuro.
 * 
 * @example
 * <Navbar />
 * 
 * @description
 * Este componente implementa una barra de navegación con las siguientes características:
 * - Utiliza un estado para controlar el modo oscuro/claro
 * - Incluye un botón con emojis (🌞/🌜) para alternar entre modos
 * - Modifica dinámicamente las clases CSS de los elementos para aplicar los estilos correspondientes
 * - Se adapta automáticamente al modo seleccionado cambiando el fondo y otros elementos visuales
 */
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className={`bg-${darkMode ? 'dark' : 'white'} shadow h-14`}>
      <span onClick={toggleDarkMode} className="fixed top-4 right-4 cursor-pointer text-2xl">
        {darkMode ? '🌞' : '🌜'}
      </span>
    </div>
  );
}

export default Navbar;