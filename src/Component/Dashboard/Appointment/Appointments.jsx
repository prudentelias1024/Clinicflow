import React, {  useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import ProfileNavbar from '../ProfileNavbar'
import SideNav from '../SideNav'
import 'react-calendar/dist/Calendar.css'
import { useSelector } from 'react-redux'
import UpcomingAppointment from './UpcomingAppointment'
import AppointmentIndicator from './AppointmentIndicator'
import AppointmentDone from './AppointmentDone'
import axios from 'axios'
export default function Appointments() {
    const [value,setValue] = useState()
    const [appointments , setAppointments] = useState([])
    const [doneAppointments , setDoneAppointments] = useState([])
    const [appointmentCount , setAppointmentsCount] = useState(null)
    const [doneAppointmentCount , setDoneAppointmentsCount] = useState(null)

    const user = useSelector(state => state.currentUser)
      const URL = useSelector(state => state.URL)
    const getDoneAppointments = async() => {
      let url = ''
      if(user && user.type == 'doctor'){
        url = `${URL}/api/appointments/done/my`
       }else{
         url = `${URL}/api/appointments/done`
       }
      
      const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
      console.log(res)
      if(res.status === 200){
        setDoneAppointments(res.appointments)
        setDoneAppointmentsCount(res.appointments.length)
        console.log(res.appointments);
       } 
      
     
    }

    const getUpcomingAppointments = async() => {
      let url = ''
      if(user&& user.type == 'doctor'){
        url = `${URL}/api/appointments/upcoming/my`
      } else{
        url = `${URL}/api/appointments/upcoming`
     
      }
      const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
      console.log(res)
      if(res.status === 200){
        setAppointments(res.appointments)
        setAppointmentsCount(res.appointments.length)
        console.log(res.appointments);
       } 
       
     
    }
    useEffect(() => {
      if (user  !== null) {
        
        getDoneAppointments()
        getUpcomingAppointments()
      }
    },[user])
  return (
     <></>
  )
}