import { Request, Response } from "express"
import bcrypt from "bcryptjs";

import User from "../schema/userSchema"





export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userName, email, password } = req.body || {};

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ userName, email, password: hashedPassword, isAdmin: false });
        await user.save();
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'user created!', data: user });
    } catch (error: unknown) {
        if ((error as any)?.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        return res.status(400).json({ message: 'Error creating user' });
    }
}
