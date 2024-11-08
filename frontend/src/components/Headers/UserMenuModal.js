import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/UserMenuModal.css';

const UserMenuModal = ({ onClose }) => {
  const [user, setUser] = useState({ name: '', role: '', profilePicture: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:9000/api/users/${userData._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        `http://localhost:9000/api/users/${userData._id}/profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUser(response.data);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error al subir la foto:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="user-menu-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="profile-picture">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="profile-picture-input"
          />
          <label htmlFor="profile-picture-input">
            <img 
              src={user.profilePicture || '/default-avatar.png'} 
              alt="Perfil" 
              className="profile-img cursor-pointer"
              title="Haz clic para cambiar la foto"
            />
          </label>
          {selectedFile && (
            <button 
              onClick={handleUpload}
              className="upload-button"
            >
              Guardar foto
            </button>
          )}
        </div>
        <div className="user-info">
          <p className="user-name">{user.username}</p>
          <p className="user-role">{user.role?.name}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserMenuModal;