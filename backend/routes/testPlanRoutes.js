import express from 'express';
import TestPlan from '../models/TestPlan.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const testPlan = new TestPlan(req.body);
    await testPlan.save();
    res.status(201).send(testPlan);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const testPlans = await TestPlan.find().populate('projectId');
    res.send(testPlans);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const testPlan = await TestPlan.findById(req.params.id).populate('projectId');
    if (!testPlan) return res.status(404).send();
    res.send(testPlan);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const testPlan = await TestPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testPlan) return res.status(404).send();
    res.send(testPlan);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const testPlan = await TestPlan.findByIdAndDelete(req.params.id);
    if (!testPlan) return res.status(404).send();
    res.send(testPlan);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;