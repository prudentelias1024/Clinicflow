const mongoose = require('mongoose')
const doctor = new mongoose.Schema({
    user_info : {ref: 'User', type:mongoose.Schema.Types.ObjectId},
    specialization : {type: String, required:true},
    department : {type: String, required:true},
    password : {type: String, required:true},
    email : {type: String, required:true},
})

module.exports = mongoose.model("doctor", doctor)