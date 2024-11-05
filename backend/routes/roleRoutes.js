// roleRoutes.js
import express from 'express';
import Role from '../models/Role.js'; // Ajusta la ruta según tu estructura de proyecto

const router = express.Router();

// Ruta para actualizar un rol por ID
router.put('/roles/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!role) {
      return res.status(404).send({ error: 'Rol no encontrado' });
    }
    res.send(role);
  } catch (error) {
    console.error('Error actualizando el rol:', error);
    res.status(500).send({ error: 'Error del servidor' });
  }
});

export default router;