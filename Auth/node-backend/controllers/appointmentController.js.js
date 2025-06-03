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
    appointment.find({ appointed_to: req.user.user_id, appointment_end_time: {$gt: now}}).exec((err,appointments) => {
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