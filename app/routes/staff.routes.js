const express = require('express')

const router = express.Router();

const staffController = require('../controllers/staff.controller')

router.post('/create',staffController.createStaff);

router.get('/all', staffController.getAllStaffMembers);

// Pagination router
router.get('/staff', staffController.getStaff);

module.exports = router;