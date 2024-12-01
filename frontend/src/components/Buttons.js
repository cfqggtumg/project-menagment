// src/components/Buttons.js
import React from 'react';
import './Css/Buttons.css'; // Crearemos este archivo después

export const BtnPrimary = ({ children, onClick, disabled, className = '' }) => (
  <button
    className={`btn-primary ${className}`}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);