const express = require('express');
const router = express.Router();
const productController = require('../products/productController')

router.get('/', productController.getListProduct);
router.get('/:expore', productController.getListProduct);
router.get('/detail/:id', productController.getProductDetail);




module.exports = router;