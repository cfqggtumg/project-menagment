import mongoose from 'mongoose';
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_PATH);

    // Crear rol de administrador
    const adminRole = await Role.findOneAndUpdate(
      { name: 'admin' },
      {
        name: 'admin',
        permissions: [
          {
            module: 'users',
            read: true,
            write: true,
            edit: true,
            delete: true
          },
          {
            module: 'roles',
            read: true,
            write: true,
            edit: true,
            delete: true
          }
        ]
      },
      { upsert: true, new: true }
    );

    // Crear usuario admin
    const hashedPassword = await bcrypt.hash('admin', 10);
    await User.findOneAndUpdate(
      { username: 'admin' },
      {
        username: 'admin',
        password: '$2b$10$QLwGIHu9/XQDTnF1bbe9iubE91Be2KoHDVOhUppIAn01nrlunShQO',
        role: adminRole._id
      },
      { upsert: true }
    );

    console.log('Usuario admin creado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error creando usuario admin:', error);
    process.exit(1);
  }
};

createAdminUser();