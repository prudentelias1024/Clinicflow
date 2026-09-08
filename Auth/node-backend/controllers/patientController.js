const user = require('../schema/UserSchema')
const medical_info = require('../schema/medicalInfoSchema')
const mongoose = require('mongoose')

exports.patient_medical_info = async(req,res) => {
    user.find({
           user : req.params.id
    }, (err,patient) => {
        if(err){throw err}
        if(patient){
            medical_info.find({user_id: patient._id}).exec(err,medicalInfo => {

                res.send({status: 200,medical_info:medicalInfo})
            })
        } else{
          res.send({status:404})   
        }
    

    })


}

exports.get_my_patient = async(req,res) => {
    user.find({
           assigned_specialist : req.user._id
    }).exec((err,patients) => {
        if(err){throw err}
        if(patients){
            console.log(patients)
            res.send({status: 200,patients:patients})
        } else{
          res.send({status:404})   
        }
    

    })


}

exports.remove_patient = async(req,res) => {
    user.findOneAndUpdate({
           three_fa_id : req.body.user_id
    }, {assigned_specialist: null}, (err,patients) => {
        if(err){throw err}
        if(patients){
            res.send({status: 200})
        } else{
          res.send({status:404})   
        }
    

    })

}


exports.add_patient = async(req,res) => {
    const specialistId = mongoose.Types.ObjectId(req.user._id)
    console.log(specialistId)
    user.findOneAndUpdate({email : req.body.email

    }, {$set:{assigned_specialist: specialistId}},{new:true}, (err,patients) => {
        if(err){throw err}
        if(patients){
            res.send({status: 200})
        } else{
          res.send({status:404})   
        }
    

    })
}
exports.not_my_patient = async(req,res) => {

  user.find({
    $and: [
      { assigned_specialist: null},
      { email: { $ne: req.user.email } }
    ]
  }).exec((err,patients) => {
    if(err){throw err}
    if(patients){
        res.send({status: 200,patients:patients})
    }
  })
    



}


