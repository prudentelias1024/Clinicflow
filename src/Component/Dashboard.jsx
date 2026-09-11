import React , {useEffect, useState, } from 'react'
import SideNav from './Dashboard/SideNav'
import {useDispatch, useSelector} from 'react-redux'
import ProfileNavbar from './Dashboard/ProfileNavbar'
import { AiFillMail, AiOutlineClockCircle, AiOutlineHome, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import 'chart.js/auto'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FlaskConical,
  HeartPulse,
  Mail,
  Phone,
  Pill,
  Ruler,
  User,
  Weight,
  Building2, 
  Stethoscope
} from "lucide-react";
import {  GiMedicines } from 'react-icons/gi'
import human from '../human.jpg'
import humanHeart from '../heart.jpg'
import axios from 'axios'
import { actions } from '../store'
import { FaHospitalUser } from 'react-icons/fa'
import MyPatientHeader from './Patient/MyPatientHeader'
import AppointmentDone from './Dashboard/Appointment/AppointmentDone'
import MyPatient from './Patient/MyPatient.jsx'
import moment from 'moment'
import { PageHeader } from './Dashboard/DashboardShell.jsx'
export default function Dashboard() {
 
  const {currentUser, loading} = useSelector(state =>state)
  

  const URL = useSelector(state =>state.URL)
  const medicalInfo = useSelector(state => state.medical_info)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [patientsCount , setPatientsCount] = useState(null)
  const [patients , setPatients] = useState([])
  const [appointments , setAppointments] = useState([])
  const [doneAppointments , setDoneAppointments] = useState([])
  const [doneAppointmentsCount, setDoneAppointmentsCount] = useState(null)

  const [appointmentCount , setAppointmentsCount] = useState(null)
  const [testsCount , setTestsCount] = useState(null)
  const [tests , setTests] = useState([])
  const [medicationsCount , setMedicationsCount] = useState(null)
  const [medications , setMedications] = useState([])
   const getDoneAppointments = async() => {
        let url = ''
        if(currentUser && currentUser.type == 'doctor'){
          url = `${URL}/api/appointments/done/my`
         }else{
           url = `${URL}/api/appointments/done`
         }
        
        
        const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
        if(res.status === 200){
          setDoneAppointments(res.appointments)
          setDoneAppointmentsCount(res.appointments.length)
         } 
        }

  const getPatients = async() => {
    const res =  (await axios.get(`${URL}/api/patients/my`,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      setPatientsCount(res.patients.length)
      setPatients(res.patients)
     } 
     if(res.status == 404){
      setPatientsCount(0)
   }
  }
   const getAppointments = async() => {
    let url = ''
    if(currentUser && currentUser.type == 'patient'){
      url = `${URL}/api/appointments`

    }else {
      url = `${URL}/api/appointments/my`
    }
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      setAppointmentsCount(res.appointments.length)
      setAppointments(res.appointments)
    } 
     if(res.status == 404){
      setAppointmentsCount(0)
   }
  }
   
   const getMedications = async() => {
    let url = ''
    if(currentUser && currentUser.type =='patient'){
      url = `${URL}/api/medications`

    }else {
      url = `${URL}/api/medications/my`
    }
    
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      setMedicationsCount(res.medications.length)
      setMedications(res.medications)
     } 
     if(res.status == 404){
      setMedicationsCount(0)
   }
  }
   const getTests = async() => {
    let url = ''
    if(currentUser && currentUser.type == 'patient'){
      url = `${URL}/api/tests`

    }else {
      url = `${URL}/api/tests/my`
    }
    
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    if(res.status === 200){
      setTestsCount(res.tests.length)
      setTests(res.tests)
     } 
     if(res.status == 404){
    setTestsCount(0)
   }
  }
   const stats = [
  {
    label: "Upcoming appointments",
    value: appointments.length,
    icon: CalendarDays,
  },
  {
    label: "Past visits",
    value: doneAppointments.length,
    icon: Clock,
  },
  { label: "Test results", value: tests.length, icon: FlaskConical },
  {
    label: "Active medications",
    value: medications.filter((m) => m.active).length,
    icon: Pill,
  },
];

const vitals = [
  { label: "Blood pressure", value: `${medicalInfo ==  undefined || medicalInfo == null ? 'N/A' : medicalInfo.blood_pressure} mmHg` },
  { label: "Heart rate", value: `${medicalInfo == undefined || medicalInfo ==null ? 'N/A' : medicalInfo.pulse} bpm` },
  { label: "Cholesterol", value: `${medicalInfo == undefined || medicalInfo == null ? 'N/A' : medicalInfo.cholesterol} mg/dL` },
  { label: "Blood sugar", value: `${medicalInfo == undefined || medicalInfo ==null   ? 'N/A' : medicalInfo.blood_sugar} mg/dL` },
];

const body = [
  { label: "Weight", value: `${medicalInfo == undefined || medicalInfo ==null  ? 'N/A' : medicalInfo.weight} kg`, icon: Weight },
  { label: "Height", value: `${medicalInfo == undefined || medicalInfo == null ? 'N/A' : medicalInfo.height}`, icon: Ruler },
  { label: "BMI", value: `${medicalInfo == undefined || medicalInfo == null ? 'N/A' : Number(medicalInfo.bmi).toFixed(1)}`, icon: HeartPulse },
];

const profileFacts = [
  { label: "Gender", value: currentUser !== null ?currentUser.gender : '', icon: User },
  { label: "Date of birth", value:currentUser !== null  ? currentUser.dob : '', icon: CalendarDays },
  { label: "Email", value: currentUser !== null ? currentUser.email : '', icon: Mail },
  { label: "Phone", value: currentUser !== null ? currentUser.phone_no : '', icon: Phone },
];
 
const DocProfileFacts = [
  { label: "Gender", value: currentUser !== null && currentUser.user_info !== undefined  ? currentUser.user_info.gender : '', icon: User },  
   { label: "Department", value: currentUser !== null  ?currentUser.department : '', icon: Building2 },
    { label: "Specialization", value: currentUser !== null ?currentUser.specialization : '', icon: Stethoscope },
  { label: "Email", value: currentUser !== null && currentUser.user_info !== undefined ? currentUser.user_info.email : '', icon: Mail },
]
   useEffect(() => {
    //  getUser()
    // navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    //   stream.getTracks().forEach(track => {
    //     track.stop()
    //   })
    // })
    if(localStorage.getItem('access-token') == null){
      navigate('/nativeLogin')
    }
  
    console.log(medicalInfo)

    if(currentUser !== null){

      getAppointments()
      getDoneAppointments()
      getTests()
      getMedications()
      getPatients()
    }
    },[currentUser,appointmentCount, testsCount, medicationsCount, patientsCount])
    
     if(!loading){
      if(currentUser && currentUser.type == 'patient'){
    return (
      
    <div className='flex flex-row  font-[Outfit] bg-[#fafbfb] justify-between h-full'>
  <SideNav />
    <div className="animate-rise-in lg:ml-[17.5em] pt-[2em] lg:pt-[4em]">
      <PageHeader
        icon={HeartPulse}
        title={`Hello, ${ currentUser !==null  ? currentUser.full_name.split(" ")[0] : '' }`}
        description="Here is a snapshot of your health record at the Clinicflow."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="card-hover-lift rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-3xl font-bold text-foreground">
                {value}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Left column: profile + appointments */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Profile card */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {currentUser.full_name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {currentUser.full_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentUser._id} · Blood group {medicalInfo == undefined || medicalInfo ==null ? 'N/A' : medicalInfo.blood_group} ·{" "}
                  {medicalInfo == undefined || medicalInfo ==null ? 'N/A' : medicalInfo.genotype}
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profileFacts.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {label}
                    </p>
                    <p className="truncate text-sm font-bold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming appointments */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                Upcoming appointments
              </h2>
              <Link
                to="/dashboard/appointment"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground">
                      {appt.title}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {appt.specialization} · {appt.doctor}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {appt.date} · {appt.startTime} – {appt.endTime}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: vitals + lists */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">
              Heart vitals
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {vitals.map((v) => (
                <div
                  key={v.label}
                  className="rounded-xl bg-secondary p-4 text-center"
                >
                  <p className="text-xs font-semibold text-muted-foreground">
                    {v.label}
                  </p>
                  <p className="mt-1 font-display text-base font-bold text-foreground">
                    {v.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {body.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border p-3 text-center"
                >
                  <Icon className="mx-auto h-4 w-4 text-primary" />
                  <p className="mt-2 text-xs font-semibold text-muted-foreground">
                    {label}
                  </p>
                  <p className="font-display text-sm font-bold text-foreground">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                Recent tests
              </h2>
              <Link
                to="/dashboard/tests"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {tests.slice(0, 3).map((test) => (
                <li key={test.id} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-bold text-foreground">
                    {test.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {test.doctor} · {test.releasedOn}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">
                Medications
              </h2>
              <Link
                to="/dashboard/medications"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {medications.slice(0, 3).map((med) => (
                <li
                  key={med.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {med.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {med.dosage} · {med.frequency}
                    </p>
                  </div>
                  <span
                    className={
                      med.active
                        ? "shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary"
                        : "shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground"
                    }
                  >
                    {med.active ? "Active" : "Completed"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>

   </div> 
  )
}else {
  return (
          
    <div className='flex flex-row  font-[Outfit] bg-[#fafbfb] justify-between h-full'>
  <SideNav />
          <div className="animate-rise-in lg:ml-[17.5em] lg:pt-[4em]">
      <PageHeader
        icon={HeartPulse}
        title={`Hello, Dr. ${ currentUser !==null  ? currentUser.user_info.full_name.split(" ")[0] : '' }`}
        description="Here is a snapshot of your health record at the Clinicflow."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="card-hover-lift rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-3xl font-bold text-foreground">
                {value}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Left column: profile + appointments */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Profile card */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {currentUser.user_info.full_name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {currentUser.user_info.full_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentUser.user_info._id} · Blood group {medicalInfo == undefined || medicalInfo ==null ? 'N/A' : medicalInfo.blood_group} ·{" "}
                  {medicalInfo == undefined || medicalInfo ==null ? 'N/A' : medicalInfo.genotype}
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DocProfileFacts.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {label}
                    </p>
                    <p className="truncate capitalize text-sm font-bold text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

      {/* <div className='flex flex-row  font-[Outfit] bg-[#fafbfb] justify-between h-full'> */}
 
    <div className="patients flex flex-col ml-[1em]">
  <p className="font-semibold text-lg mt-1 ml-[1em] mb-[1em] ">Appointments</p>

     {
      appointments != null && appointments.length != 0
     ?
    <AppointmentDone appointments={appointments} title="Upcoming Appointment"/>
      :     <p className="font-semibold text-base mt-1 text-center ">You have no  Appointment today</p>
 
      }

    </div>
<div className="patients flex flex-col ml-[1em]">
  <p className="font-semibold text-lg mt-1 ml-[1em] mb-[1em] ">Patients</p>
 
{
patients != null && patients.length > 0 ?
<MyPatientHeader/>
:    <p className="font-semibold text-base mt-1 text-center ">You have no  Patient assigned to you</p>
 
}
{
  patients && patients.map((patient) => {
    return <MyPatient user={patient}/>
})
}
</div>
   
    </div>
    </div>
    </div>
    </div>
      
  )
}
     }else {
      return ''
     }
}