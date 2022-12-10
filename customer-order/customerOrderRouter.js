const express = require('express');
const router = express.Router();
//const recycleController = require('../recycles/recycleController')

// router.get('/', recycleController.getListRecycle);
router.get('/', function(req, res, next) {
      res.render('admins/customer-order');
    });



module.exports = router;