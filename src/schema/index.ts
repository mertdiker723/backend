import mongoose from "mongoose";
import ITask from "../model";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);

export default Task;