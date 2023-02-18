// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer=require("multer");
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./public/images/products")
    },
    filename:(req,file, cb)=>{
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});
const subirArchivo=multer({storage})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/',subirArchivo.single("image"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id',subirArchivo.single("image"), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
