import React from 'react';

const UserModal = ({ isOpen, onClose, userData, setUserData, roles, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{userData.id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form className="user-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})}
          />
          {!userData.id && (
            <input 
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
            />
          )}
          <select 
            value={userData.role}
            onChange={(e) => setUserData({...userData, role: e.target.value})}
          >
            <option value="">Seleccionar Rol</option>
            {roles.map(role => (
              <option key={role._id} value={role.name}>{role.name}</option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;