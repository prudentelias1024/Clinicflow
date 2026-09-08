import React , {useRef, useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SideNav from '../SideNav'
import { useSelector } from 'react-redux'

export default function EditMedicalInfo() {  
  const location = useLocation()
    const URL = useSelector(state => state.URL)
  const [medicalInfo, setMedicalInfo] = useState(null)
  const getMedicalInfo = async() => {
    const res = await(await axios.get(`${URL}/api/patient/medicalInfo/${location.state.patientId}`, {headers: {Authorization: localStorage.getItem('access-token')}})).data
    console.log(res)
    if(res.status == 200){

      setMedicalInfo(res.medical_info)
      if(res.medical_info.bmi !== undefined || res.medical_info.bmi !== null || res.medical_info.bmi !== ''){
        setAlreadyAdded(true)
      }
     console.log('medical info',res.medical_info)
      console.log(res.medical_info);
      bloodPressureRef.current.value = res.medical_info.blood_pressure == 'None' ? '' : res.medical_info.blood_pressure

   bloodSugarRef.current.value = res.medical_info.blood_sugar == 'None' ? '': res.medical_info.blood_sugar
   
   bloodGroupRef.current.value = res.medical_info.blood_group == 'None'? '': res.medical_info.blood_group

   genotypeRef.current.value = res.medical_info.genotype == 'None' ? '' : res.medical_info.genotype 
   
   cholesterolRef.current.value = res.medical_info.cholesterol == 'None'? '': res.medical_info.cholesterol
   pulseRef.current.value = res.medical_info.pulse == 'None'? '': res.medical_info.pulse
   weightRef.current.value = res.medical_info.weight == 'None'? '': res.medical_info.weight
   heightRef.current.value = res.medical_info.height == 'None'? '': res.medical_info.height
   temperatureRef.current.value = res.medical_info.temperature == 'None'? '': res.medical_info.temperature
   currentMedConditionRef.current.value = res.medical_info.current_medical_conditions == 'None'? '': res.medical_info.current_medical_conditions
   prevMedConditionRef.current.value = res.medical_info.previous_medical_conditions == 'None'? '': res.medical_info.previous_medical_conditions
   allergyRef.current.value = res.medical_info.allergy == 'None'? '' : res.medical_info.allergy
   intoleranceRef.current.value = res.medical_info.intolerance == 'None'? '': res.medical_info.intolerance
    
    }
    
  }
  


     const bloodPressureRef = useRef()
     const bloodSugarRef = useRef()
     const bloodGroupRef = useRef()
     const genotypeRef = useRef()
     const cholesterolRef = useRef()
     const pulseRef = useRef()
     const weightRef = useRef()
     const heightRef = useRef()
     const temperatureRef = useRef()
     const currentMedConditionRef = useRef()
     const prevMedConditionRef = useRef()
     const allergyRef = useRef()
     const intoleranceRef = useRef()
   
   
     const [addedSuccessfully,setAddedSuccessfully] = useState(false)
     const navigate = useNavigate()
     const [alreadyAdded ,setAlreadyAdded] = useState(false)
     const submitMedicalInfo = async() => {
       const blood_pressure = bloodPressureRef.current.value
       const blood_sugar = bloodSugarRef.current.value
       const blood_group = bloodGroupRef.current.value
       const genotype = genotypeRef.current.value
       const cholesterol = cholesterolRef.current.value
       const pulse = pulseRef.current.value
       const weight = weightRef.current.value
       const height = heightRef.current.value
       const temperature = temperatureRef.current.value
       const current_medical_conditions = currentMedConditionRef.current.value
       const previous_medical_conditions = prevMedConditionRef.current.value
       const allergy = allergyRef.current.value
       const intolerance = intoleranceRef.current.value
       const bmi = weight / ((height / 100) * ( height/ 100))
      
       if(alreadyAdded){
       const res = await (await axios.put(`${URL}/api/medicalInfo`, {
       
         blood_pressure,
         blood_sugar,
         blood_group,
         genotype,
         cholesterol,
         pulse,
         weight,
         height,
         temperature,
         current_medical_conditions,
         previous_medical_conditions,
         allergy,
         intolerance,
         bmi
       }, {headers: { Authorization: localStorage.getItem('access-token')}})).data
       if(res.status === 200){
         setAddedSuccessfully(true)
         setTimeout(() => {
           navigate('/Dashboard')
   
         }, 3000);
   
       }
     }
     else {
      const res = await (await axios.post(`${URL}/api/medicalInfo`, {
         patient_id: location.state.patientId,
         blood_pressure,
         blood_sugar,
         blood_group,
         genotype,
         cholesterol,
         pulse,
         weight,
         height,
         temperature,
         current_medical_conditions,
         previous_medical_conditions,
         allergy,
         intolerance,
         bmi
       }, {headers: { Authorization: localStorage.getItem('access-token')}})).data
       if(res.status === 200){
         setAddedSuccessfully(true)
         setTimeout(() => {
           navigate('/Dashboard')
   
         }, 3000);
   
       }
     }
     }
   
   
 useEffect(() => {
   getMedicalInfo()
 }, [])
 

return (

  <div className='flex flex-row justify-between h-full bg-[#FAFBFB]'>
  <SideNav />
  <div className="dashboard ml-[15%] w-full flex flex-col ">
  { addedSuccessfully ?
    <p className="font-[Outfit] text-green-500  m-auto p-[1.5em] mt-[3em] rounded-sm">
      Patiwnt Medical Information added successfully
    </p>
      : ''} 
  
 
  <div class=" flex flex-row gap-[7em] w-auto bg-[#F7F9FA]  pl-[2em] mx-[2em] mt-[3em] rounded-md py-[3em] ">
   
   
<div></div>

   <div  className='flex flex-wrap gap-[3em]'>
   
   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Blood Pressure</label> 
    <input ref={bloodPressureRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient blood pressure reading"  type="text" name="patient_bp" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Blood Sugar</label> 
    <input ref={bloodSugarRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient Blood Sugar reading "  type="text" name="patient_bs" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Blood Group</label> 
    <input ref={bloodGroupRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient Blood Group "  type="text" name="patient_bg" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Genotype </label> 
    <input ref={genotypeRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's genotype "  type="text" name="patient_genotype" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Cholesterol Level </label> 
    <input ref={cholesterolRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's Cholesterol Level "  type="text" name="patient_cholesterol" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Pulse Rate </label> 
    <input ref={pulseRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's Pulse rate "  type="text" name="patient_pulse_rate" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Weight </label> 
    <input ref={weightRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's weight reading"  type="text" name="patient's weight" />
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient Height </label> 
    <input ref={heightRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's height reading"  type="text" name="patient's height" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient's Temperature </label> 
    <input ref={temperatureRef} class="w-full  h-8 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Enter Patient's temperature "  type="text" name="patient's temperature" />
   </div>


   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient's Current Medical Conditions </label> 
    <textarea ref={currentMedConditionRef} class="w-full  h-32 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Seperate with ,  "  type="text" name="patient's current medical conditions" >
      </textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient's Previous Medical Conditions </label> 
    <textarea ref={prevMedConditionRef} class="w-full  h-32 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Seperate with ,"  type="text" name="patient's past medical coniditons" >
      </textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient's  Allergies </label> 
    <textarea ref={allergyRef} class="w-full  h-32 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Seperate with ,"  type="text" name="patient's past medical conditions" >
      </textarea>
   </div>

   <div className="text-[#7e7d7d]">
    <label class="font-[Outfit] text-[1em]  text-[#7e7d7d]" >Patient's  Intolerance </label> 
    <textarea ref={intoleranceRef} class="w-full  h-32 rounded-md border font-[Outfit] lg:p-4  font-bold placehold:font-normal" placeholder="Seperate with ,"  type="text" name="patient's past medical " >
      </textarea>
   </div>


   




<button
onClick={submitMedicalInfo} className='border border-blue-500 ml-[45%] w-[50%] text-blue-500 rounded-md text-sm mt-[1em]  p-[.75em]'>Submit</button>

</div>


 
   </div>

</div>
</div>

)
}
