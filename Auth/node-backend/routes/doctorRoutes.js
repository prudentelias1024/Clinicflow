const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorsController.js')


router.get('/all',doctorController.get_doctors)

module.exports = router