const Task = require('../models/Task');

async function findTaskId(req, res, next) {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: 'project_id',
      select: 'creator',
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    req.task = task;
    next();
  } catch (error) {
    console.error("Error in findTaskId middleware:", error); // Logga felet
    res.status(500).json({ message: error.message });
  }
}

module.exports = findTaskId;