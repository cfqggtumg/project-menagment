import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  testPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'TestPlan', required: true },
  name: { type: String, required: true },
  description: String,
  steps: String,
  expectedResult: String,
  actualResult: String,
  status: { type: String, enum: ['Pending', 'Passed', 'Failed', 'Blocked'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
}, { timestamps: true });

const TestCase = mongoose.model('TestCase', testCaseSchema);
export default TestCase;