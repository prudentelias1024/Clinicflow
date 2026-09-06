const mongoose  = require("mongoose")


const connectMongooseDB = () => {
    let URL ;
    if(process.env.NODE_ENV !== 'production'){
    URL = process.env.MONGO_URI
    } else{
        URL = process.env.COMPASS_URI

}
    mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    },)
}
mongoose.set('strictQuery',true)

module.exports = connectMongooseDB