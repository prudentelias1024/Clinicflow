const express = require('express')
const router = express.Router()
const medicationController = require('../controllers/medicalInfoController.js')


router.get('',medicationController.get_medical_info)
router.post('',medicationController.post_medical_info)
router.put('',medicationController.put_medical_info)

module.exports = router