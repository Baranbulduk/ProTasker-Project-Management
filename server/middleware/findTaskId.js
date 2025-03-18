const Task = require('../models/Porject');

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

  req.task = task;
  next();
}