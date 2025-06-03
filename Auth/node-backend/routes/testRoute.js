const express = require('express')
const router = express.Router()
const testController = require('../controllers/testController.js')

router.get('/',testController.get_user_test)
router.post('/',testController.post_user_test)
router.get('/my',testController.get_doctor_test)

module.exports = router