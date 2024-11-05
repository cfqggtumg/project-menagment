import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

router.post('/role', async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.send(roles);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Nueva ruta PUT para actualizar un rol
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!role) {
      return res.status(404).send('Role not found');
    }
    res.send(role);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;