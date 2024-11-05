import React from 'react';
import './Css/RoleModal.css'; // I

const modules = ['users', 'roles', 'projects']; // Lista de módulos

const RoleModal = ({ isOpen, onClose, roleData, setRoleData, handleSubmit }) => {
  if (!isOpen) return null;

  // Inicializar roleData.permissions si no está definido
  if (!roleData.permissions) {
    roleData.permissions = modules.map(module => ({
      module,
      read: false,
      write: false,
      edit: false,
      delete: false
    }));
  }

  const handlePermissionChange = (module, permission) => {
    const updatedPermissions = roleData.permissions.map(p => 
      p.module === module ? { ...p, [permission]: !p[permission] } : p
    );
    setRoleData({ ...roleData, permissions: updatedPermissions });
  };

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
          <table className="permissions-table">
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Leer</th>
                <th>Escribir</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {modules.map(module => (
                <tr key={module}>
                  <td>{module}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={roleData.permissions.find(p => p.module === module)?.read || false}
                      onChange={() => handlePermissionChange(module, 'read')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={roleData.permissions.find(p => p.module === module)?.write || false}
                      onChange={() => handlePermissionChange(module, 'write')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={roleData.permissions.find(p => p.module === module)?.edit || false}
                      onChange={() => handlePermissionChange(module, 'edit')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={roleData.permissions.find(p => p.module === module)?.delete || false}
                      onChange={() => handlePermissionChange(module, 'delete')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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