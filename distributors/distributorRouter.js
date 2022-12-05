const express = require('express');
const router = express.Router();
const distributorController = require('../distributors/distributorController')

router.get('/', distributorController.getListDistributor);

module.exports = router;