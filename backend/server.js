// server.js
import express from "express";
import userRoutes from './routes/user.js';
import roleRoutes from './routes/role.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import api from './routes/index.js';
import multer from 'multer';
import path from 'path';
import testCaseRoutes from './routes/testCaseRoutes.js';
import defectRoutes from './routes/defectRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import runTestRoutes from './routes/runTestRoutes.js'; // Importa las rutas de run tests

dotenv.config();

// Inicializar express
const app = express();
const PORT = process.env.PORT || 9000;

// Configuración de multer
const storage = multer.diskStorage({
  destination: './uploads/profiles/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conexión a la base de datos
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_PATH);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connectToDatabase();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use(api);
app.use('/api/test-cases', testCaseRoutes);
app.use('/api/defects', defectRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/run-tests', runTestRoutes); // Usa las rutas de run tests

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});