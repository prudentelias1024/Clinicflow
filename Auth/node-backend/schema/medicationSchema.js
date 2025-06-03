const mongoose = require('mongoose')

const medication = new mongoose.Schema({
    prescribed_by : {ref: 'doctor', type:mongoose.Schema.Types.ObjectId},
    prescribed_to : {ref: 'user', type:mongoose.Schema.Types.ObjectId},
    name : {type: String, required:true},
    reason : {type: String, required:true},
    description : {type: String, required:true},
    possible_allergies : {type: String, required:true},
    type : {type: String, required:true},
    dosage : {type: String, required:true},
    created_on : {type: Date, required:true},

})


module.exports = mongoose.model("medication", medication)