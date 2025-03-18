// IN PROGRESS //

const express = require('express');
const router = express.Router();
const Member = require('../models/Project');
const findMemberId = require('../middleware/findMemberId');

// Hämta alla medlemmar
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hämta en specifik medlem
router.get('/:id', findMemberId, async (req, res) => {
  res.json(res.member);
});

// Skapa en ny medlem
router.post('/', async (req, res) => {
  const member = new Member({
    name: req.body.name,
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

// Uppdatera en specifik medlem
router.patch('/:id', findMemberId, async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id
      , req.body, { new: true });
    res.json(updatedMember);
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);

// Ta bort en specifik medlem
router.delete('/:id', findMemberId, async (req, res) => {
  try {
    await res.member.remove();
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});