import { useState , useEffect, useRef} from "react";
import {  Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import axios from "axios";
import { PageHeader } from "../DashboardShell";
import SideNav from "../SideNav";
import {useSelector} from 'react-redux'



const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
];

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-4 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function StepLabel({ index, label }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {index}
      </span>
      <h2 className="font-display text-base font-bold text-foreground">
        {label}
      </h2>
    </div>
  );
}

function AddAppointment() {
  const URL = useSelector(state => state.URL)
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [doctors,setDoctors] = useState(null)
  const [selectedSpecialization, setSelectedSpecialization] = useState(null)
  const [selectedDocId, setSelectedDocId] = useState(null)

   
    const descriptionRef = useRef()
    const [addedSuccessfully,setAddedSuccessfully] = useState(false)

    const submitAppointment = async() => {
      const description = descriptionRef.current.value
      console.log(date,time)
      const start_time = new Date(date)
      const [timeValue, modifier] = time.split(" ");
      let [hours, minutes] = timeValue.split(":").map(Number);

     if (modifier === "PM" && hours !== 12) {
         hours += 12;
     }

    if (modifier === "AM" && hours === 12) {
        hours = 0;
     }
      start_time.setHours(hours)
      start_time.setMinutes(minutes)
      start_time.setSeconds(0)
      

     
      const res = await (await axios.post(`${URL}/api/appointments/create`, {
        description: description,
        start_time:start_time,
        specialist_id: selectedDocId
      }, {headers: { Authorization: localStorage.getItem('access-token')}})).data
      console.log(res)
      if(res.status === 200){
        setAddedSuccessfully(true)
        setTimeout(() => {
          navigate('/Dashboard')

        }, 3000);
 
      }
    }
  
 const getDoctors = async() => {

    const res = await (await axios.get(`${URL}/api/doctors/all`, {headers: {Authorization: localStorage.getItem('access-token')}})).data
   if(res.status === 200){
     setDoctors(res.doctors)
    }
  
  }

 const chooseSpecialist = (doctor) => {
  const sel_doc = doctors.find( (doc) => doctor === doc._id)

  setDoctor(sel_doc.user_info.full_name)
   setSelectedSpecialization(sel_doc.specialization)
   setSelectedDocId(doctor)
 }

useEffect(() => {
  if (URL !== null) {
    getDoctors() 
  }
   
  },[])



  
  const ready = selectedSpecialization && doctor && date && time;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ready || submitting) return;
    setSubmitting(true);
    // TODO: connect to the existing Clinicflow booking API.
    setTimeout(() => {
      toast.success("Appointment booked", {
        description: `${specialization} with ${doctor} on ${format(date, "PPP")} at ${time}.`,
      });
      navigate({ to: "/dashboard/appointment" });
    }, 700);
  };

  return (
      <div className='flex flex-row w-full justify-between h-full bg-[#FAFBFB]'>
        <SideNav />
    <div className="animate-rise-in ml-[15em] w-[90%] px-[5em] pt-[3em]">
      <PageHeader
        icon={CalendarPlus}
        title="Book an appointment"
        description="Schedule a visit at the Clinicflow in a few steps."
        action={
          <Link
            to="/dashboard/appointment"
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to appointments
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">

          

          {/* Step 1: specialty & doctor */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <StepLabel index={1} label="Choose a specialty and doctor" />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <UserRound className="h-3.5 w-3.5" /> Doctor
                </label>
                <select onChange={(e) => chooseSpecialist(e.target.value)} className="border py-[0.5em] px-[1.5em] rounded-md w-[15em]"
                 
                  // onValueChange={setDoctor}
                  // disabled={!specialization}
                >
                  <option  value="">Select doctor</option>
                  {doctors !== null ?
                  doctors.map((doc) => (
                  
                    <option  key={doc} value={doc._id}>
                      {doc.user_info.full_name}
                    </option>
                  )) : null}
                </select>
              </div>



              <div>
                <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Stethoscope className="h-3.5 w-3.5" /> Specialty
                </label>
              
                
               
                
                    <select placeholder="Select specialty" className="border py-[0.5em] px-[1.5em] rounded-md w-[15em]" >
                
               
                    {selectedSpecialization !== null ? 
                      <option  value={selectedSpecialization}>
                        {selectedSpecialization}
                      </option>
                      
                      : ''
                    }
               
                </select>
              </div>

            

              
            </div>
          </section>

          {/* Step 2: date & time */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <StepLabel index={2} label="Pick a date and time" />
            <div className=" flex flex-col gap-6">
              <div>
                <label className="mb-2 flex items-center gap-1.5 w-full text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {/* <CalendarDays className="h-3.5 w-3.5" /> Date */}
                </label>


                <div className=" p-2">
                  <DayPicker 
                  animate 
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) =>
                      d < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      d.getDay() === 0
                    }
                    className="pointer-events-auto w-max border rounded-xl bg-background border-border p-[2em]"
                  />
                </div>
              </div>


                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Time slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        
                        onClick={() => setTime(slot)}
                        className={
                          time === slot
                            ? "border-primary bg-blue-400 rounded-sm text-primary-foreground shadow-sm"
                            : "border rounded-sm bg-background border-blue-400 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>


            </div>
          </section>

          {/* Step 3: reason */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <StepLabel index={3} label="Reason for visit (optional)" />
            <textarea
              ref={descriptionRef}
              // onChange={(e) => setReason(e.target.value.slice(0, 500))}
              placeholder="Briefly describe your symptoms or reason for the visit…"
              className="min-h-28 rounded-xl w-full h-[10em] border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              maxLength={500}
            />
          </section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-8">
          <h2 className="font-display text-base font-bold text-foreground">
            Appointment summary
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Specialty", selectedSpecialization],
              ["Doctor", doctor],
              ["Date", date ? format(date, "PPP") : ""],
              ["Time", time],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <dt className="font-semibold text-muted-foreground">{label}</dt>
                <dd
                  className={
                    "text-right font-bold"
                  }
                    value= {value?  "text-foreground" : "text-muted-foreground/60"
                  }
                >
                  {value || "Not selected"}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            You'll check in at the front desk with your fingerprint or face ID
            on the day of your visit.
          </p>
          <button
            onClick={submitAppointment}
            type="button"
            disabled={!ready || submitting}
            className="mt-5 h-11 w-full rounded-xl inline-flex items-center justify-center bg-foreground text-white text-sm font-bold"
          >
            {submitting ? (
              "Booking…"
            ) : (
              <>
                Confirm appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
          {ready && !submitting && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> Ready to confirm
            </p>
          )}
        </aside>
      </form>
    </div>
    </div>
  );
}

export default AddAppointment;