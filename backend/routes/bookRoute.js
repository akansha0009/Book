const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");
const bookController = require('../controller/bookController')

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

router.post('/add-book',checkAuth ,multer({storage: store}).single("image"), bookController.addBook)

module.exports = router;