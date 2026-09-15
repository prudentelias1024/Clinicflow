const { Rewind } = require('lucide-react')
const appointment = require('../schema/appointmentSchema')


exports.get_patient_appointment = async(req,res) => {
    appointment.find({
        specialist: req.body.three_fa_id
    }, (err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        } else{
          res.send({status:404})   
        }
    })
 
}
exports.get_appointment = async(req,res) => {
    appointment.find({
        appointed_to: req.body.three_fa_id
    }, (err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        } else{
          res.send({status:404})   
        }
    })
 
}

exports.get_patient_done_appointment = async(req,res) => {
    now = Date.now()
    appointment.find({ appointed_to: req.user.user_id, appointment_end_time: {$lt: now}}).exec((err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        } else {
            res.send({status:404})
        }
    })

}

exports.doctor_done_appointment = async(req,res) => {
    now = Date.now()
    appointment.find({ specialist: req.user.user_id, appointment_end_time: {$lt: now}}).exec((err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        }else{
            res.send({status:404})
        }
    })
}

exports.get__upcoming_appointment = async(req,res) => {
    now = Date.now()
    appointment.find({ appointed_to: req.user._id, appointment_end_time: {$gt: now}}).populate('appointed_to').populate({
        path: 'specialist',
        populate: {
           path: 'user_info',
        }
    }).exec((err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        } else {
            res.send({status: 200})
        }
    })
    
}
exports.get_doctor_upcoming_appointment = async(req,res) => {
    now = Date.now()
    appointment.find({ specialist: req.user.user_id, appointment_end_time: {$gt: now}}).exec((err,appointments) => {
        if(err){throw err}
        if(appointments){
            res.send({status: 200,appointments:appointments})
        } else {
            res.send({status: 200})
        }
    })
    
}

exports.create_appointment = async(req,res) => {
    console.log(req.user)
    const {description,start_time,specialist_id} = req.body
    const new_appointment = new appointment({
     
        reason:description,
        appointment_start_time:start_time,
        appointed_to:req.user._id,
        specialist:specialist_id,
        appointment_status:'pending'
    })
    new_appointment.save((err,appointment) => {
        if(err){throw err}
        if(appointment){
            res.send({status:200,appointment:appointment})  
}

    })

}

exports.accept_appointment = async(req,res) => {
    const {appointment_id} = req.params.id
    console.log(appointment_id)
    appointment.findByIdAndUpdate(appointment_id, {appointment_status:'accepted'}, (err,appointment) => {
        if(err){throw err}
        if(appointment){
            res.send    ({status:200,appointment:appointment})
        } else {
            res.send({status:404})
        }
    })
}

exports.reject_appointment = async(req,res) => {
    const {appointment_id} = req.params.id
    appointment.findByIdAndUpdate(appointment_id, {appointment_status:'rejected'}, (err,appointment) => {
        if(err){throw err}
        if(appointment){
            res.send({status:200            ,appointment:appointment})                               
        } else {
            res.send({status:404})
        }
    })
}