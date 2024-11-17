import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    description: String,
    taskType: {
        type: String,
        enum: ['PBI', 'Bug'],
        default: 'PBI'
    },
    order: Number,
    stage: {
        type: String,
        enum: ['Requested', 'To do', 'In Progress', 'Done'],
        default: 'Requested'  // Aseguramos que toda nueva tarea tenga este estado
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Añadir este campo
    index: Number,
    attachment: [
        { type: String, url: String }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    task: [taskSchema]
}, { timestamps: true });

// Middleware para asegurar que las nuevas tareas tengan stage = 'Requested'
taskSchema.pre('save', function(next) {
    if (this.isNew && !this.stage) {
        this.stage = 'Requested';
    }
    this.updated_at = Date.now();
    next();
});

// Middleware para manejar actualizaciones
taskSchema.pre('findOneAndUpdate', function(next) {
    this._update.updated_at = Date.now();
    if (this.isNew && !this._update.stage) {
        this._update.stage = 'Requested';
    }
    next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;