import React, {useState} from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { GiHypodermicTest, GiMedicines } from "react-icons/gi";
import { CiWavePulse1 } from "react-icons/ci";
import { FaFirstAid, FaHospitalUser, FaUserAlt, FaUserNurse } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, CircleX  } from 'lucide-react';


export default function SideNav() {
  const [mobileNav, setMobileNav] = useState(false)
  const user = useSelector(state =>state.currentUser)
  const toggleNav = () => {
    setMobileNav(!mobileNav)
    console.log(mobileNav)
  }
  return (
    <>
    <div onClick={toggleNav} className='lg:hidden fixed top-[1em] left-[1em] z-20'>
 <CircleX className="text-white text-5xl mt-[.5em] lg:hidden ml-[5em] fixed"/> 
  </div>
  
   <div onClick={toggleNav} className='lg:hidden fixed top-[1em] left-[1em] z-20'>
  <Menu  className={mobileNav ? "text-white text-5xl mt-[.5em] lg:hidden ml-[.35em] fixed" : "text-5xl mt-[.5em] lg:hidden ml-[.35em] fixed"}/>
    </div>
   
    
    

   


    <div className={mobileNav ? "z-10 flex-col gap-[2em] w-[50%] h-full p-[2em] flex  fixed  bg-blue-500 text-white" : " z-0 flex-col gap-[2em] w-[15%] h-full p-[2em] hidden lg:flex fixed  bg-blue-500 text-white"}>

     

        <Link to="/Dashboard" className=' inline-flex gap-[1em] font-[Outfit] mt-[3em]'>
        <MdSpaceDashboard className='text-2xl text-white' />
        <p className="">Dashboard</p>
        </Link>
        
    {
     user &&  user.type == 'patient'?
    <>
      <Link to="/Dashboard/MedicalInfo" className=' inline-flex gap-[1em] font-[Outfit]'>
      <div className=' inline-flex gap-[1em] font-[Outfit]'>
      <FaFirstAid className='text-2xl text-white' />
      <p className="">Medical Info</p>
      </div>
      </Link>



            <Link to="/Dashboard/Conditions" className=' inline-flex gap-[1em] font-[Outfit]'>
        <div className=' inline-flex gap-[1em] font-[Outfit]'>
        <CiWavePulse1 className='text-2xl text-white' />
        <p className="">Conditions</p>
        </div>
    </Link>
        
    

        <div className='inline-flex gap-[1em] font-[Outfit]'>
        <AiOutlineClockCircle className='text-2xl text-white' />
        <p className="">History</p>
        </div>
      
        <Link to="/Dashboard/Doctors" className=' inline-flex gap-[1em] font-[Outfit]'>
        <FaUserNurse className='text-2xl text-white' />
        <p className="">Specialist</p>
        </Link>

    </>: ''
}

    {
     user &&  user.type == "doctor"? 
      <Link to="/Dashboard/Patients" className=' inline-flex gap-[1em] font-[Outfit]'>
      <FaHospitalUser className='text-2xl text-white' />
      <p className="">Patients</p>
      </Link>:''

    }


        <Link to='/Dashboard/Appointment' className=' inline-flex gap-[1em] font-[Outfit]'>
        <AiOutlineCalendar className='text-2xl text-white' />
        <p className="">Appointments</p>
        </Link>




        
        <Link to="/Dashboard/Tests" className=' inline-flex gap-[1em] font-[Outfit]'>
        <GiHypodermicTest className='text-2xl text-white' />
        <p >Tests</p>
        </Link >


        <Link to="/Dashboard/Medications" className=' inline-flex gap-[1em] font-[Outfit]'>

        <div className=' inline-flex gap-[1em] font-[Outfit]'>
        <GiMedicines className='text-2xl text-white' />
        <p className="">Medications</p>
        </div>

    </Link>

        <Link to='/Dashboard/Settings' className=' inline-flex gap-[1em] font-[Outfit]'>
        <FiSettings className='text-2xl text-white' />
        <p className="">Settings</p>
        </Link >


    </div>
    </>
  )
}
