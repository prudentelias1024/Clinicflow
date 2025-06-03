const mongoose = require('mongoose')
const user = new mongoose.Schema({
     full_name:{type:String, required:true},
     dob: {type:Date, required:true},

    phone_no: {type:String, required: true},
    profile_img:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    password:{type:String, required:true},
    enrolled_face:{type:Boolean, default: () => false},
    enrolled_fingerprint:{type:Boolean, default: () => false},
    three_fa_id:{type: String, default: () => ''},
    assigned_specialist:{type: String, default: () => ''},
    

})
module.exports = mongoose.model("User", user)

