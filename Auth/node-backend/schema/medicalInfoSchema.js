const mongoose = require('mongoose')

const medicalInfo = new mongoose.Schema({
     specialist : {ref: 'doctor', type:mongoose.Schema.Types.ObjectId},
        user_id : {ref: 'user', type:mongoose.Schema.Types.ObjectId},
        blood_pressure : {type: String, required:true},
        blood_sugar : {type: String, required:true},
        blood_group : {type: String, required:true},
        appointment_start_time : {type: Date, required:true},
        genotype : {type: String, required:true},
        cholesterol : {type: String, required:true},
        pulse : {type: String, required:true},
        height : {type: String, required:true},
        bmi : {type: String, required:true},
        weight : {type: String, required:true},
        current_medical_conditions : {type: String, required:true},
        previous_medical_conditions : {type: String, required:true},
        allergy : {type: String, required:true},
        intolerance : {type: String, required:true},
        date_added:
      {type:Date, required:false},

       
})
    
    module.exports = mongoose.model("medicalInfo", medicalInfo)