const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const findTaskId = require('../middleware/findTaskId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');
const mongoose = require('mongoose');

// Hämta alla uppgifter för ett specifikt projekt (endast admin och manager)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { project_id } = req.query; // Hämta från query params
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: 'Invalid Project ID' });
    }

    const tasks = await Task.find({ project_id: new mongoose.Types.ObjectId(project_id) });

    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta en specifik uppgift med hjälp av findTaskId
router.get('/:id', authenticateToken, findTaskId, (req, res) => {
  res.json(req.task); // Returnera uppgiften som hittades av findTaskId
});

// Skapa en ny uppgift (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  let assignedTo = null;

  if (req.body.assignedTo) {
    const user = await User.findOne({ username: req.body.assignedTo });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    assignedTo = user._id;
  }

  const task = new Task({
    taskName: req.body.taskName,
    description: req.body.description || "",
    status: req.body.status || "Begin",
    assignedTo: assignedTo,
    project_id: req.body.project_id,
    notifications: req.body.notifications || []
  });

  try {
    const newTask = await task.save();
    await Project.findByIdAndUpdate(req.body.project_id, { $push: { tasks: newTask._id } });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera en specifik uppgift (endast manager och admin)
router.patch('/:id', authenticateToken, isManager, findTaskId, async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    if (req.body.taskName != null) {
      req.task.taskName = req.body.taskName;
    }
    if (req.body.description != null) {
      req.task.description = req.body.description;
    }
    if (req.body.status != null) {
      req.task.status = req.body.status;
    }
    
    // Hantera assignedTo (leta upp användare via username)
    if (req.body.assignedTo != null) {
      const user = await User.findOne({ username: req.body.assignedTo });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      req.task.assignedTo = user._id;
    }

    const updatedTask = await req.task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: error.message });
  }
});

// Ta bort en specifik uppgift (endast manager och admin)
router.delete('/:id', authenticateToken, isManager, findTaskId, async (req, res) => {
  try {
    await req.task.deleteOne();
    await Project.findByIdAndUpdate(req.task.project_id, { $pull: { tasks: req.task._id } });
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;