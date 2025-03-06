import express from 'express';
import { createTask, getAllTask, deleteTask, getTask, updateTask } from '../controllers/taskController';

const router = express.Router();

router.get('/api/task', getAllTask);
router.get('/api/task/:id', getTask);
router.post('/api/task', createTask);
router.put('/api/task/:id', updateTask);
router.delete('/api/task/:id', deleteTask);


export default router;