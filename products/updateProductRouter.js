const express = require('express');
const router = express.Router();
const productController = require('./productController')

router.get('/', productController.showUpdateProduct);
//router.post('/', productController.showUpdateProduct);
//router.get('/:expore/:id', productController.showUpdateProduct);
//router.post('/:expore', productController.showUpdateProduct);
//router.get('/', productController.updateProduct);
router.post('/', productController.updateProduct);




module.exports = router;