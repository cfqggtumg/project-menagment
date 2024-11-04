import React from 'react';

const RoleModal = ({ isOpen, onClose, roleData, setRoleData, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{roleData.id ? 'Editar Rol' : 'Crear Rol'}</h2>
        <form className="role-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Nombre del Rol"
            value={roleData.name}
            onChange={(e) => setRoleData({...roleData, name: e.target.value})}
          />
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;