const express = require('express');
const router = express.Router();
const productController = require('../products/productController.js')



router.get('/', productController.getListProduct);
router.get('/:expore', productController.getListProductQueryParam);


// router.get('/detail/:id', productController.getProductDetail);

// router.get('/', productController.getListProduct);
// router.post('/', productController.getListProduct);


module.exports = router;