function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  }
  
  function isManager(req, res, next) {
  
    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Managers only.' });
    }
    next();
  }
  
  function isEmployer(req, res, next) {
    if (req.user.role !== 'employer' && req.user.role !== 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Employers only.' });
    }
    next();
  }
  
  module.exports = { isAdmin, isManager, isEmployer };