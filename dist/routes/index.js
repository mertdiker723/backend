"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.get('/api/task', taskController_1.getAllTask);
router.get('/api/task/:id', taskController_1.getTask);
router.post('/api/task', taskController_1.createTask);
router.put('/api/task/:id', taskController_1.updateTask);
router.delete('/api/task/:id', taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=index.js.map