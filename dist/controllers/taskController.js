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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getAllTask = void 0;
// Schema
const taskSchema_1 = __importDefault(require("../schema/taskSchema"));
// Lib
const tokenVerify_1 = require("../lib/tokenVerify");
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, tokenVerify_1.tokenAccess)(req, res);
        if (!decoded)
            return;
        const tasks = yield taskSchema_1.default.find();
        return res.status(200).json({ data: tasks });
    }
    catch (error) {
    }
});
exports.getAllTask = getAllTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, tokenVerify_1.tokenAccess)(req, res);
        if (!decoded)
            return;
        const { id } = req.params || {};
        const task = yield taskSchema_1.default.findById(id);
        if (decoded === null || decoded === void 0 ? void 0 : decoded.isAdmin) {
            return res.status(200).json({ data: task });
        }
        if ((task === null || task === void 0 ? void 0 : task.userId) !== (decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
            return res.status(401).json({ message: "Unauthorized access!!" });
        }
        return res.status(200).json({ data: task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, tokenVerify_1.tokenAccess)(req, res);
        if (!decoded)
            return;
        const { title, description, status } = req.body || {};
        const task = new taskSchema_1.default({ title, description, status, userId: decoded === null || decoded === void 0 ? void 0 : decoded.id });
        yield task.save();
        return res.status(201).json({ message: 'created task!', task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, tokenVerify_1.tokenAccess)(req, res);
        if (!decoded)
            return;
        const { id } = req.params || {};
        const { title, description, status } = req.body || {};
        const task = yield taskSchema_1.default.findByIdAndUpdate(id, { title, description, status }, { new: true });
        return res.status(200).json({ message: 'updated task!', data: task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield (0, tokenVerify_1.tokenAccess)(req, res);
        if (!decoded)
            return;
        const { id } = req.params || {};
        const data = yield taskSchema_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: 'deleted task!', task: data });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map