const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');

router.get('/', ensureAdmin, adminController.getAdminDashboard);
router.post('/assign-role', ensureAdmin, adminController.assignRole);

module.exports = router;
