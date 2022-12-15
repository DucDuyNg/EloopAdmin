const express = require('express');
const router = express.Router();
const sellProductController = require('../customer-order/customerOrderController')


// router.get('/', function(req, res, next) {
//       res.render('admins/customer-order');
//     });

router.get('/', sellProductController.getSellProductList);
router.post('/:id', sellProductController.addToSellProduct);



module.exports = router;