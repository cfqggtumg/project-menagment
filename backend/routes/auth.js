import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('role');
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;