import mongoose from 'mongoose';

const testPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  requirementCoverage: String,
}, { timestamps: true });

const TestPlan = mongoose.model('TestPlan', testPlanSchema);
export default TestPlan;