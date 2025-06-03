const test = require('../schema/testSchema')

exports.get_user_test =async(req,res) =>{
  test.find({patient: req.user.three_fa_id }).exec((err,tests) => {
    if(err){throw err}
    if(tests){
        res.send({status: 200,tests:tests})
    }
  })
}

exports.post_user_test = async(req,res) => {
  let new_test = new test({
            patient:req.body.patient_id,
            specialist:req.body.specialist_id,
            type:req.body.type,
            lab_note:req.body.lab_note,
            taken_at:req.body.taken_at,
            status:req.body.status,
            taken_on:req.body.taken_on,
            released_on:req.body.released_on,
            file:req.body.file

  })

  await new_test.save()
  res.send({"status":200})
}


exports.get_doctor_test = async(req,res) => {
    test.find({
        specialist: req.user._id
    }).exec((err,tests) => {
        if(err){throw err}
        if(tests){
            res.send({status:200,tests:tests})
        }
            
    })
}