// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const User = require('../models/User');
const Project = require('../models/Project');
const findMemberId = require('../middleware/findMemberId');
const { isAdmin, isManager, isEmployer } = require('../middleware/role');
const authenticateToken = require('../middleware/authToken');

// Hämta alla medlemmar (endast admin)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/:projectId/members', authenticateToken, isManager, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(
      'members', // Populera medlemmar
      'name email role' // Välj vilka fält som ska inkluderas
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project.members); // Returnera medlemmarna
  } catch (error) {
    console.error("Error fetching project members:", error);
    res.status(500).json({ message: error.message });
  }
});




// Skapa en ny medlem (endast admin och manager)
router.post('/', authenticateToken, isManager, async (req, res) => {
  try {
    // Leta upp användaren baserat på e-postadress
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kontrollera om projektet finns
    const project = await Project.findById(req.body.project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
  }

    // Kontrollera om användaren redan är medlem i projektet
    if (project.members.includes(user._id)) {
      return res.status(400).json({ message: 'User is already a member of this project' });
    }

    // Lägg till användaren till projektets medlemmar
    project.members.push(user._id);
    await project.save();

    res.status(200).json({ message: 'User added to the project', user });
  } catch (error) {
    console.error("Error adding user to project:", error);
    res.status(500).json({ message: error.message });
  }
});




// Uppdatera en specifik medlem (endast admin och manager)
router.patch('/:id', authenticateToken, findMemberId, isManager, async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ta bort en specifik medlem (endast admin och manager)
router.delete('/:id', authenticateToken, findMemberId, isManager, async (req, res) => {
  try {
    await req.member.remove();
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;