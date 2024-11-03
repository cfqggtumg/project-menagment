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

export default router;