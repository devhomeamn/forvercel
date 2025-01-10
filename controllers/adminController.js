const User = require('../models/User');

exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.render('admin', { user: req.user, users, title: 'Admin Panel' });
  } catch (err) {
    console.error(err);
    res.render('admin', { user: req.user, users: [], title: 'Admin Panel' });
  }
};

exports.assignRole = async (req, res) => {
  const { userId, role } = req.body;
  if (req.user.role === 'admin') {
    await User.findByIdAndUpdate(userId, { role });
  }
  res.redirect('/admin');
};
