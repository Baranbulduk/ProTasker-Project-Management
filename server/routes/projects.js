/*const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const findProjectId = require('../middleware/findProjectId');

// Hämta alla projekt
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta ett specifikt projekt
router.get('/:id', findProjectId, (req, res) => {
  res.json(res.project);
});

// Skapa ett nytt projekt
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera ett specifikt projekt
router.patch('/:id', findProjectId, async (req, res) => {
  if (req.body.name != null) {
    res.project.name = req.body.name;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.project.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.project.endDate = req.body.endDate;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort ett specifikt projekt
router.delete('/:id', findProjectId, async (req, res) => {
  try {
    await Project.deleteOne({ _id: res.project._id });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;*/




const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const findProjectId = require('../middleware/findProjectId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');

// Hämta alla projekt (endast admin)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta ett specifikt projekt (endast projekt som användaren har tillgång till)
router.get('/:id', authenticateToken, findProjectId, isEmployer, async (req, res) => {
  if (req.user.role === 'manager' && req.project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only access their own projects.' });
  }
  if (req.user.role === 'employer' && !req.project.assignedTo.includes(req.user.id)) {
    return res.status(403).json({ message: 'Access denied. Employers can only access projects assigned to them.' });
  }
  res.json(res.project);
});

// Skapa ett nytt projekt (endast manager och admin)
router.post('/', authenticateToken, isManager, async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    creator: req.user.id, // Lägg till skaparen av projektet
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Uppdatera ett specifikt projekt (endast manager och admin)
router.patch('/:id', authenticateToken, findProjectId, isManager, async (req, res) => {
  if (req.user.role === 'manager' && req.project.creator.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Access denied. Managers can only update their own projects.' });
  }

  if (req.body.name != null) {
    res.project.name = req.body.name;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  if (req.body.startDate != null) {
    res.project.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.project.endDate = req.body.endDate;
  }

  try {
    const updatedProject = await res.project.save();
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
    await Project.deleteOne({ _id: res.project._id });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;