const express = require('express');
const router = express.Router();
const charityController = require('../charities/charityController')

router.get('/', charityController.getListCharity);

module.exports = router;