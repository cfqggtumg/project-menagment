import express from 'express';
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      console.log('Missing fields:', { username, password, role });
      return res.status(400).send({ error: 'All fields are required' });
    }
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      console.log('Role not found:', role);
      return res.status(400).send({ error: 'Role not found' });
    }
    const user = new User({ username, password, role: userRole._id });
    await user.save();
    res.status(201).send(user);
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