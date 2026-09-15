const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    specialist : {ref: 'doctor', type:mongoose.Schema.Types.ObjectId},
    appointed_to : {ref: 'User', type:mongoose.Schema.Types.ObjectId},
    reason : {type: String, required:true},
    appointment_start_time : {type: Date, required:true},
    appointment_status: {type: 'String', required:true, default: 'pending'}
    
})

module.exports = mongoose.model("appointment", Appointment) 