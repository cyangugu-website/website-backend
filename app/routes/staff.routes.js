const express = require('express')
const path = require('path')
const router = express.Router();

const staffController = require(path.join(__dirname, '../controllers/staff.controller'))

router.post('/create',staffController.createStaff);

router.get('/all', staffController.getAllStaffMembers);

// Pagination router
router.get('/staff', staffController.getStaff);

module.exports = router;