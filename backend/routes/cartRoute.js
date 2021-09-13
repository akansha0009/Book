const express = require("express");
const router = express.Router();
const cartController = require('../controller/cartController');
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const store = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid= MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid Mime Type');
        if(isValid){
            error=null;
        }
        cb(error,"./backend/images");
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, name+ '-' + Date.now()+ '.'+ext);
    }
});

router.get('/cart', cartController.getCart);

router.post('/cart', multer({storage: store}).single("image") ,cartController.postCart);

router.get('/delete-cart', cartController.deleteCart);

module.exports = router;