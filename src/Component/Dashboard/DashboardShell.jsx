import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Pill,
  Settings,
  HeartPulse,
} from "lucide-react";
import { useSelector } from "react-redux";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/appointment", label: "Appointments", icon: CalendarDays },
  { to: "/dashboard/tests", label: "Tests", icon: FlaskConical },
  { to: "/dashboard/medications", label: "Medications", icon: Pill },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DashboardShell() {
    const {currentUser} = useSelector(state => state)
    const { pathname } = useLocation();
   return (
    <div className="min-h-screen bg-secondary/60 font-sans">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <Link to="/" className="flex items-center gap-3 px-6 pb-6 pt-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-foreground">
            Clinicflow
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-4">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {initials(currentUser.fullName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">
                {currentUser.fullName}
              </p>
             
            </div>
          </div>
          <Link
            to="/"
            className="mt-3 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold">Clinicflow</span>
        </Link>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {initials(currentUser.fullName)}
        </span>
      </header>

      {/* Mobile nav */}
      <nav className="sticky top-[61px] z-30 flex gap-1 overflow-x-auto border-b border-border bg-card/90 px-3 py-2 backdrop-blur lg:hidden">
        {navItems.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 lg:pt-0 lg:pl-0 pl-[1em] pt-[5em] flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-start gap-4">
        <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}