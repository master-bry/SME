import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Languages, Lock, Mail, ShieldCheck, Store, UserRound } from "lucide-react";
import { BrandWordmark, Button, Field } from "../components/ui";
import { useApp } from "../lib/db";
import { useI18n } from "../lib/i18n";
import { PlatformRole } from "../lib/plans";

const DEMO = [
  {
    role: PlatformRole.Superadmin,
    label: "Super Admin",
    desc: "Dhibiti biashara & subscription / Manage businesses & subs",
    email: "superadmin@dodoma-sme.app",
    password: "Super@1234",
    icon: ShieldCheck,
  },
  {
    role: PlatformRole.Admin,
    label: "Shop Admin",
    desc: "Mjini General Store · Timu / Team",
    email: "admin@mjini.co.tz",
    password: "Admin@1234",
    icon: Store,
  },
  {
    role: PlatformRole.Cashier,
    label: "Cashier",
    desc: "POS & Masoko / Sales",
    email: "neema@mjini.co.tz",
    password: "Cash@1234",
    icon: UserRound,
  },
];

export default function Login() {
  const { lang, setLang } = useI18n();
  const sw = lang === "sw";
  const { db, currentUser, login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  if (currentUser) {
    return <Navigate to={currentUser.role === PlatformRole.Superadmin ? "/admin" : "/app"} replace />;
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError(sw ? "Jaza barua pepe na nenosiri." : "Please enter email and password.");
      return;
    }
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Failed / Imeshindikana.");
      return;
    }
    const found = db.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    )!;
    navigate(found.role === PlatformRole.Superadmin ? "/admin" : "/app", { replace: true });
  };

  const fill = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:justify-center">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Home">
            <BrandWordmark />
          </Link>
          <button
            onClick={() => setLang(sw ? "en" : "sw")}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-stone-300 px-3.5 text-fluid-sm font-semibold text-ink-900 hover:bg-stone-100"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {sw ? "English" : "Kiswahili"}
          </button>
        </div>

        <div className="mx-auto mt-10 w-full max-w-md lg:mt-0">
          <h1 className="font-display text-fluid-3xl font-bold tracking-tight text-ink-950">
            {sw ? "Karibu tena 👋" : "Welcome back 👋"}
          </h1>
          <p className="mt-2 text-fluid-base text-stone-600">
            {sw ? "Ingia kuendelea na duka lako." : "Log in to continue to your shop."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <Field label={sw ? "Barua pepe" : "Email address"} htmlFor="email">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cashier@duka.co.tz"
                  className="min-h-12 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
                />
              </div>
            </Field>

            <Field label={sw ? "Nenosiri" : "Password"} htmlFor="password">
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="min-h-12 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-11 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-ink-950"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            </Field>

            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm font-medium text-red-800">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              {sw ? "Ingia" : "Log in"}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </form>

          {/* Demo quick login */}
          <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3.5">
            <p className="font-display text-fluid-sm font-bold text-brand-900">
              {sw ? "Akaunti za mazoezi / Demo accounts" : "Demo accounts"}
            </p>
            <ul className="mt-2.5 space-y-2">
              {DEMO.map((d) => (
                <li key={d.role}>
                  <button
                    type="button"
                    onClick={() => fill(d.email, d.password)}
                    className="flex w-full items-center gap-3 rounded-xl border border-brand-200/70 bg-white px-3.5 py-2.5 text-left transition-colors hover:border-brand-400 hover:bg-brand-50"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-800">
                      <d.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-fluid-sm font-semibold text-ink-950">{sw ? d.label : d.label}</span>
                      <span className="block truncate text-fluid-xs text-stone-500">{d.desc}</span>
                    </span>
                    <span className="truncate rounded-lg bg-stone-50 px-2 py-1 font-mono text-fluid-xs text-stone-600">{d.email}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-center text-fluid-sm text-stone-500">
            {sw ? "Bado huna akaunti?" : "Don't have an account?"}{" "}
            <Link to="/" className="font-semibold text-brand-800 hover:underline">
              {sw ? "Jisajili bure" : "Sign up free"}
            </Link>
          </p>
        </div>
      </div>

      {/* Brand side */}
      <div className="bg-grid-light relative hidden overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-fluid-xs font-bold uppercase tracking-wider text-brand-100">
            Dodoma SME · POS · Inventory · Accounting
          </p>
          <h2 className="mt-6 max-w-md font-display text-fluid-4xl font-bold leading-tight">
            {sw ? "Utafurahia ripoti juu ya biashara yako." : "A clear picture of your business."}
          </h2>
          <p className="mt-4 max-w-md text-fluid-lg text-brand-100">
            {sw
              ? "Mauzo, bidhaa, wateja na faida — vyote mahali pamoja."
              : "Sales, stock, customers and profit — all in one place."}
          </p>
        </div>
        <div className="relative space-y-3">
          {[
            { t: sw ? "Mauzo ya leo / Today's sales" : "Today's sales", d: "TZS 512,000", up: "+18% vs / ikilinganishwa na wiki" },
            { t: sw ? "Bidhaa chache / Low stock alerts" : "Low stock alerts", d: "3 bidhaa / products", up: sw ? "Agiza tena" : "Reorder now" },
            { t: sw ? "Wateja wakurudiao / Repeat customers" : "Repeat customers", d: "94 leo / today", up: "+12% mwezi / this month" },
          ].map((s) => (
            <div key={s.t} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-fluid-xs uppercase tracking-wider text-brand-200">{s.t}</p>
                <p className="font-display text-fluid-lg font-bold">{s.d}</p>
                <p className="text-fluid-xs text-ink-200">{s.up}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="relative text-fluid-xs text-ink-200">
          © 2026 Dodoma SME Management Suite · WCAG 2.1 AA · Bilingual EN/SW
        </p>
      </div>
    </div>
  );
}