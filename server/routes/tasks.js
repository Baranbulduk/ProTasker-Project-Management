// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const findTaskId = require('../middleware/findTaskId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');
const Project = require('../models/Project');



// IN PROGRESS //
// Hämta alla uppgifter för ett specifikt projekt (endast admin och manager)
router.get('/projects/:projectId/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ project_id: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Skapa en ny uppgift (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    description: req.body.description,
    deadline: req.body.deadline,
    assignedTo: req.body.assignedTo,
    creator: req.user.id,
    project_id: req.body.project_id
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
router.patch('/:id', authenticateToken, isManager, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.taskName != null) {
      task.taskName = req.body.taskName;
    }
    if (req.body.description != null) {
      task.description = req.body.description;
    }
    if (req.body.deadline != null) {
      task.deadline = req.body.deadline;
    }
    if (req.body.assigned_to != null) {
      task.assigned_to = req.body.assigned_to;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort en specifik uppgift (endast manager och admin)
router.delete('/:id', authenticateToken, isManager, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    // Ta bort uppgiften från projektet
    await Project.findByIdAndUpdate(task.project_id, { $pull: { tasks: task._id } });
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;