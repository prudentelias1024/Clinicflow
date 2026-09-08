const User = require('../schema/UserSchema')
const Doc = require('../schema/doctorSchema')
const jwt = require('jsonwebtoken')
module.exports =  verify = (req,res,next) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    const token = req.headers.authorization
    if(token){
      
     jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err){res.status(401).json("Token is invalid")}
            if(user){
               Doc.findOne({email: user}).populate('user_info').exec((err,doc) => {
                    if(err){throw err} 
                     if(doc){
                        req.user = {...doc.toObject(), type: 'doctor'};
                       
                        next();
                     } else {
                          User.findOne({email: user}).exec((err,userDoc) => {
                    if(err){throw err} 
                     if(userDoc){
                        req.user = {...userDoc.toObject(), type: 'patient'};
                       
                        next();
                     } else {
                        res.status(403).json("You are not authenticated")
                     }
                    
                })
            
        }})
                       
                     }
                    
                })
           
              
    
    } else {
        res.status(403).json("You are not authenticated")
    }
}
