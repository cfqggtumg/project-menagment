import express from 'express';
import TestCase from '../models/TestCase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const testCases = await TestCase.find();
    res.send(testCases);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const testCase = new TestCase(req.body);
    await testCase.save();
    res.status(201).send(testCase);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;