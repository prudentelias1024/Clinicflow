const user = require('../schema/UserSchema')
const medical_info = require('../schema/medicalInfoSchema')


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
           assigned_specialist : req.body.user_id
    }, (err,patients) => {
        if(err){throw err}
        if(patients){
            res.send({status: 200,patients:patients})
        } else{
          res.send({status:404})   
        }
    

    })


}

exports.remove_patient = async(req,res) => {
    user.findOneAndReplace({
           three_fa_id : req.body.user_id
    },{assigned_specialist: None}, (err,patients) => {
        if(err){throw err}
        if(patients){
            res.send({status: 200})
        } else{
          res.send({status:404})   
        }
    

    })

}


exports.add_patient = async(req,res) => {
    user.findOneAndReplace({
           three_fa_id : req.body.user_id
    },{assigned_specialist: req.user.user_id}, (err,patients) => {
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
    assigned_specialist: '', three_fa_id: {$exclude: req.user.three_fa_id}}
  ).exec(err,patients => {
    if(err){throw err}
    if(patients){
        res.send({status: 200,patients:patients})
    }
  })
    



}


