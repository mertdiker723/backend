import mongoose from "mongoose";
import IUser from "../model/userModel";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;