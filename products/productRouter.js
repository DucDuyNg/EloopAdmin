const express = require('express');
const router = express.Router();
const productController = require('../products/productController.js')



router.get('/', productController.getListProduct);
router.get('/:expore', productController.getListProductQueryParam);

//router.get('/:expore', productController.showUpdateProduct)
//router.get('/', productController.showAddProduct);
//router.post('/', productController.addNewProduct);

//router.get('/', productController.showUpdateProduct);
router.get('/update-product/:id', productController.showUpdateProduct);
module.exports = router;