import React from 'react'
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  ShieldCheck,
  HeartPulse,
  ArrowRight,
  Lock,
  Activity,
} from "lucide-react";

import logo from './logo.png'

export default function Homepage() {

    // const meta = [
    //   { title: "Clinicflow — LASU Medical Records, Secured Three Ways" },
    //   {
    //     name: "description",
    //     content:
    //       "Clinicflow is LASU's three-factor health record system. Sign in with your fingerprint, face, or password to access secure medical records.",
    //   },
    //   { property: "og:title", content: "Clinicflow — LASU Medical Records" },
    //   {
    //     property: "og:description",
    //     content:
    //       "A three-factor health record system. Sign in with fingerprint, face recognition, or password.",
    //   },
    //   { property: "og:type", content: "website" },
    //   { name: "twitter:card", content: "summary_large_image" },
    // ]


    const loginMethods = [
  {
    icon: Fingerprint,
    title: "Fingerprint",
    description:
      "Touch to verify. Your biometric identity unlocks your records in under a second.",
    href: "/fingerprint",
    tag: "Factor 01",
    primary: true,
  },
  {
    icon: ScanFace,
    title: "Face Recognition",
    description:
      "Look at the camera. Liveness-checked facial matching keeps impersonators out.",
    href: "/faceRecognition",
    tag: "Factor 02",
    primary: false,
  },
  {
    icon: KeyRound,
    title: "Password",
    description:
      "Classic sign-in with your staff or matric credentials, hardened and encrypted.",
    href: "/nativeLogin",
    tag: "Factor 03",
    primary: false,
  },
];

const stats = [
  { icon: ShieldCheck, label: "Three-factor security", value: "3FA" },
  { icon: Activity, label: "Records always available", value: "24/7" },
  { icon: Lock, label: "End-to-end encrypted", value: "AES-256" },
];

  return (
        <div className="relative min-h-screen overflow-hidden bg-oklch(0.989 0.003 247)">
      {/* Decorative oklch(0.989 0.003 247) */}
      <div className="pointer-events-none absolute inset-0 hero-grid-bg" aria-hidden="true" />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <div className="flex w-[10em] items-center gap-2.5">
          <p className=" font-Lumios text-4xl font-bold tracking-tight text-foreground">
            Clinicflow
          </p>
        </div>
        <a
          href="/nativeLogin/doctor"
          className="hidden items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur transition-colors hover:borderprimary/40 hover:text-primary sm:inline-flex"
        >
          Doctor sign-in
          <ArrowRight className="size-3.5" />
        </a>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-rise-in mx-auto inline-flex items-center gap-2 rounded-full border borderprimary/20 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
            <ShieldCheck className="size-3.5" />
            LASU Health Records System
          </p>
          <h1
            className="animate-rise-in mt-6 font-display text-4xl leading-[1.08] font-bold tracking-tight text-foreground sm:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Your medical records,{" "}
            <span className="bg-gradient-to-r fromprimary to-accent bg-clip-text text-transparent">
              secured three ways.
            </span>
          </h1>
          <p
            className="animate-rise-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Clinicflow protects every consultation, prescription, and test result
            behind three-factor authentication. Choose how you want to sign in —
            no waiting, no paperwork, no compromises.
          </p>
        </div>

        {/* Login method cards */}
        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3">
          {loginMethods.map((method, i) => (
            <a
              key={method.title}
              href={method.href}
              className="animate-rise-in group relative flex flex-col rounded-3xl border border-border bg-card p-7 card-hover-lift"
              style={{ animationDelay: `${270 + i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl ${
                    method.primary
                      ? "bg-primary text-primary-foreground shadow-lg shadowprimary/30 animate-pulse-ring"
                      : "bg-secondary text-primary"
                  }`}
                >
                  <method.icon className="size-6" strokeWidth={2} />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-muted-foreground/70 uppercase">
                  {method.tag}
                </span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-card-foreground">
                {method.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {method.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Sign in
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {method.primary && (
                <span className="absolute -top-2.5 right-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground uppercase shadow-md shadowprimary/30">
                  Recommended
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Trust stats */}
        <div
          className="animate-rise-in mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
          style={{ animationDelay: "560ms" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-4 backdrop-blur"
            >
              <stat.icon className="size-5 shrink-0 text-primary" strokeWidth={2} />
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="animate-rise-in mt-12 text-center text-sm text-muted-foreground"
          style={{ animationDelay: "640ms" }}
        >
          New to Clinicflow?{" "}
          <a
            href="/NativeRegistration"
            className="font-bold text-primary underline-offset-4 hover:underline"
          >
            Create your account
          </a>
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Clinicflow </p>
          <p className="inline-flex items-center gap-1.5">
            <Lock className="size-3.5" />
            Protected by three-factor authentication
          </p>
        </div>
      </footer>
    </div>

  )
}

