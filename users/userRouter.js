const express = require('express');
const router = express.Router();
const userController = require('../users/userController.js')


/* GET users listing. */
router.get('/', userController.getUserLogin)
router.post('/login', userController.postUserLogin)
router.post('/signup', userController.postUserCreate)
// router.post('/change_password', userController.postUserChangePassword)

module.exports = router;
