const User = require('../schema/UserSchema')
const jwt = require('jsonwebtoken')
module.exports =  verify = (req,res,next) => {
    res.setHeader("Access-Control-Allow-Credentials","true")
    const token = req.headers.authorization
    if(token){
      
     jwt.verify(token,process.env.SECRET_KEY, (err,user) => {
        if(err){res.status(401).json("Token is invalid")}
            if(user){
                User.findOne({email: user}).exec((err,userDoc) => {
                    if(err){throw err} 
                     if(userDoc){
                        req.user = userDoc;
                        next();
                     } else {
                        res.status(403).json("You are not authenticated")
                     }
                    
                })
            } 
        })
    } else {
        res.status(403).json("You are not authenticated")
    }
}
