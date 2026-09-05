import { Link } from "react-router-dom";
import { HeartPulse, ArrowLeft, ShieldCheck, Lock } from "lucide-react";


export function AuthShell({ badge, title, subtitle, children, footer, wide }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 hero-grid-bg" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <Link to="/" className="flex items-center gap-2.5">
         
          <span className="font-Lumios text-3xl font-bold tracking-tight text-foreground">
            Clinicflow
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-12 pb-20 sm:pt-16">
        <div className="animate-rise-in mx-auto max-w-xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
            <ShieldCheck className="size-3.5" />
            {badge}
          </p>
          <h1 className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        <div
          className={`animate-rise-in mt-10 w-full rounded-3xl border border-border bg-card p-7 shadow-xl shadow-primary/5 sm:p-9 ${
            wide ? "max-w-2xl" : "max-w-md"
          }`}
          style={{ animationDelay: "120ms" }}
        >
          {children}
        </div>

        {footer && (
          <div
            className="animate-rise-in mt-6 text-center text-sm text-muted-foreground"
            style={{ animationDelay: "220ms" }}
          >
            {footer}
          </div>
        )}

        <p
          className="animate-rise-in mt-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          style={{ animationDelay: "300ms" }}
        >
          <Lock className="size-3.5" />
          Protected by three-factor authentication
        </p>
      </main>
    </div>
  );
}

export const fieldLabel =
  "mb-1.5 block text-sm font-bold text-foreground";
export const fieldInput =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground/60 transition-colors outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
export const primaryButton =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-60";
