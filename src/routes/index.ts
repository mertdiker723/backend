import express from 'express';
import { createTask, getAllTask, deleteTask, getTask, updateTask } from '../controllers/taskController';
import { createUser, loginUser } from '../controllers/userController';

const router = express.Router();

// tasks
router.get('/api/task', getAllTask);
router.get('/api/task/:id', getTask);
router.post('/api/task', createTask);
router.put('/api/task/:id', updateTask);
router.delete('/api/task/:id', deleteTask);

// users
router.post('/api/user/register', createUser);
router.post('/api/user/login', loginUser);

export default router;