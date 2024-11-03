import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/RoleAdmin.css'; // Importa los estilos CSS

const RoleAdmin = () => {
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await axios.get('http://localhost:9000/api/roles');
        // setRoles(response.data); // Comentar o eliminar esta línea si no se usa
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    try {
      await axios.post('http://localhost:9000/api/roles/role', { name: roleName });
      // Fetch roles again or update state
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  return (
    <div className="role-admin-container">
      <form className="role-admin-form">
        <h2>Administración de Roles</h2>
        <input type="text" placeholder="Role Name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
        <button type="button" onClick={handleAddRole}>Agregar Rol</button>
      </form>
    </div>
  );
};

export default RoleAdmin;