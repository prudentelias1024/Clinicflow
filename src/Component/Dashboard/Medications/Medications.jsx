import React, {useEffect,useRef,useState} from 'react'
import SideNav from '../SideNav'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { PageHeader } from '../DashboardShell'
import {PillIcon } from 'lucide-react'

export default function Medications() {
    const user = useSelector(state => state.currentUser)
    const URL = useSelector(state => state.URL)
    const fileRef = useRef()
    const [medications, setMedications] = useState([])
      
   const getMedications = async() => {
    console.log(user.type)
    let url = ''
    if(user && user.type == 'patient'){
      url = `${URL}/api/medications`

    }else {
      url = `${URL}/api/medications/my`
    }
    
    const res =  (await axios.get(url,{headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status === 200){
   
      setMedications(res.medications)
     } 
  
  }
    


    useEffect(() => {
      if(user!== null){

      
     getMedications()
      }
    }, [])
    
  return (
    <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
    <SideNav/>
    
    <div className="dashboard ml-[15%] w-full flex flex-col ">
      
      {/* <ProfileNavbar/> */}
        <div className="animate-rise-in ml-[3em] pt-[3em]">
                                      <PageHeader
                                        icon={PillIcon}
                                        title="My Medications"
                                        description="Security and account options for your Clinicflow profile."
                                      />
                  
      <div className=" flex flex-col gap-[1em]">

        {
      medications && medications.length > 0 ?
       <>
    <div className="header bg-[#f1f1f1] mt-[1em] text-[#7e7d7d]  grid grid-cols-5 py-[1em] text-xs uppercase pl-[2em]">
    <p className="ref">Supervised by</p>
   
    <p className="">Drug Name</p>
    <p className="type">Drug Reason</p>
    <p className="department">Drug type</p>
    <p className="draw ">Drug Dosage </p>
    {/* <p className="ref">Ref</p> */}
    {/* <p className="ref">Document Attached</p> */}
    </div>
</>
    : <p className="text-center text-[#7e7d7d] lg:mt-[10em]">No medications found</p>
        }

    {
      medications !== undefined && medications.length > 0 && medications.map((medication) => {
        return    <div className="test_done grid grid-cols-5 pl-[1.5em]">
              <div className='inline-flex'>
            <img src={ URL+ medication.prescribed_by.profile_img} alt='doctor_image' className='h-[2em] w-[2em] rounded-full'/>
            <p className="font-semibold text-sm ml-[.5em] mt-[.25em]">{medication.prescribed_by.user_info.full_name}</p>
          </div>
  
        <p className="font-semibold text-sm">{medication.name}</p>
        <p className="font-semibold text-sm">{medication.reason}</p>
        <p className="font-semibold text-sm">{medication.dosage}</p>
        <p className="font-semibold text-sm">{medication.type}</p>
        {/* {
          medication.file !== null ?
        
        <div ref={fileRef} value={test.file} onClick={downloadTestFile} className="font-semibold inline-flex text-sm ml-[1em] text-blue-500 cursor-pointer"> 
        <FaFileDownload className='text-xl'/>
        <p className='text-sm '> Download Test result</p> </div>
        :''
      } */}
      </div>
      })
      }   

     </div>
      </div>
      </div>
      </div>
   

  
  )
}
