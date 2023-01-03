const express = require('express');
const router = express.Router();
const accountController = require('../account-list/accountListController')

router.get('/', accountController.getAccountList);
// router.get('/:fillter', accountController.getFillterAccountList);
router.post('/:name', accountController.banAccount);



module.exports = router;