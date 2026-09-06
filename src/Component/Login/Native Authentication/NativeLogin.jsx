import React, { useRef, useState } from 'react'

import clinicflow from '../../../logo.png'
import { Link,  useNavigate } from 'react-router-dom'
import axios from 'axios'
import {  actions } from "../../../store";
import { useDispatch, useSelector } from 'react-redux';
import { KeyRound, LogIn, CircleAlert } from "lucide-react";
import { AuthShell, fieldInput, fieldLabel, primaryButton } from "../../Authshell";

export default function NativeLogin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [emailError, setEmailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const URL = useSelector(state => state.URL)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const login = async() => {
    setEmailError('')
    setPasswordError('')
    let formData = {
      email: emailRef.current.value,
      password : passwordRef.current.value,
      type: 'patient'
    }
   
    console.log(formData);
    let res = (await axios.post(`${URL}/api/native/login`,formData)).data
    console.log(res)
    if (res.emailError) {
      setEmailError(res.emailError)
    } else if(res.passwordError){
       setPasswordError(res.passwordError)
    } else  {
      if(res.access_token){
      localStorage.setItem('access-token',res.access_token)
      dispatch(actions.updateUser(res.user))
     
      navigate('/Dashboard')
      }
    }
  }
  return (
       <AuthShell
      badge="Factor 03 · Password"
      title="Welcome back"
      subtitle="Sign in with your patient credentials to view your consultations, prescriptions, and test results."
      footer={
        <>
          New to Clinicflow?{" "}
          <Link to="/NativeRegistration" className="font-bold text-primary underline-offset-4 hover:underline">
            Create your account
          </Link>
          <span className="mx-2 text-border">·</span>
          <Link to="/nativeLogin/doctor" className="font-bold text-primary underline-offset-4 hover:underline">
            Sign in as a doctor
          </Link>
        </>
      }
    >
      <form  className="flex flex-col gap-5" noValidate>
        {emailError && (
          <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            <CircleAlert className="size-4 shrink-0" />
            {emailError}
          </p>
        )}

        {passwordError && (
          <p className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            <CircleAlert className="size-4 shrink-0" />
            {passwordError}
          </p>
        )}
        <div>
          <label htmlFor="email" className={fieldLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@gmail.com"
            className={fieldInput}
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password" className={fieldLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            className={fieldInput}
            ref={passwordRef}
          />
        </div>
        <button onClick={login} type="button" className={primaryButton} disabled={loading}>
          {loading ? (
            "Signing you in…"
          ) : (
            <>
              <LogIn className="size-4" />
              Sign in
            </>
          )}
        </button>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <KeyRound className="size-3.5" />
          Credentials are encrypted in transit and at rest.
        </p>
      </form>
    </AuthShell>

    )
}
