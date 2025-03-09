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
const taskSchema_1 = __importDefault(require("../schema/taskSchema"));
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskSchema_1.default.find();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: tasks });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.getAllTask = getAllTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params || {};
        const task = yield taskSchema_1.default.findById(id);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ data: task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body || {};
        const task = new taskSchema_1.default({ title, description, status });
        yield task.save();
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'created task!', data: task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params || {};
        const { title, description, status } = req.body || {};
        const task = yield taskSchema_1.default.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: 'updated task!', data: task });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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