const express = require('express');
const router = express.Router();
const controller = require('./profileController');
const isLoggedIn = require('../login/loginController').isLoggedIn;
// router.get('/', recycleController.getListRecycle);
router.get('/', isLoggedIn, controller.getProfile);
router.post('/update', isLoggedIn, controller.postProfile);
router.post('/change-password', isLoggedIn, controller.postUpdatePassword);

module.exports = router;