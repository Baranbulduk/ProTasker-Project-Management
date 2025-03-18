const Member = require('../models/Project');

async function findMemberId(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  req.member = member;
  next();
}