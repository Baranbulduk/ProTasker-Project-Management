const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const findProjectId = require('../middleware/findProjectId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');

// Hämta alla projekt (endast admin)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const projects = await Project.find().populate({
      path: 'members',
      select: 'username email role', // Hämta endast relevanta fält
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämtar projekt som är tilldelade till den inloggade användaren (Användarbaserat: manager och employer)
router.get('/assigned', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'projects',
      populate: {
        path: 'members',
        select: 'username email role', // Hämta endast relevanta fält
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.projects);
  } catch (error) {
    console.error('Error fetching assigned projects:', error);
    res.status(500).json({ message: error.message });
  }
});

// Hämtar projekt som rollen har tillgång till (Rollbaserat: manager och employer)
router.get('/:id', authenticateToken, findProjectId, async (req, res) => {
  console.log("User ID:", req.user.id); // Logga användarens ID
  console.log("Project Members:", req.project.members);

  if (req.user.role === 'manager' && req.project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only access their own projects.' });
  }

  if (req.user.role === 'employer' && !req.project.members.includes(req.user.id)) {
    console.log("Is user a member:", req.project.members.includes(req.user.id));

    
    return res.status(403).json({ message: 'Access denied. Employers can only access projects assigned to them.' });
  }

  res.json(req.project);
});

// Skapa ett nytt projekt (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  const project = new Project({
    projectTitle: req.body.projectTitle,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate, 
    creator: req.user.id,
    members: [req.user.id]
  });

  try {
    const newProject = await project.save();

    // Lägg till projektet i användarens `projects`-lista
    await User.findByIdAndUpdate(req.user.id, { $push: { projects: newProject._id } });

    // Populera creator och members direkt innan du skickar tillbaka
    const populatedProject = await Project.findById(newProject._id).populate({
      path: 'creator',
      select: 'username email role',
    }).populate({
      path: 'members',
      select: 'username email role',
    });

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera ett specifikt projekt (endast manager och admin)
router.patch('/:id', authenticateToken, findProjectId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only update their own projects.' });
  }

  if (req.body.projectTitle != null) {
    req.project.projectTitle = req.body.projectTitle;
  }
  if (req.body.description != null) {
    req.project.description = req.body.description;
  }
  if (req.body.startDate != null) {
    req.project.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    req.project.endDate = req.body.endDate;
  }

  try {
    const updatedProject = await req.project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort ett specifikt projekt (endast manager och admin)
router.delete('/:id', authenticateToken, findProjectId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only delete their own projects.' });
  }

  try {
    await Task.deleteMany({ project_id: req.project._id });
    await Project.deleteOne({ _id: req.project._id });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;