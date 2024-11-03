import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/UserAdmin.css'; // Importa los estilos CSS

const UserAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleRegister = async () => {
    try {
      console.log('Registering user with role:', role); // Agrega este console.log para depuración
      await axios.post('http://localhost:9000/api/users/register', { username, password, role });
      // Fetch users again or update state
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="user-admin-container">
      <form className="user-admin-form">
        <h2>Administración de Usuarios</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Selecciona un rol</option>
          {roles.map((role) => (
            <option key={role._id} value={role.name}>{role.name}</option>
          ))}
        </select>
        <button type="button" onClick={handleRegister}>Registrar</button>
      </form>
    </div>
  );
};

export default UserAdmin;