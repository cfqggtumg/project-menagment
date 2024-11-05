// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ajusta la ruta según tu estructura de proyecto

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'Token no es válido' });
  }
};

export default authMiddleware;