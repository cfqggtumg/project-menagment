import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleModal from './RoleModal';
import './Css/RoleAdmin.css';

const RoleAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleData, setRoleData] = useState({ name: '' });

  useEffect(() => {
    fetchRoles();
  }, []);

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
      if (roleData.id) {
        await axios.put(`http://localhost:9000/api/roles/${roleData.id}`, roleData);
      } else {
        await axios.post('http://localhost:9000/api/roles/role', { name: roleData.name });
      }
      fetchRoles();
      setIsModalOpen(false);
      setRoleData({ name: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (role) => {
    setRoleData({ id: role._id, name: role.name });
    setIsModalOpen(true);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gestión de Roles</h1>
        <button onClick={() => {
          setRoleData({ name: '' });
          setIsModalOpen(true);
        }}>Nuevo Rol</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre del Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role._id}>
              <td>{role.name}</td>
              <td>
                <button onClick={() => handleEdit(role)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleData={roleData}
        setRoleData={setRoleData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RoleAdmin;