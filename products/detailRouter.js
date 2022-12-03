const express = require('express');
const router = express.Router();
const productController = require('./productController')

router.get('/detail/:id', productController.getProductDetail);




module.exports = router;