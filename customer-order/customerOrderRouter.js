const express = require('express');
const router = express.Router();
const sellProductController = require('../customer-order/customerOrderController')


// router.get('/', function(req, res, next) {
//       res.render('admins/customer-order');
//     });

router.get('/', sellProductController.getOrderList);
//router.post('/:id', sellProductController.addToOrder);
router.post('/:id', sellProductController.updateStatus);


module.exports = router;