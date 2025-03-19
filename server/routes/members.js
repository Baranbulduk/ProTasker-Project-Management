// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
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

// Hämta en specifik medlem (endast admin och manager)
router.get('/:id', authenticateToken, findMemberId, isManager, async (req, res) => {
  res.json(req.member);
});

// Skapa en ny medlem (endast admin och manager)
router.post('/', authenticateToken, isManager, async (req, res) => {
  const member = new Member({
    memberName: req.body.memberName,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
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