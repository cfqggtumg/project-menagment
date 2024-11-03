import express from "express";
import userRoutes from './routes/user.js';
import roleRoutes from './routes/role.js';
import api from './routes/index.js'; // Asegúrate de importar las rutas de proyectos
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.listen(PORT, () => {
  console.log(`Your app is running in http://localhost:${PORT}`);
});