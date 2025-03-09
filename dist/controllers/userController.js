"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const tokenCreation_1 = require("../lib/tokenCreation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, isAdmin } = req.body || {};
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new userSchema_1.default({ userName, email, password: hashedPassword, isAdmin });
        yield user.save();
        const token = (0, tokenCreation_1.tokenCreation)(user);
        return res.status(201).json({ message: 'user created!', token, data: user });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        return res.status(400).json({ message: 'Error creating user' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body || {};
        const user = yield userSchema_1.default.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = (0, tokenCreation_1.tokenCreation)(user);
        return res.status(200).json({ message: 'Logged in!', token, data: user });
    }
    catch (error) {
        return res.status(400).json({ message: 'Error logging in' });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map