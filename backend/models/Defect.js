import mongoose from 'mongoose';

const defectSchema = new mongoose.Schema({
  testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestCase', required: true },
  summary: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['New', 'Assigned', 'In Progress', 'Resolved', 'Closed'], default: 'New' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  severity: { type: String, enum: ['Minor', 'Major', 'Critical'], default: 'Minor' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Defect = mongoose.model('Defect', defectSchema);
export default Defect;