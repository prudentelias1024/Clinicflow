const medicalInfo = require('../schema/medicalInfoSchema')


exports.get_medical_info = async(req,res) => {
     medicalInfo.find({
            user_id: req.user._id
        }, (err,medical_info) => {
            if(err){throw err}
            if(medical_info){
                res.send({status: 200,medical_info:medical_info[0]})
            } else{
              res.send({status:404})   
            }
        })
     

}

exports.post_medical_info = async(req,res) => {
    console.log('post body',req.body)
        medical_info = new medicalInfo({
                   user_id:req.body.patient_id,
                   specialist: req.user._id,
                    blood_pressure:req.body.blood_pressure ,
                   blood_sugar:req.body.blood_sugar ,
                   blood_group:req.body.blood_group,
                   genotype:req.body.genotype ,
                   cholesterol:req.body.cholesterol ,
                   pulse:req.body.pulse,
                   bmi:req.body.bmi ,
                   weight:req.body.weight ,
                   height:req.body.height,
                   temperature:req.body.temperature ,
                   current_medical_conditions:req.body.current_medical_conditions ,
                   previous_medical_conditions:req.body.previous_medical_conditions,
                   allergy:req.body.allergy ,
                   intolerance:req.body.intolerance
})
 medical_info.save()
res.send({"status": 200})
     

}

exports.put_medical_info = async(req,res) => {
       medical_info = medicalInfo.findOneAndReplace
        ({
                   user_id:req.body.patient_id,
                   specialist: req.user.user_id,
                    blood_pressure:req.body.blood_pressure ,
                   blood_sugar:req.body.blood_sugar ,
                   blood_group:req.body.blood_group,
                   genotype:req.body.genotype ,
                   cholesterol:req.body.cholesterol ,
                   pulse:req.body.pulse,
                   bmi:req.body.bmi ,
                   weight:req.body.weight ,
                   height:req.body.height,
                   temperature:req.body.temperature ,
                   current_medical_conditions:req.body.current_medical_conditions ,
                   previous_medical_conditions:req.body.previous_medical_conditions,
                   allergy:req.body.allergy ,
                   intolerance:req.body.intolerance
})
 medical_info.save()
res.send({"status": 200})
     

}