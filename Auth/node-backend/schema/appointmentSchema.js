const mongoose = require('mongoose')

const Appointment = new mongoose.Schema({
    specialist : {ref: 'doctor', type:mongoose.Schema.Types.ObjectId},
    appointed_to : {ref: 'user', type:mongoose.Schema.Types.ObjectId},
    description : {type: String, required:true},
    title : {type: String, required:true},
    appointment_start_time : {type: Date, required:true},
    appointment_end_time : {type: Date, required:true},
    appointment_status: {type: Boolean, required:true}
    
})

module.exports = mongoose.model("appointment", Appointment) 