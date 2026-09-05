
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth   from './Component/Auth.jsx'
import './input.css'
import FaceRecogniton from './Component/Login/Face Recognition/faceRecognition.jsx';
import FaceEnroller from './Component/Login/Face Recognition/FaceEnroller.jsx';
import NativeLogin from './Component/Login/Native Authentication/NativeLogin.jsx';
import NativeRegistration from './Component/Login/Native Authentication/NativeRegistration.jsx';
import Dashboard from './Component/Dashboard.jsx';
import MedicalInfo from './Component/Dashboard/Medical Info/MedicalInfo.jsx';
import { useDispatch } from 'react-redux';
import { actions } from './store/index.js';
import Appointments from './Component/Dashboard/Appointment/Appointments.jsx';
import Settings from './Component/Dashboard/Settings.jsx';
import Doctors from './Component/Dashboard/Doctors.jsx';
import Tests from './Component/Dashboard/Medical Tests/Tests.jsx';
import AddTests from './Component/Dashboard/Medical Tests/AddTests.jsx';
import Medications from './Component/Dashboard/Medications/Medications.jsx';
import MedicalConditions from './Component/Dashboard/Conditions/MedicalConditions.jsx';
import axios from 'axios';
import { useEffect } from 'react';
import Logout from './Component/Logout.jsx';
import NativeLoginDoctor from './Component/Login/Native Authentication/NativeLoginDoctor.jsx';
import Patients from './Component/Dashboard/Patients.jsx';
import AddMedication from './Component/Dashboard/Medications/AddMedication.jsx';
import EditMedicalInfo from './Component/Dashboard/Medical Info/EditMedicalInfo.jsx';
import AddAppointment from './Component/Dashboard/Appointment/AddAppointment.jsx';
import Fingerprint from './Component/Login/Fingerprint/fingerprint.jsx';
import VerifyFingerprint from './Component/Login/Fingerprint/VerifyFingerprint.jsx';

import Homepage from './Homepage.jsx';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let url;
  const getUser = async() => {
    const res =  (await axios.get('http://localhost:8000/api/user',{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
      dispatch(actions.updateUser(res.user))
      navigate('/Dashboard')
   
     } 
     if(res.status == 403){
       navigate('/', {state: {message: 'You are not authenticated. Please login'}})
     } 
   
   
  }
  const getMedicalInfo = async() => {
    if(process.env.NODE_ENV == 'production'){
      url = "https://hrs-3fa.onrender.com"
      
      dispatch(actions.updateURL(url))
    }else{
      url = "http://localhost:8000"
      dispatch(actions.updateURL(url))
    }
    const res = await(await axios.get(`${url}/api/medicalInfo`, {headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    dispatch(actions.updateMedicalInfo(res.medical_info))
  }
   useEffect(() => {
    getMedicalInfo()
     getUser()
    },[])
  
  return (
 
    <div className="App">
      <Routes>

        <Route path='/' element={<Homepage/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/fingerprint/enrol' element={<Fingerprint/>} />
        <Route path='/fingerprint' element={<VerifyFingerprint/>} />
        <Route path='/faceRecognition' element={<FaceRecogniton/>} />
        <Route path='/faceRecognition/enrol' element={<FaceEnroller/>} />
        <Route path='/nativeLogin' element={<NativeLogin/>} />
        <Route path='/nativeLogin/doctor' element={<NativeLoginDoctor/>} />
        <Route path='/NativeRegistration' element={<NativeRegistration/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/Dashboard/MedicalInfo' element={<MedicalInfo/>} />
        <Route path='/Dashboard/Appointment' element={<Appointments/>} />
        <Route path='/Dashboard/addAppointment' element={<AddAppointment/>} />
        <Route path='/Dashboard/Settings' element={<Settings/>} />
        <Route path='/Dashboard/Doctors' element={<Doctors/>} />
        <Route path='/Dashboard/Patients' element={<Patients/>} />
        <Route path='/Dashboard/Medications' element={<Medications/>} />
        <Route path='/Dashboard/MedicalInfo/edit' element={<EditMedicalInfo/>} />
        <Route path='/Dashboard/AddMedication' element={<AddMedication/>} />
        <Route path='/Dashboard/Tests/AddTest' element={<AddTests/>} /> 
        <Route path='/Dashboard/Tests' element={<Tests/>} />
        <Route path='/Dashboard/Conditions' element={<MedicalConditions/>} />
      </Routes>
    </div>
  );
}

export default App;
