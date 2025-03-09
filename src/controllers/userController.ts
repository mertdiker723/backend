import { Request, Response } from "express"
import bcrypt from "bcryptjs";

import User from "../schema/userSchema"
import { tokenCreation } from "../lib/tokenCreation";



export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userName, email, password } = req.body || {};

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ userName, email, password: hashedPassword, isAdmin: false });
        await user.save();

        const token = tokenCreation(user);

        return res.status(201).json({ message: 'user created!', token, data: user });
    } catch (error: unknown) {
        if ((error as any)?.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        return res.status(400).json({ message: 'Error creating user' });
    }
}


export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body || {};

        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = tokenCreation(user);

        return res.status(200).json({ message: 'Logged in!', token, data: user });
    } catch (error) {
        return res.status(400).json({ message: 'Error logging in' });
    }
}