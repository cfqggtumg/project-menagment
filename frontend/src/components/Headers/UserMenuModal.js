// UserMenuModal.js
import React, { useEffect, useState } from 'react';
import '../Css/UserMenuModal.css';

const UserMenuModal = ({ onClose }) => {
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    // Lógica para obtener los datos del usuario loggeado
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Ajusta la URL según tu API
        const data = await response.json();
        setUser({ name: data.name, role: data.role });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Elimina el token de autenticación
    localStorage.removeItem('authToken');
    // Redirige a la página de inicio de sesión
    window.location.href = '/login';
  };

  return (
    <div className="user-menu-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="profile-picture">
          <img src="ruta/a/la/foto/perfil.jpg" alt="Perfil" className="profile-img" />
        </div>
        <div className="user-info">
          <p className="user-name">{user.name}</p>
          <p className="user-role">{user.role}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default UserMenuModal;