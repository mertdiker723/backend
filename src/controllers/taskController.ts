import { Request, Response } from "express"

// Schema
import Task from "../schema/taskSchema";

// Lib
import { tokenAccess } from "../lib/tokenVerify";

export const getAllTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const decoded = await tokenAccess(req, res);
        if (!decoded) return;
        const tasks = await Task.find();

        return res.status(200).json({ data: tasks });
    } catch (error) {

    }
}

export const getTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const decoded = await tokenAccess(req, res);
        if (!decoded) return;

        const { id } = req.params || {};

        const task = await Task.findById(id);
        if (decoded?.isAdmin) {
            return res.status(200).json({ data: task });
        }

        if (task?.userId !== decoded?.id) {
            return res.status(401).json({ message: "Unauthorized access!!" });
        }

        return res.status(200).json({ data: task });

    } catch (error) {
        return res.sendStatus(400);
    }
}

export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const decoded = await tokenAccess(req, res);
        if (!decoded) return;

        const { title, description, status } = req.body || {};
        const task = new Task({ title, description, status, userId: decoded?.id });
        await task.save();

        return res.status(201).json({ message: 'created task!', data: task });
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const decoded = await tokenAccess(req, res);
        if (!decoded) return;

        const { id } = req.params || {};
        const { title, description, status } = req.body || {};
        const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });

        return res.status(200).json({ message: 'updated task!', data: task });
    } catch (error) {
        return res.sendStatus(400);
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const decoded = await tokenAccess(req, res);
        if (!decoded) return;

        const { id } = req.params || {};
        const task = await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: 'deleted task!', data: task });
    } catch (error) {
        return res.sendStatus(400);
    }
}



