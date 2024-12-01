import express from 'express';
import Defect from '../models/Defect.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const defects = await Defect.find();
    res.send(defects);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const defect = new Defect(req.body);
    await defect.save();
    res.status(201).send(defect);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;