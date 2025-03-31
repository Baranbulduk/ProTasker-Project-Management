const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const findTaskId = require('../middleware/findTaskId');
const { isAdmin, isManager } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');
const mongoose = require('mongoose');

// Hämta alla uppgifter för ett specifikt projekt (endast admin och manager)
router.get('/', authenticateToken, isManager, async (req, res) => {
  try {
    const { project_id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: 'Invalid Project ID' });
    }

    const tasks = await Task.find({ project_id }).populate('assignedTo', 'username email role');
    res.json(tasks.length ? tasks : { message: 'No tasks found for this project' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Skapa en ny uppgift (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  try {
    const { taskName, description, status, assignedTo: username, project_id } = req.body;

    // Kontrollera att projektet finns
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let assignedTo = null;
    if (username) {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'User not found' });

      assignedTo = user._id;

      // Lägg till användaren i projektet om de inte redan är medlem
      if (!project.members.includes(user._id)) {
        project.members.push(user._id);
        await project.save();
      }

      // Lägg till projektet i användarens `projects`-lista om det inte redan finns
      if (!user.projects.includes(project_id)) {
        user.projects.push(project_id);
        await user.save();
      }
    }

    const newTask = await Task.create({
      taskName,
      description: description || '',
      status: status || 'Begin',
      assignedTo,
      project_id,
    });

    project.tasks.push(newTask._id);
    await project.save();

    if (assignedTo) {
      await User.findByIdAndUpdate(assignedTo, { $push: { tasks: newTask._id } });
    }

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tilldela en användare till ett projekt (endast manager)
router.post('/:projectId/assign', authenticateToken, isManager, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      user.projects.push(project._id);
      await user.save();
      await project.save();
    }

    res.status(200).json({ message: 'User assigned to project', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Uppdatera en specifik uppgift (endast manager och admin)
router.patch('/:id', authenticateToken, isManager, findTaskId, async (req, res) => {
  try {
    const { task } = req;
    const { taskName, description, status, assignedTo: newUsername } = req.body;

    if (taskName) {
      task.taskName = taskName;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }

    if (newUsername) {
      const newUser = await User.findOne({ username: newUsername });
      if (!newUser) return res.status(400).json({ message: 'User not found' });

      // Ta bort tasken från den tidigare användarens `tasks`-lista
      if (task.assignedTo) {
        await User.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } });
      }

      // Lägg till tasken i den nya användarens `tasks`-lista
      if (!newUser.tasks.includes(task._id)) {
        newUser.tasks.push(task._id);
        await newUser.save();
      }

      // Lägg till projektet i den nya användarens `projects`-lista om det inte redan finns
      if (!newUser.projects.includes(task.project_id)) {
        newUser.projects.push(task.project_id);
        await newUser.save();
      }

      task.assignedTo = newUser._id;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Employer uppdaterar sin egen status
router.patch('/:taskId', authenticateToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Kontrollera om den inloggade användaren är tilldelad tasken
    if (task.assignedTo.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to update this task' });
    }

    // Uppdatera statusen
    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: error.message });
  }
});

// Ta bort en specifik uppgift (endast manager och admin)
router.delete('/:id', authenticateToken, isManager, findTaskId, async (req, res) => {
  try {
    const { task } = req;
    if (task.assignedTo) {
      await User.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } });
    }

    await Project.findByIdAndUpdate(task.project_id, { $pull: { tasks: task._id } });
    await task.deleteOne();

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
