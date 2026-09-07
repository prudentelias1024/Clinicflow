import React, { useRef, useState } from 'react'
import Lasulogo from '../../../logo.png'
import { Link,  useNavigate } from 'react-router-dom'
import { Stethoscope, LogIn, CircleAlert } from "lucide-react";
import axios from 'axios'
import {  actions } from "../../../store";
import { useDispatch, useSelector } from 'react-redux';
import { AuthShell, fieldLabel, fieldInput, primaryButton } from '../../Authshell';
export default function NativeLoginDoctor() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch()
  const URL = useSelector(state => state.URL)

  const login = async() => {
    setEmailError('')
    setPasswordError('')
    let formData = {
      email: emailRef.current.value,
      password : passwordRef.current.value,
      type: 'doctor'
    }
   
    console.log(formData);
    let res = (await axios.post(`${URL}/api/native/doc_login`,formData)).data
    console.log(res)
    if (res.emailError) {
      setEmailError(res.emailError)
      setError(true)
    } else if(res.passwordError){
       setPasswordError(res.passwordError)
       setError(true)
   
    } else {
      if(res.access_token){
      localStorage.setItem('access-token',res.access_token)
      dispatch(actions.updateUser(res.user))
     
      navigate('/Dashboard')
      }
    }
  }
  return (
  
    <AuthShell
      badge="Staff Access · Doctors"
      title="Doctor & specialist sign in"
      subtitle="Access your patients' charts, appointments, and test results with your Medical Centre staff credentials."
      footer={
        <>
          Not a doctor?{" "}
          <Link to="/nativeLogin" className="font-bold text-primary underline-offset-4 hover:underline">
            Sign in as a patient
          </Link>
        </>
      }
    >
      <form  className="flex flex-col gap-5" noValidate>
        {error && (
          <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            <CircleAlert className="size-4 shrink-0" />
            {error}
          </p>
        )}
        <div>
          <label htmlFor="staff-email" className={fieldLabel}>
            Staff Email
          </label>
          <input
            id="staff-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="doctor@gmail.com"
            className={fieldInput}
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="staff-password" className={fieldLabel}>
            Password
          </label>
          <input
            id="staff-password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            className={fieldInput}
          
          
            ref={passwordRef}
          />
        </div>
        <button type="button" onClick={login} className={primaryButton} disabled={loading}>
          {loading ? (
            "Verifying credentials…"
          ) : (
            <>
              <LogIn className="size-4" />
              Sign in to staff portal
            </>
          )}
        </button>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Stethoscope className="size-3.5" />
          Staff accounts are provisioned by the Medical Centre admin.
        </p>
      </form>
    </AuthShell>
  ) 
  }
