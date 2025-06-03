const express = require('express')
const router = express.Router()
const medicationController = require('../controllers/medicationController.js')

router.get('/my', medicationController.get_doctor_medication)
router.get('/', medicationController.get_patient_appointment)

module.exports = router