"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCreation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenCreation = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
};
exports.tokenCreation = tokenCreation;
//# sourceMappingURL=tokenCreation.js.map