const express = require('express');
const router = express.Router();
const recycleController = require('../recycles/recycleController')

router.get('/', recycleController.getListRecycle);




module.exports = router;