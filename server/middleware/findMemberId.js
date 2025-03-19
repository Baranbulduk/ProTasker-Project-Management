const Member = require('../models/Member'); // Ändra från Task till Member

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

  req.member = member; // Lägg till medlemmen i req-objektet
  next();
}

module.exports = findMemberId;