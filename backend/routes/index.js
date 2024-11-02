import express from 'express';
import joi from 'joi';
import mongoose from 'mongoose';
import Project from '../models/index.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

const api = express.Router();

api.get('/projects', async (_, res) => {
    try {
        const data = await Project.find({}, { task: 0, __v: 0, updatedAt: 0 });
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
});

api.get('/project/:id', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ data: { error: true, message: 'Id is required' } });
    try {
        const data = await Project.find({ _id: new mongoose.Types.ObjectId(req.params.id) }).sort({ order: 1 });
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
});

api.post('/project', async (req, res) => {
    // validate type 
    const project = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    // validation
    const { error, value } = project.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send({ error: true, message: 'Validation error' });

    // insert data 
    try {
        const data = await new Project(value).save();
        res.send({ data: { title: data.title, description: data.description, updatedAt: data.updatedAt, _id: data._id } });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(422).send({ data: { error: true, message: 'title must be unique' } });
        } else {
            return res.status(500).send({ data: { error: true, message: 'server error ' + e.code } });
        }
    }
});

api.put('/project/:id', async (req, res) => {
    // validate type 
    const project = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    // validation
    const { error, value } = project.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error);

    Project.updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { ...value }, { upsert: true }, (error, data) => {
        if (error) {
            res.status(500).send({ data: { error: true, message: 'An error occurred while updating the project' } });
        } else {
            res.send(data);
        }
    });
});

api.delete('/project/:id', async (req, res) => {
    try {
        const data = await Project.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

// task api   
api.post('/project/:id/task', async (req, res) => {
    if (!req.params.id) return res.status(422).send({ error: true, message: 'Id is required' });

    // validate type 
    const task = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    const { error, value } = task.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error);

    try {
        const project = await Project.find(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { "task.index": 1 }
        ).sort({ 'task.index': 1 });

        // Asegúrate de manejar el caso en que no se encuentre el proyecto
        if (project.length === 0) {
            return res.status(404).send({ error: true, message: 'Project not found' });
        }

        const projectTasks = project.length ? project[0].task : [];
        let countTaskLength = [projectTasks.length, projectTasks.length > 0 ? Math.max(...projectTasks.map(o => o.index)) : projectTasks.length];

        const data = await Project.updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $push: { task: { ...value, stage: "Requested", order: countTaskLength[0], index: countTaskLength[1] + 1 } } });
        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

api.get('/project/:id/task/:taskId', async (req, res) => {
    if (!req.params.id || !req.params.taskId) return res.status(422).send({ error: true, message: 'Id and TaskId are required' });

    try {
        let data = await Project.find(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            {
                task: {
                    $filter: {
                        input: "$task",
                        as: "task",
                        cond: {
                            $in: [
                                "$$task._id",
                                [
                                    new mongoose.Types.ObjectId(req.params.taskId)
                                ]
                            ]
                        }
                    }
                }
            }
        );

        if (data[0].task.length < 1) return res.status(404).send({ error: true, message: 'record not found' });
        return res.send(data);
    } catch (error) {
        return res.status(500).send(error);
    }
});

api.put('/project/:id/task/:taskId', async (req, res) => {
    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    const task = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    const { error, value } = task.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error);

    try {
        const data = await Project.updateOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: new mongoose.Types.ObjectId(req.params.taskId) } }
        }, { $set: { "task.$.title": value.title, "task.$.description": value.description } });
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
});

api.delete('/project/:id/task/:taskId', limiter, async (req, res) => {
    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    try {
        const data = await Project.updateOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $pull: { task: { _id: new mongoose.Types.ObjectId(req.params.taskId) } } });
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
});

api.put('/project/:id/todo', async (req, res) => {
    let todo = [];

    for (const key in req.body) {
        for (const index in req.body[key].items) {
            req.body[key].items[index].stage = req.body[key].name;
            todo.push({ name: req.body[key].items[index]._id, stage: req.body[key].items[index].stage, order: index });
        }
    }

    todo.map(async (item) => {
        await Project.updateOne({
            _id: new mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: new mongoose.Types.ObjectId(item.name) } }
        }, { $set: { "task.$.order": item.order, "task.$.stage": item.stage } });
    });

    res.send(todo);
});

export default api;