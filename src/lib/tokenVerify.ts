import { Request, Response } from "express"
import jwt from 'jsonwebtoken';



export const tokenVerify = async (token: string) => {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
}

export const tokenAccess = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized access!!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = await tokenVerify(token);

    if (!decoded || !decoded?.id) {
        return res.status(401).json({ message: "Invalid token!!" });
    }

    return decoded;
};