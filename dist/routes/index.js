"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// tasks
router.get('/api/alltask', taskController_1.getAllTask);
router.get('/api/task/:id', taskController_1.getTask);
router.post('/api/task', taskController_1.createTask);
router.put('/api/task/:id', taskController_1.updateTask);
router.delete('/api/task/:id', taskController_1.deleteTask);
// users
router.post('/api/user/register', userController_1.createUser);
router.post('/api/user/login', userController_1.loginUser);
exports.default = router;
//# sourceMappingURL=index.js.map