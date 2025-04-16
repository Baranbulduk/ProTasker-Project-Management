const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authToken');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const { isAdmin, isManager } = require('../middleware/role');

router.get('/:projectId/members', authenticateToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(
            'members', // Populera medlemmar
            'username email role' // Välj vilka fält som ska inkluderas
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Hämta alla tasks för projektet och inkludera assignedTo
        const tasks = await Task.find({ project_id: req.params.projectId }).populate('assignedTo', 'username email role');

        // Extrahera användare från tasks
        const taskAssignedUsers = tasks
            .map((task) => task.assignedTo)
            .filter((user) => user !== null);

        // Kombinera medlemmar från projektet och användare från tasks
        const allMembers = [...project.members, ...taskAssignedUsers];

        // Ta bort dubbletter baserat på användarens _id
        const uniqueMembers = Array.from(
            new Map(allMembers.map((member) => [member._id.toString(), member])).values()
        );

        res.json(uniqueMembers);
    } catch (error) {
        console.error("Error fetching project members:", error);
        res.status(500).json({ message: error.message });
    }
});

// Lägg till en ny användare som medlem (endast admin och manager)
router.post('/add-member', authenticateToken, isManager, async (req, res) => {
    try {
        const { email, projectId } = req.body;

        // Kontrollera om användaren finns
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // manager får inte lägga till admin eller annan manager
        if (req.user.role === 'manager' && (user.role === 'admin' || user.role === 'manager')) {
            return res.status(403).json({ message: 'Managers can only add users with employer role' });
          }

        // Kontrollera om projektet finns
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Lägg till användaren som medlem i projektet om de inte redan är medlem
        if (!project.members.includes(user._id)) {
            project.members.push(user._id);
            await project.save();
        } else {
            return res.status(400).json({ message: 'User is already a member of this project' });
        }

        res.status(200).json({ message: 'Member added successfully', user });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ message: error.message });
    }
});

// Employers uppdaterar sin egen information
router.patch('/:memberId', authenticateToken, async (req, res) => {
    try {
        const { memberId } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(memberId, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: error.message });
    }
});

// Ta bort en medlem från ett projekt
router.delete('/:projectId/members/:memberId', authenticateToken, isManager, async (req, res) => {
    try {
        const { projectId, memberId } = req.params;

        // Kontrollera om projektet finns
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Ta bort medlemmen från projektets `members`-lista
        project.members = project.members.filter((member) => member.toString() !== memberId);
        await project.save();

        // Uppdatera alla tasks där medlemmen är tilldelad
        await Task.updateMany(
            { project_id: projectId, assignedTo: memberId },
            { $unset: { assignedTo: "" } } // Ta bort `assignedTo`-fältet
        );

        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        console.error('Error removing member:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;