const Task = require('../models/Task');
const User = require('../models/User');
const { generateCSVReport } = require('../utils/reportUtils');

const createTask = async (req, res) => {
    const { title, description, dueDate, status, priority, assignedTo } = req.body;
    const assignedBy = req.user.id;

    try {
        let taskAssignedTo = assignedBy;

        if (req.user.role === 'admin' && assignedTo) {
            const userExists = await User.findById(assignedTo);
            if (!userExists) return res.status(400).json({ error: 'Assigned user does not exist' });
            taskAssignedTo = assignedTo;
        }

        const task = new Task({
            title,
            description,
            dueDate,
            status,
            priority,
            assignedBy,
            assignedTo: taskAssignedTo
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTasks = async (req, res) => {
    try {
        const { status, priority, search } = req.query;  
        let filter = {
            $or: [{ assignedBy: req.user.id }, { assignedTo: req.user.id }]
        };

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (search) {
            filter.$or.push({ title: { $regex: search, $options: 'i' } });
            filter.$or.push({ description: { $regex: search, $options: 'i' } });
        }

        const tasks = await Task.find(filter)
            .select('title description dueDate status priority assignedBy assignedTo');

        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (req.user.role !== 'admin' && task.assignedBy.toString() !== req.user.id && task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        Object.keys(updates).forEach((update) => (task[update] = updates[update]));
        await task.save();

        res.json({ message: 'Task updated', task });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (
            req.user.role !== 'admin' && 
            task.assignedBy.toString() !== req.user.id
        ) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await Task.deleteOne({ _id: taskId });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const searchTasks = async (req, res) => {
    const { title } = req.query;

    let query = {
        $or: [{ assignedBy: req.user.id }, { assignedTo: req.user.id }]
    };

    if (title) {
        query.title = new RegExp(title, 'i'); 
    }

    try {
        const tasks = await Task.find(query)

        const formattedTasks = tasks.map(task => ({
            ...task,
            assignedBy: task.assignedBy.toString(), 
            assignedTo: task.assignedTo.toString()  
        }));

        res.json(formattedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTaskSummaryReport = async (req, res) => {
    try {
        const { format, status, startDate, endDate } = req.query;

        let query = {
            $or: [{ assignedBy: req.user.id }, { assignedTo: req.user.id }]
        };

        if (status) {
            query.status = status;
        }

        if (startDate && endDate) {
            query.dueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const tasks = await Task.find(query).select('title description dueDate status priority assignedBy assignedTo');

        if (format === 'csv') {
            const csvReport = generateCSVReport(tasks);
            res.header('Content-Type', 'text/csv');
            res.attachment('task_summary_report.csv');
            return res.send(csvReport);
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Server error generating report' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskSummaryReport,
    searchTasks
};
