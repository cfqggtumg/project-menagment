import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  module: { type: String, required: true },
  read: { type: Boolean, default: false },
  write: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
});

const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;