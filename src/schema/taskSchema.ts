import mongoose from "mongoose";
import ITask from "../model/taskModel";

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
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);

export default Task;