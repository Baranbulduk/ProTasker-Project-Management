// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const findTaskId = require('../middleware/findTaskId');

// Hämta alla uppgifter
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta en specifik uppgift
router.get('/:id', findTaskId, async (req, res) => {
  res.json(res.task);
});

// Skapa en ny uppgift
router.post('/', async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    deadline: req.body.deadline,
    assignedTo: req.body.assignedTo,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera en specifik uppgift
router.patch('/:id', findTaskId, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);

// Update a specific task status
router.patch('/:id/status', findTaskId, async (req, res) => {
  try {
    res.task.status = req.body.status;
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort en specifik uppgift
router.delete('/:id', findTaskId, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
