import React, { useRef, useState } from 'react'
import Lasulogo from '../../../logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { UserRoundPlus, CircleAlert, ImagePlus, CheckCircle2 } from "lucide-react";
import { AuthShell, fieldInput, fieldLabel, primaryButton } from "../../Authshell";

export default function NativeRegistration() {
    
    
    const nameRef = useRef()
    const emailRef = useRef()
    const dobRef = useRef()
    const contactRef = useRef()
    const passwordRef = useRef()
    const confPwdRef = useRef()
    const addressRef = useRef()
    const genderRef = useRef()
    const [passwordError,setPasswordError] = useState(false)
    const [imageData,setImageData] = useState(false)
    const [loading, setLoading] = useState(false);
  
  const [imageName, setImageName] = useState(null);
  const [error, setError] = useState(null);
    const navigate = useNavigate()
    const URL = useSelector(state => state.URL)
    const chooseImage = (event) => {
        setImageData(event.target.files[0])
    }
    const register = async() => {
        setPasswordError(false)
        let full_name = nameRef.current.value
        let email = emailRef.current.value
        let dob = dobRef.current.value
        let contact = contactRef.current.value
        let password = passwordRef.current.value
        let password_repeat = confPwdRef.current.value
        let gender = genderRef.current.value
        let address = addressRef.current.value
        if(password !== password_repeat){
            setPasswordError(true)
        }
        let formData = new FormData()
        formData.append('full_name',full_name)
        formData.append('email',email)
        formData.append('dob',dob)
        formData.append('address',address)
        formData.append('phone_no',contact)
        formData.append('gender',gender)
        formData.append('password',password)
        formData.append('password2',password_repeat)
        formData.append('profile_img', imageData, imageData.name)

        if (!passwordError) {
         let res = await((await axios.post(`${URL}/api/native/register`,formData,
         {headers: {'Content-Type': "multipart/form-data"}}
         ))).data
         console.log(res)
            if (res.status === 200) {
             navigate('/nativeLogin')
        }
        }

      
    }
  return (
  <AuthShell
      badge="New Patient Registration"
      title="Create your account"LASU
      subtitle="One account for every consultation, prescription, and test result at Clinicflow."
      wide
      footer={
        <>
          Already registered?{" "}
          <Link to="/nativeLogin" className="font-bold text-primary underline-offset-4 hover:underline">
            Sign in instead
          </Link>
        </>
      }
    >
      <form onSubmit={register} className="flex flex-col gap-5" noValidate>
        {error && (
          <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            <CircleAlert className="size-4 shrink-0" />
            {error}
          </p>
        )}

        <div>
          <span className={fieldLabel}>Profile photo</span>
          <label
            htmlFor="profile_img"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-background px-4 py-4 transition-colors hover:border-primary/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              {imageName ? <CheckCircle2 className="size-5" /> : <ImagePlus className="size-5" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-foreground">
                {imageName ?? "Upload a clear photo of yourself"}
              </span>
              <span className="block text-xs text-muted-foreground">JPG or PNG, used on your patient card</span>
            </span>
          </label>
          <input
            id="profile_img"
            type="file"
            name="profile_img"
            accept="image/jpeg,image/png,image/jpg"
            className="sr-only"
           />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="full_name" className={fieldLabel}>Full name</label>
            <input id="full_name" type="text" name="username" autoComplete="name" ref={nameRef} placeholder="Adaeze Okafor" className={fieldInput}  />
          </div>
          <div>
            <label htmlFor="reg_email" className={fieldLabel}>Email</label>
            <input id="reg_email" type="email" name="email" autoComplete="email" ref={emailRef} placeholder="you@lasu.edu.ng" className={fieldInput}   />
          </div>
          <div>
            <label htmlFor="phone_no" className={fieldLabel}>Phone number</label>
            <input id="phone_no" type="tel" name="phone_no" autoComplete="tel" ref={contactRef} placeholder="0803 000 0000" className={fieldInput}  />
          </div>
          
          <div>
            <label htmlFor="dob" className={fieldLabel}>Date of birth</label>
            <input id="dob" type="date" name="dob" autoComplete="bday" className={fieldInput}   />
          </div>
          <div>
            <label htmlFor="gender" className={fieldLabel}>Gender</label>
            <select id="gender" name="gender" className={fieldInput}  >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className={fieldLabel}>Home address</label>
            <input id="address" type="text" name="address" autoComplete="street-address" ref={addressRef} placeholder="Hall / street, Lagos" className={fieldInput}   />
          </div>
          <div>
            <label htmlFor="reg_password" className={fieldLabel}>Password</label>
            <input id="reg_password" type="password" name="password" autoComplete="new-password" ref={passwordRef} placeholder="At least 6 characters" className={fieldInput}   />
          </div>
          <div>
            <label htmlFor="confirm_password" className={fieldLabel}>Confirm password</label>
            <input id="confirm_password" type="password" name="password2" autoComplete="new-password" ref={confPwdRef} placeholder="Repeat your password" className={fieldInput}  
             />
          </div>
        </div>

        <button type="submit" className={primaryButton} disabled={loading}>
          {loading ? (
            "Creating your account…"
          ) : (
            <>
              <UserRoundPlus className="size-4" />
              Create account
            </>
          )}
        </button>
      </form>
    </AuthShell>
)
}
