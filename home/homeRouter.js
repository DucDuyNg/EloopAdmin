const express = require('express');
const router = express.Router();
const homeController = require('../home/homeController')
/* GET users listing. */
router.get('/', homeController.getPartner);

module.exports = router;