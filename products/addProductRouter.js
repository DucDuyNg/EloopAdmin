const express = require('express');
const router = express.Router();
const productController = require('../products/productController')

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'Images')
  },
  filename:(req, file, cb) =>{
    console.log(file)
    cb(null, Data.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage:storage})
// app.get("/upload_image",(req,res) => {
//   //res.render()
// });
router.post("/upload_image", upload.single("image"), (req,res) =>{
  res.send("Image Uploaded");
})


router.get('/', productController.showAddProduct);
router.post('/', productController.addNewProduct);




module.exports = router;