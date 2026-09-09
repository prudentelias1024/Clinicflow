const Medication = require('../schema/medicationSchema')
const mongoose = require('mongoose')

exports.post_medication = async(req,res) => {
    console.log('post body',req.body)
        const medication = new Medication({
                   prescribed_to:req.body.doctor_id,
                   prescribed_by: req.user._id,
                   name:req.body.name ,
                   reason:req.body.reason ,
                   possible_allergies:req.body.possible_allergies,
                   description:req.body.description ,
                   created_on: new Date() ,
                   type:req.body.type,
                   dosage:req.body.dosage , 

})
 medication.save()
res.send({"status": 200})
     

}

exports.get_patient_appointment = async(req,res) => {
    Medication.find({
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
    console.log(req.user._id)
    const docId =new mongoose.Types.ObjectId(req.user._id)
    Medication.find({
             prescribed_by: docId
                }).populate('prescribed_to')
                .populate({
                    path: 'prescribed_by',
                    populate: {
                        path: 'user_info',
                    }
                }).exec((err,medications) => {
        if(err){throw err}
        if(medications){
                  console.log('Medications:', medications)
     
            res.send({status: 200,medications:medications})
            
        } else{
          res.send({status:404})   
        }
    

                })
}
