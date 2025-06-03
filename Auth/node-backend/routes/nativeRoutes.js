const express = require('express')
const router = express.Router()
const nativeController = require('../controllers/nativeController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({storage:storage})

router.post('/login', nativeController.login)
router.post('/register', upload.single('profile_img'), nativeController.register)

module.exports = router 