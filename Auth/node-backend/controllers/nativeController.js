const User = require('../schema/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async(req,res) => {
  
        User.findOne({email: req.body.email}, (err,user) => {
            if(user){
            hashed_password = user.password
            if(bcrypt.compare(req.body.password, hashed_password)){
                console.log(user)
                  token = jwt.sign(user.email,process.env.SECRET_KEY)
                res.send({user:user, access_token: token})
            } else{
                  res.send({"passwordError": "Password Incorrect"})
            }
    
            } else {    
            res.send({status:404, emailError:'User does not exist'})
     
            }
        })
    
}


exports.register = async(req,res)=> {
    const password = await bcrypt.hash(req.body.password,8)
    User.findOne({email: req.body.email}, async(err,doc) => {
        console.log(doc)
        if(err){
            throw err
        }
        if(doc){
            res.send({message: "User Exists"})
        }
    if(!doc){
    const user = new User({
        password: password,
        full_name: req.body.full_name,
        email: req.body.email,
        dob: req.body.dob,
        phone_no: req.body.phone_no,
        gender: req.body.gender,
        address: req.body.address,
        phone_no: req.body.phone_no,
        profile_img: req.file.filename
        
    })
    await user.save()
    res.send({status: 200})
}
})
     
}



