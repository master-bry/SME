import { useState, type ReactNode } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ScanLine,
  Boxes,
  Users,
  BarChart3,
  Settings,
  Menu,
  LogOut,
  Bell,
  LifeBuoy,
} from "lucide-react";
import { Logo, useI18n, type Lang } from "./uiShared";
import { cn } from "../lib/utils";

const nav = [
  { to: "/app", end: true, icon: LayoutDashboard, key: "nav.dashboard" as const },
  { to: "/app/pos", icon: ScanLine, key: "nav.pos" as const },
  { to: "/app/inventory", icon: Boxes, key: "nav.inventory" as const },
  { to: "/app/customers", icon: Users, key: "nav.customers" as const },
  { to: "/app/reports", icon: BarChart3, key: "nav.reports" as const },
  { to: "/app/settings", icon: Settings, key: "nav.settings" as const },
];

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();
  const next: Lang = lang === "en" ? "sw" : "en";
  return (
    <button
      onClick={() => setLang(next)}
      className={`inline-flex items-center justify-center rounded-xl border font-semibold transition-colors ${
        compact
          ? "min-h-10 border-stone-200 bg-white px-3 text-fluid-xs text-ink-900 hover:bg-stone-50"
          : "min-h-10 border-stone-200 bg-white px-3.5 text-fluid-sm text-ink-900 hover:bg-stone-50"
      }`}
      aria-label={lang === "en" ? "Badilisha lugha hadi Kiswahili" : "Switch language to English"}
      title={lang === "en" ? "Lugha ya Kiswahili" : "English language"}
    >
      {lang === "en" ? "SW · Kiswahili" : "EN · English"}
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="dialog-backdrop fixed inset-0 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink-950 text-ink-100 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Dodoma SME Suite home">
            <Logo className="h-9 w-9" />
            <span className="font-display text-fluid-sm font-bold leading-tight text-white">
              Dodoma <span className="text-brand-400">SME</span>
            </span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-200 hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pt-5">
          <LangToggle />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Main">
          {nav.map(({ to, end, icon: Icon, key }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex min-h-11 items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-700/90 text-white shadow-sm"
                    : "text-ink-300 hover:bg-white/10 hover:text-white",
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium text-ink-300 hover:bg-white/10 hover:text-white"
          >
            <LifeBuoy className="h-5 w-5" aria-hidden="true" />
            {t("nav.landing")}
          </Link>
          <button
            onClick={() => navigate("/")}
            className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-fluid-sm font-medium text-ink-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Logout / Ondoka
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-stone-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-ink-900 hover:bg-stone-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex flex-1 items-center gap-2">
            <h1 className="truncate font-display text-fluid-base font-semibold text-ink-950">
              Mjini General Store
            </h1>
            <span className="hidden rounded-full bg-brand-100 px-2.5 py-0.5 text-fluid-xs font-semibold text-brand-900 sm:inline-flex">
              Dodoma Centre
            </span>
          </div>
          <button
            className="relative grid h-10 w-10 place-items-center rounded-xl text-ink-700 hover:bg-stone-100"
            aria-label="Notifications, 2 unread"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
          </button>
          <div className="hidden sm:block">
            <LangToggle compact />
          </div>
          <button
            className="flex items-center gap-2.5 rounded-xl p-1 pr-2 hover:bg-stone-100"
            aria-label="Account menu"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900 font-display text-fluid-sm font-bold text-white">
              AN
            </span>
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-fluid-sm font-semibold text-ink-950">Amina Nyerere</span>
              <span className="block text-fluid-xs text-stone-500">Admin</span>
            </span>
          </button>
        </header>

        <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Skip link (sits above everything) */}
      </div>
    </div>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content · Ruka kwenda yaliyomo
    </a>
  );
}