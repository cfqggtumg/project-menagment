import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import './Css/UserAdmin.css';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ username: '', password: '', role: '' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.id) {
        await axios.put(`http://localhost:9000/api/users/${userData.id}`, userData);
      } else {
        await axios.post('http://localhost:9000/api/users/register', userData);
      }
      fetchUsers();
      setIsModalOpen(false);
      setUserData({ username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user) => {
    setUserData({ id: user._id, username: user.username, role: user.role.name });
    setIsModalOpen(true);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gestión de Usuarios</h1>
        <button onClick={() => {
          setUserData({ username: '', password: '', role: '' });
          setIsModalOpen(true);
        }}>Nuevo Usuario</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role?.name}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        setUserData={setUserData}
        roles={roles}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserAdmin;