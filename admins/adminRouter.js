const express = require('express');
const router = express.Router();
const adminController = require('../admins/adminController.js')
const adminLogin = require('../login/loginController')

// router.post('/login', adminController.postAdminLogin);
router.get('/', adminController.getSumCharity);


module.exports = router;