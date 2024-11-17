import express from 'express';
import joi from 'joi';
import mongoose from 'mongoose';
import Project from '../models/index.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 solicitudes por ventana
});

const api = express.Router();

api.get('/projects', async (_, res) => {
    try {
        const data = await Project.find({}, { task: 0, __v: 0, updatedAt: 0 });
        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.get('/project/:id', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ error: true, message: 'Id is required' });
    try {
        const data = await Project.find({ _id: new mongoose.Types.ObjectId(req.params.id) }).sort({ order: 1 });
        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.post('/project', async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().optional(),
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(422).send({ error: true, message: error.message });
    }

    try {
        const project = new Project(req.body);
        const data = await project.save();
        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.put('/project/:id', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ error: true, message: 'Id is required' });

    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().optional(),
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(422).send({ error: true, message: error.message });
    }

    try {
        const data = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.delete('/project/:id', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ error: true, message: 'Id is required' });

    try {
        const data = await Project.findByIdAndDelete(req.params.id);
        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.get('/project/:id/task/:taskId', async (req, res) => {
    if (!req.params.id || !req.params.taskId) return res.status(422).send({ error: true, message: 'Id and TaskId are required' });

    try {
        let data = await Project.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $project: {
                    task: {
                        $filter: {
                            input: "$task",
                            as: "task",
                            cond: {
                                $in: [
                                    "$$task._id",
                                    [new mongoose.Types.ObjectId(req.params.taskId)]
                                ]
                            }
                        }
                    }
                }
            }
        ]);

        if (data[0].task.length < 1) return res.status(404).send({ error: true, message: 'Task not found' });
        res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.post('/project/:id/task', async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().optional(),
        taskType: joi.string().valid('PBI', 'Bug').default('PBI'),
        assignedTo: joi.string().optional() // Añadir este campo
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(422).send({ error: true, message: error.message });
    }

    try {
        const newTask = {
            ...req.body,
            _id: new mongoose.Types.ObjectId(),
            stage: 'Requested',
            order: Date.now()
        };

        let data = await Project.findByIdAndUpdate(
            req.params.id,
            { $push: { task: newTask } },
            { new: true }
        );

        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.put('/project/:id/task/:taskId', async (req, res) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().optional(),
        taskType: joi.string().valid('PBI', 'Bug').default('PBI'),
        assignedTo: joi.string().optional() // Añadir este campo
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(422).send({ error: true, message: error.message });
    }

    try {
        let data = await Project.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(req.params.id),
                'task._id': new mongoose.Types.ObjectId(req.params.taskId)
            },
            {
                $set: {
                    'task.$.title': req.body.title,
                    'task.$.description': req.body.description,
                    'task.$.taskType': req.body.taskType,
                    'task.$.assignedTo': req.body.assignedTo, // Añadir este campo
                    'task.$.updated_at': Date.now()
                }
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).send({ error: true, message: 'Task not found' });
        }

        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.put('/project/:id/todo', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ error: true, message: 'Id is required' });

    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send({ error: true, message: 'Project not found' });

        // Actualizar el estado y orden de las tareas
        Object.keys(req.body).forEach(key => {
            const column = req.body[key];
            column.items.forEach((task, index) => {
                const taskIndex = project.task.findIndex(t => t._id.toString() === task._id);
                if (taskIndex !== -1) {
                    project.task[taskIndex].stage = column.name;
                    project.task[taskIndex].order = index;
                }
            });
        });

        await project.save();
        return res.send(project);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

api.delete('/project/:id/task/:taskId', async (req, res) => {
    if (!req.params.id || !req.params.taskId) return res.status(422).send({ error: true, message: 'Id and TaskId are required' });

    try {
        let data = await Project.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    task: { _id: new mongoose.Types.ObjectId(req.params.taskId) }
                }
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).send({ error: true, message: 'Task or Project not found' });
        }

        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: error.message });
    }
});

export default api;