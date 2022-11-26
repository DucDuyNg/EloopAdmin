const express = require('express');
const router = express.Router();
const adminController = require('../admins/adminController')

router.get('/', adminController.getSumCharity);
module.exports = router;