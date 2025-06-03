const medication = require('../schema/medicationSchema')


exports.get_patient_appointment = async(req,res) => {
    medication.find({
             prescribed_to: req.body.three_fa_id
    }, (err,medications) => {
        if(err){throw err}
        if(medications){
            res.send({status: 200,medications:medications})
        } else{
          res.send({status:404})   
        }
    

    })
}


exports.get_doctor_medication = async(req,res) => {
    medication.find({
             prescribed_by: req.body.three_fa_id
    }, (err,medications) => {
        if(err){throw err}
        if(medications){
            res.send({status: 200,medications:medications})
        } else{
          res.send({status:404})   
        }
    

    })
}
