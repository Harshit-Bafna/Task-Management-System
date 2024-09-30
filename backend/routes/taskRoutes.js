const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, getTaskSummaryReport, searchTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.patch('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);
router.get('/search', authMiddleware, searchTasks);
router.get('/report', authMiddleware, getTaskSummaryReport);

module.exports = router;
