const express = require('express');
const router = express.Router();
const customerOrderController = require('./customerOrderController')
console.log('...............')
router.get('/:id', customerOrderController.getOrderDetail);




module.exports = router;