const doctor = require('../schema/doctorSchema')


exports.get_doctors = async(req,res) => {
    doctor.find().exec(err,doctors => {
        if(err){throw err}
        if(doctors){
            res.send({status: 200,doctors:doctors})
        } else {
            res.send({status:404})
        }
    })
}