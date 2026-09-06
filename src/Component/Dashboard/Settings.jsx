import React, {useEffect} from 'react'
import SideNav from './SideNav'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { actions } from '../../store'
import {
  CheckCircle2,
  Fingerprint,
  LogOut,
  ScanFace,
  Settings as SettingsIcon,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "./DashboardShell";

export default function Settings() {
 const user = useSelector(state => state.currentUser)
  const URL = useSelector(state => state.URL)
 const dispatch = useDispatch()

 const getUser = async() => {
  const res =  (await axios.get(`${URL}/api/user`,{headers: {Authorization: localStorage.getItem('access-token')}})).data
  console.log(res)
  if(res.status === 200){
    dispatch(actions.updateUser(res.user))
  }
}
  useEffect(() => {
    getUser()
    console.log(user);
  }, [])
  const rows = [
    {
      icon: ScanFace,
      title: "Two-factor authentication",
      description:
        "Add face recognition to secure your records and account activity.",
      enrolled: true,
      actionLabel: "Enrol face",
    },
    {
      icon: Fingerprint,
      title: "Three-factor authentication",
      description:
        "Add fingerprint security to protect your medical records and activity.",
      enrolled: true,
      actionLabel: "Enrol fingerprint",
    },
  ];

  return (
     <div className='flex flex-row gap-[10em] font-[Outfit] bg-[#fafbfb] justify-between h-full'>
        <SideNav />
       
    <div className="animate-rise-in ml-[20em] pt-[3em]">
      <PageHeader
        icon={SettingsIcon}
        title="My Settings"
        description="Security and account options for your Clinicflow profile."
      />

      <div className="flex max-w-3xl flex-col gap-4">
        {rows.map(({ icon: Icon, title, description, enrolled, actionLabel }) => (
          <div
            key={title}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-bold text-foreground">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.full_name}
                </p>
              </div>
            </div>
            {enrolled ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Enrolled
              </span>
            ) : (
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "Biometric enrolment will be available once the Clinicflow backend is connected.",
                  )
                }
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {actionLabel}
              </button>
            )}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <LogOut className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">
                Log out
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll have to sign in again next time to access your records.
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground transition-colors hover:bg-destructive/90"
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
  

