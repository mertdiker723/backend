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
exports.tokenAccess = exports.tokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenVerify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return decoded;
});
exports.tokenVerify = tokenVerify;
const tokenAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized access!!" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = yield (0, exports.tokenVerify)(token);
    if (!decoded || !(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
        return res.status(401).json({ message: "Invalid token!!" });
    }
    return decoded;
});
exports.tokenAccess = tokenAccess;
//# sourceMappingURL=tokenVerify.js.map