import mongoose from 'mongoose';
import Role from '../models/Role.js';
import dotenv from 'dotenv';

dotenv.config();

const addAdminPermissions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_PATH);

    const adminRole = await Role.findOne({ name: 'Admin' });

    if (!adminRole) {
      console.error('Rol Admin no encontrado');
      process.exit(1);
    }

    const modules = ['users', 'roles', 'projects']; // Lista de módulos

    const permissions = modules.map(module => ({
      module,
      read: true,
      write: true,
      edit: true,
      delete: true
    }));

    adminRole.permissions = permissions;
    await adminRole.save();

    console.log('Permisos actualizados para el rol Admin');
    process.exit(0);
  } catch (error) {
    console.error('Error actualizando permisos para el rol Admin:', error);
    process.exit(1);
  }
};

addAdminPermissions();