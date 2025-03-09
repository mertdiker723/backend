import jwt from 'jsonwebtoken';

import IUser from "../model/userModel";

export const tokenCreation = (user: IUser) => {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    return token;
}
