const express = require('express');
const router = express.Router();
const accountController = require('../account-list/accountListController')

router.get('/', accountController.getAccountList);




module.exports = router;