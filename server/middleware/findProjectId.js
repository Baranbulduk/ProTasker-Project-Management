async function findProjectId(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.project = project;
  next();
}

module.exports = findProjectId;