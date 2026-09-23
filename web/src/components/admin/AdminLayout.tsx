import { useState, type ReactNode } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Users,
  Menu,
  ShieldCheck,
  House,
  Lock,
} from "lucide-react";
import { useApp } from "../../lib/db";
import { useI18n, type Lang } from "../../lib/i18n";
import { cn } from "../../lib/utils";
import { Logo } from "../ui";

const nav = [
  { to: "/admin", end: true, icon: LayoutDashboard, en: "Overview", sw: "Muhtasari" },
  { to: "/admin/businesses", icon: Store, en: "Businesses", sw: "Biashara" },
  { to: "/admin/subscriptions", icon: CreditCard, en: "Subscriptions", sw: "Subscriptions" },
  { to: "/admin/users", icon: Users, en: "All users", sw: "Watumiaji wote" },
];

function LangToggle() {
  const { lang, setLang } = useI18n();
  const next: Lang = lang === "en" ? "sw" : "en";
  return (
    <button
      onClick={() => setLang(next)}
      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3.5 text-fluid-sm font-semibold text-ink-100 hover:bg-white/10"
      aria-label={lang === "en" ? "Badilisha lugha hadi Kiswahili" : "Switch language to English"}
    >
      {lang === "en" ? "SW · Kiswahili" : "EN · English"}
    </button>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const sw = lang === "sw";
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-100">
      {open && (
        <div className="dialog-backdrop fixed inset-0 z-30 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-ink-950 text-ink-100 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Dodoma SME home">
            <Logo className="h-9 w-9" />
            <span className="leading-tight">
              <span className="flex items-center gap-1.5 font-display text-fluid-sm font-bold text-white">
                Aministrasheni <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden="true" />
              </span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-300">
                Super Admin / Dodoma SME
              </span>
            </span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-200 hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pt-5">
          <LangToggle />
          <div className="mt-4 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-3.5">
            <p className="flex items-center gap-2 text-fluid-xs font-bold uppercase tracking-wider text-gold-300">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" /> {sw ? "Eneo la msimamizi mkuu" : "Super admin area"}
            </p>
            <p className="mt-1 text-fluid-xs text-ink-300">{sw ? "Udhibiti wa biashara na subscriptions zote." : "Controls all businesses & subscriptions."}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Super admin">
          {nav.map(({ to, end, icon: Icon, en, sw: swL }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium transition-colors",
                  isActive ? "bg-gold-500 text-ink-950 font-semibold" : "text-ink-300 hover:bg-white/10 hover:text-white",
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {sw ? swL : en}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium text-ink-300 hover:bg-white/10 hover:text-white"
          >
            <House className="h-5 w-5" aria-hidden="true" /> {sw ? "Nyumbani" : "Home page"}
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium text-ink-300 hover:bg-white/10 hover:text-white"
          >
            <Lock className="h-5 w-5" aria-hidden="true" /> {sw ? "Ondoka" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-stone-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-900 hover:bg-stone-100 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex flex-1 items-center gap-2">
            <span className="truncate font-display text-fluid-base font-semibold text-ink-950">
              Super Admin · Dodoma SME Suite
            </span>
            <span className="hidden rounded-full bg-gold-100 px-2.5 py-0.5 text-fluid-xs font-bold text-gold-800 sm:inline-flex">
              {sw ? "Rasilimali zote" : "Full platform access"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-right leading-tight md:block">
              <span className="block text-fluid-sm font-semibold text-ink-950">{currentUser?.name}</span>
              <span className="block text-fluid-xs text-stone-500">Super Admin</span>
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 font-display text-fluid-sm font-bold text-gold-400">
              {(currentUser?.name ?? "SA").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
            </span>
          </div>
        </header>
        <main id="admin-main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}