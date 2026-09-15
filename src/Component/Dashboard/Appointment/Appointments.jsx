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

import { PageHeader } from "../DashboardShell";
import moment from 'moment'

import { CalendarCheck, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
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



function AppointmentCard({appointment,done,}) {
  return (
    <article className="card-hover-lift rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={
            done
              ? "flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground"
              : "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
          }
        >
          {done ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <CalendarDays className="h-5 w-5" />
          )}
        </span>

         <span
          className={
            appointment.appointment_status == 'pending'
              ? "rounded-full bg-yellow-300 px-3 capitalize ml-[1.5em] py-1 text-xs font-bold text-white"
              :
                appointment.appointment_status == 'accepted'?
              "rounded-full bg-green-300 px-3 capitalize ml-[1.5em] py-1 text-xs font-bold text-white":
              
              "bg-red-300 px-3 capitalize ml-[1.5em] py-1 text-xs font-bold text-white"
          }
        >
          {  appointment.appointment_status !== null? appointment.appointment_status : ''}
        </span>

        <span
          className={
            done
              ? "rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground"
              : "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
          }
        >
          {done ? "Completed" : "Upcoming"}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-foreground">
        {appointment.reason}
      </h3>
      <p className="text-sm font-semibold text-primary">
        {appointment.specialist.specialization}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{appointment.specialist.user_info.full_name}</p>
      <div className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">
          {moment(appointment.appointment_start_time).format("ddd, MMM D")} · {moment(appointment.appointment_start_time).format('hh:mm A')} 
        </p>
        <p className="mt-1 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Clinicflow
        </p>
      </div>
    </article>
  );
}
  
    return (
        <div className='flex flex-row gap-[10em] font-[Outfit] bg-[#fafbfb] justify-between h-full'>
              <SideNav />
    <div className="animate-rise-in ml-[20em] pt-[3em]">
      <PageHeader
        icon={CalendarCheck}
        title="Appointments"
        description="Your upcoming visits and appointment history at Clinicflow."
      />

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          Upcoming ({appointmentCount})
        </h2>
        {appointmentCount > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {appointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm font-semibold text-muted-foreground">
            You have no upcoming appointments.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          Past appointments ({doneAppointments.length})
        </h2>
        {doneAppointments.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {doneAppointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} done />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm font-semibold text-muted-foreground">
            No past appointments yet.
          </p>
        )}
      </section>
    </div>
</div>
  )
}