const express = require('express')
const router = express.Router()
const appointmentContoller = require('../controllers/appointmentController.js')

router.get('/my', appointmentContoller.get_patient_appointment)

router.get('/', appointmentContoller.get_appointment)

router.get('/done', appointmentContoller.get_patient_done_appointment)

router.get('/done/my', appointmentContoller.get_doctor_upcoming_appointment)

router.get('/upcoming', appointmentContoller.get__upcoming_appointment)

router.get('/upcoming/my', appointmentContoller.get_doctor_upcoming_appointment)


module.exports = router