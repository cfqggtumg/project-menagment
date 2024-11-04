import express from 'express';
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).send(error);
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { username, role } = req.body;
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).send({ error: 'Rol no encontrado' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        username, 
        role: userRole._id 
      },
      { new: true }
    ).populate('role');

    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    
    res.send(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).send(error);
  }
});

// Mantener las rutas existentes de registro y login
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).send({ error: 'Role not found' });
    }
    const user = new User({ username, password, role: userRole._id });
    await user.save();
    const populatedUser = await User.findById(user._id).populate('role');
    res.status(201).send(populatedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('role');
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;