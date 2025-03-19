// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const findTaskId = require('../middleware/findTaskId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');

// Hämta alla uppgifter
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta en specifik uppgift (endast projekt som användaren har tillgång till)
router.get('/:id', authenticateToken, findTaskId, isEmployer, async (req, res) => {
  if (req.user.role === 'manager' && req.task.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only access their own tasks.' });
  }
  if (req.user.role === 'employer' && !req.task.assignedTo.includes(req.user.id)) {
    return res.status(403).json({ message: 'Access denied. Employers can only access tasks assigned to them.' });
  }
  res.json(req.task);
});

// Skapa en ny uppgift (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    description: req.body.description,
    deadline: req.body.deadline,
    assignedTo: req.body.assignedTo,
    creator: req.user.id, // Lägg till skaparen av uppgiften
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Uppdatera en specifik uppgift (endast manager och admin)
router.patch('/:id', authenticateToken, findTaskId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.task.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only update their own tasks.' });
  }

  if (req.body.name != null) {
    req.task.name = req.body.name;
  }
  if (req.body.description != null) {
    req.task.description = req.body.description;
  }
  if (req.body.deadline != null) {
    req.task.deadline = req.body.deadline;
  }
  if (req.body.assignedTo != null) {
    req.task.assignedTo = req.body.assignedTo;
  }

  try {
    const updatedTask = await req.task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera en specifik uppgifts status (endast manager och admin)
router.patch('/:id/status', authenticateToken, findTaskId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.task.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only update their own tasks.' });
  }

  req.task.status = req.body.status;

  try {
    const updatedTask = await req.task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort en specifik uppgift (endast manager och admin)
router.delete('/:id', authenticateToken, findTaskId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.task.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only delete their own tasks.' });
  }

  try {
    await req.task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;