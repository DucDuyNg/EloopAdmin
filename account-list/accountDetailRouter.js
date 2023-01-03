const express = require('express');
const router = express.Router();
const accountListController = require('./accountListController')
console.log('...............')
router.get('/:account', accountListController.getAccountDetail);




module.exports = router;