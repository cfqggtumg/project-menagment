import express from "express";
import userRoutes from './routes/user.js';
import roleRoutes from './routes/role.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import api from './routes/index.js'

dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_PATH);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connectToDatabase();

const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const app = express();

app.use(cors({ origin }));
app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas de usuario
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use(api);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});