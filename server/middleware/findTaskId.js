const Task = require('../models/Task');

async function findTaskId(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  req.task = task; // Lägg till uppgiften i req-objektet
  next();
}

module.exports = findTaskId;