const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, dashboardController.getDashboard);
router.post('/insert', ensureAuthenticated, dashboardController.insertData);
router.post('/modify/:id', ensureAuthenticated, dashboardController.modifyData);

module.exports = router;
