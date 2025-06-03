const mongoose = require('mongoose')
const doctor = new mongoose.Schema({
    user_id : {ref: 'User', type:mongoose.Schema.Types.ObjectId},
    specialization : {type: String, required:true},
    department : {type: String, required:true}

})

module.exports = mongoose.model("doctor", doctor)