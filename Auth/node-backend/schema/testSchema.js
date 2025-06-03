const mongoose = require('mongoose')

const test = new mongoose.Schema({
        specialist : {ref: 'doctor', type:mongoose.Schema.Types.ObjectId},
        patient : {ref: 'user', type:mongoose.Schema.Types.ObjectId},

        type : {type: String, required:true},
        lab_note : {type: String, required:true},
        taken_at : {type: String, required:true},
        status : {type: String, required:true},
        taken_on : {type: Date, required:true},
        released_on : {type: Date, required:true},
        file : {type: String, required:true},
        
})

module.exports = mongoose.model("test", test)