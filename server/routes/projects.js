const express = require('express');
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

module.exports = router;