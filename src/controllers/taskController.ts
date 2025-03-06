import { Request, Response } from "express"
import Task from "../schema"



export const getAllTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const tasks = await Task.find();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: tasks });
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const getTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params || {};
        const task = await Task.findById(id);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: task });

    } catch (error) {
        return res.sendStatus(400);
    }
}

export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description, status } = req.body || {};
        const task = new Task({ title, description, status });
        await task.save();
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'created task!', data: task });
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params || {};
        const { title, description, status } = req.body || {};
        const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: 'updated task!', data: task });
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params || {};
        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: 'deleted task!' });
    } catch (error) {
        return res.sendStatus(400);
    }
}

