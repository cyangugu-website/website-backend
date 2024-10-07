const express = require('express')

const router = express.Router();
const UserController = require('../controllers/user.controller')
const validateInput = require('../middlewares/validateInput')

router.post('/register', validateInput, UserController.createAccount);

router.post('/login', validateInput, UserController.loginUser);

// For uploading a profile picture
// router.post('/user/:id/profile-picture', userController.uploadProfilePicture)

module.exports = router;