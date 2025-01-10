const Data = require('../models/Data');
const { getUserRole } = require('../helpers/roleHelper');

exports.getDashboard = async (req, res) => {
  try {
    const data = await Data.find().populate('createdBy', 'name');
    const userRole = getUserRole(req.user);
    res.render('dashboard', { user: req.user, data, role: userRole, title: 'Dashboard' });
  } catch (err) {
    console.error(err);
    res.render('dashboard', { user: req.user, data: [], role: 'viewer', title: 'Dashboard' });
  }
};

exports.insertData = async (req, res) => {
  if (req.user.role === 'editor' || req.user.role === 'admin') {
    const newData = new Data({
      content: req.body.content,
      createdBy: req.user._id,
    });
    await newData.save();
  }
  res.redirect('/dashboard');
};

exports.modifyData = async (req, res) => {
  if (req.user.role === 'admin') {
    await Data.findByIdAndUpdate(req.params.id, { content: req.body.content });
  }
  res.redirect('/dashboard');
};
