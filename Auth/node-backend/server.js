const express = require('express')
const mongoose= require('mongoose');
const router = express.Router()
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const connectMongooseDB = require('./db');
const createCollections = require('./createCollections');
require('dotenv').config()

const verify = require('./middleware/verify') 
//Routers
const appointmentRouter = require('./routes/appointmentRoutes')

const medicationRouter = require('./routes/medicationRoutes')

const doctorRouter = require('./routes/doctorRoutes')

const patientRouter = require('./routes/patientRoute')

const medicalInfoRouter = require('./routes/medicalInfoRoutes')

const testRouter = require('./routes/testRoute')

const nativeRouter = require('./routes/nativeRoutes')

const userRouter = require('./routes/userRoutes')

let URL;
if (process.env.NODE_ENV == 'production') {
    URL = "https://clinicflow-sigma-puce.vercel.app"
  }else{
    URL = "http://localhost:5173"
           
  }

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: URL,
    credentials: true,
    
}))


app.use('/api/native', nativeRouter)
app.use('/api/appointments', verify,appointmentRouter)
app.use('/api/medications', verify,medicationRouter)
app.use('/api/doctors',verify,  doctorRouter)
app.use('/api/patients',verify,  patientRouter)
app.use('/api/medicalInfo',verify,  medicalInfoRouter)
app.use('/api/tests',verify,  testRouter)
app.use('/api/user',verify, userRouter)






//undone


app.listen("8000",() => {
    console.log('Server connected at 8000')
})
mongoose.connection.once("open", () => {
    console.log("Connected to Mongodb")
})
connectMongooseDB()
// createCollections()