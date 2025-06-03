const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController.js')

router.get('/my', patientController.get_my_patient)
router.put('/my/remove', patientController.remove_patient)
router.put('/my/add', patientController.add_patient)
router.get('/all', patientController.not_my_patient)
router.get('/medicalInfo/:id', patientController.patient_medical_info)

module.exports = router

    