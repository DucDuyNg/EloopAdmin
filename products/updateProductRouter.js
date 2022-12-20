const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./productController')

router.use('/assets', express.static(path.resolve(__dirname + 'assets')));

// router.get('/*', (req, res)=>{
//      res.sendFile(path.resolve('www', 'up'));
// });
router.get(path.resolve('/'), productController.showUpdateProduct);
router.post('/', productController.updateProduct);






module.exports = router;