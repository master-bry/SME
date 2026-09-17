import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ScanLine,
  Boxes,
  TrendingUp,
  Calculator,
  HeartHandshake,
  UsersRound,
  WifiOff,
  Languages,
  Smartphone,
  ShieldCheck,
  ChevronDown,
  Store,
  LayoutDashboard,
  Receipt,
  Wallet,
} from "lucide-react";
import { BrandWordmark, ProvidersMini } from "../components/ui";
import { useI18n } from "../lib/i18n";
import { fmtTZS, fmtUSD } from "../lib/mockData";

function MiniLangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "sw" : "en")}
      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-sm font-semibold text-ink-900 shadow-sm transition-colors hover:border-brand-600 hover:text-brand-800"
      aria-label={lang === "en" ? "Badilisha lugha hadi Kiswahili" : "Switch language to English"}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {lang === "en" ? "Kiswahili" : "English"}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-fluid-xs font-semibold uppercase tracking-wider text-brand-800">
      {children}
    </p>
  );
}

const features: { icon: React.ReactNode; title: string; en: string; sw: string }[] = [
  {
    icon: <ScanLine className="h-5 w-5" aria-hidden="true" />,
    title: "Point of Sale",
    en: "Lightning-fast checkout with barcode search, split payments and SMS receipts — built for queue-busting speed.",
    sw: "Malipo ya haraka kwa utafutaji wa barcode, malipo mgawanyu na risiti ya SMS.",
  },
  {
    icon: <Boxes className="h-5 w-5" aria-hidden="true" />,
    title: "Inventory",
    en: "Real-time stock, low-stock alerts and automatic deduction on every sale. Know exactly what's on your shelf.",
    sw: "Hesabu za bidhaa kwa wakati halisi na tahadhari ya bidhaa zinazoisha.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
    title: "Analytics",
    en: "Daily, weekly and monthly reports. See top products, best days and where your money goes.",
    sw: "Ripoti za kila siku, wiki na mwezi kwa maarifa ya biashara yako.",
  },
  {
    icon: <Calculator className="h-5 w-5" aria-hidden="true" />,
    title: "Accounting",
    en: "Income, profit and loss, cash flow and TRA-ready tax reports — no spreadsheet nightmares.",
    sw: "Mapato, faida na hasara, mtiririko wa pesa na ripoti tayari kwa TRA.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" aria-hidden="true" />,
    title: "Customers & Loyalty",
    en: "Track customers, reward loyalty points, and grow repeat business from your best buyers.",
    sw: "Fuatilia wateja, toa pointi za uaminifu na ongeze wateja wa kurudia.",
  },
  {
    icon: <UsersRound className="h-5 w-5" aria-hidden="true" />,
    title: "Team & Roles",
    en: "Admin, manager and cashier roles with a full audit trail of every action in your shop.",
    sw: "Majukumu ya meneja, muuzaji na rekodi ya kila hatua kwenye duka lako.",
  },
];

const plans = [
  {
    name: "Basic",
    priceTZS: 25000,
    usd: 10,
    tagline: "For small vendors starting out",
    taglineSw: "Kwa wafanyabiashara wadogo wanaoanza",
    popular: false,
    features: ["1 & 1 user", "POS + Inventory", "Sales reports", "Receipt printing", "Email support", "Self-serve training"],
  },
  {
    name: "Professional",
    priceTZS: 50000,
    usd: 20,
    tagline: "The heart of the suite — built for growth",
    taglineSw: "Kiini cha mfumo — kwa ukuaji",
    popular: true,
    features: ["Up to 5 & 5 users", "Everything in Basic", "Customers & loyalty", "Accounting module", "Mobile money (M-Pesa, Airtel)", "SMS + email reports"],
  },
  {
    name: "Enterprise",
    priceTZS: 100000,
    usd: 40,
    tagline: "For multi-branch & growing chains",
    taglineSw: "Kwa matawi mengi na minyororo inayokua",
    popular: false,
    features: ["Unlimited users", "Everything in Professional", "Multi-branch", "API access", "Priority phone support", "Onboarding session"],
  },
];

const faqs = [
  {
    q: "Does it work without internet?",
    en: "Yes. Dodoma SME Suite is offline-first — record sales in the duka even when the network drops, and everything syncs automatically when you're back online.",
    sw: "Ndio. Mfumo unaendeleza mauzo bila mtandao na ukishakuwa mtandaoni unalinganisha data zote moja kwa moja.",
  },
  {
    q: "Can customers pay with M-Pesa or Airtel Money?",
    en: "Phase 1 supports cash at the till; M-Pesa, Airtel Money and Tigo Pesa integration arrives in Phase 2 with automatic settlement records.",
    sw: "Awamu ya kwanza inasaidia pesa taslimu; awamu ya pili itajumuisha M-Pesa, Airtel Money na Tigo Pesa.",
  },
  {
    q: "Is the system in Kiswahili?",
    en: "Karibu sana — yes! Every screen is available in English and Kiswahili, and you can switch at any time.",
    sw: "Karibu sana — ndio! Kila ukurasa unapatikana kwa Kiingereza na Kiswahili.",
  },
  {
    q: "How do I get started?",
    en: "Sign up for a 30-day free trial. We'll help you add products, print a test receipt and record your first sale — usually within a day.",
    sw: "Jisajili kwa jaribio la siku 30. Tutakusaidia kuongeza bidhaa na kupokea mauzo ya kwanza.",
  },
];

export default function Landing() {
  const { lang } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sw = lang === "sw";

  return (
    <div className="min-h-screen bg-stone-50 text-ink-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Dodoma SME Suite — home">
            <BrandWordmark />
          </Link>
          <nav className="hidden items-center gap-7 text-fluid-sm font-medium text-ink-700 md:flex" aria-label="Primary">
            <a href="#features" className="hover:text-brand-800">Features / Vituo</a>
            <a href="#why" className="hover:text-brand-800">Why / Kwa nini</a>
            <a href="#pricing" className="hover:text-brand-800">Pricing / Bei</a>
            <a href="#faq" className="hover:text-brand-800">FAQ</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <MiniLangToggle />
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-4 text-fluid-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
            >
              {sw ? "Ingia" : "Login"}
              <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-grid relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <p className="rise-in inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-fluid-xs font-bold uppercase tracking-wider text-brand-800 shadow-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {sw ? "Imefinywa kutoka Dodoma — kwa biashara za Tanzania" : "Made in Dodoma — for Tanzanian business"}
              </p>
              <h1 className="rise-in rise-in-delay-1 mt-5 font-display text-fluid-4xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-fluid-5xl">
                {sw ? (
                  <>Simamisha duka lako <span className="text-gradient-brand">kutoka simu yako.</span></>
                ) : (
                  <>Run your entire shop <span className="text-gradient-brand">from your phone.</span></>
                )}
              </h1>
              <p className="rise-in rise-in-delay-2 mt-5 max-w-xl text-fluid-lg leading-relaxed text-stone-600">
                {sw ? (
                  <>
                    Mfumo wa bei nafuu wa POS, hesabu za bidhaa, uhasibu na wateja — unafanya kazi bila wavuti,
                    kwa Kiswahili na Kiingereza, na unagharimu kuanzia TZS 25,000 kwa mwezi.
                  </>
                ) : (
                  <>
                    An affordable POS, inventory, accounting and customer platform that works offline, in
                    English and Kiswahili — from just TZS 25,000/month.
                  </>
                )}
              </p>
              <div className="rise-in rise-in-delay-2 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand-700 px-7 text-fluid-lg font-semibold text-white shadow-md shadow-brand-700/20 transition-colors hover:bg-brand-800"
                >
                  {sw ? "Anza Jaribio Bure" : "Start Free Trial"}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 text-fluid-lg font-semibold text-ink-900 hover:bg-stone-100"
                >
                  {sw ? "Ona Bei" : "See Pricing"}
                </a>
              </div>
              <div className="rise-in rise-in-delay-3 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-fluid-xs font-medium text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" aria-hidden="true" /> Mobile-first / Simu kwanza
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <WifiOff className="h-4 w-4" aria-hidden="true" /> Offline-ready / Bila mtandao
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" /> TRA-ready / Tayari kwa TRA
                </span>
              </div>
            </div>

            {/* Product mock */}
            <div className="relative rise-in rise-in-delay-2">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-200/50 via-transparent to-gold-200/50" aria-hidden="true" />
              <div className="surface relative rotate-1 rounded-3xl p-5 shadow-xl shadow-ink-900/10">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-fluid-xs font-semibold uppercase tracking-wider text-stone-500">Today / Leo</p>
                    <p className="font-display text-fluid-xl font-bold text-ink-950">TZS 512,000</p>
                  </div>
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-fluid-xs font-bold text-brand-900">
                    +18% vs/ikilinganisha
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Mauzo sold", value: "128" },
                    { label: "Wateja customers", value: "94" },
                    { label: "Bidhaa products", value: "210" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl bg-stone-50 p-3 border border-stone-100">
                      <p className="font-display text-fluid-base font-bold text-ink-950">{s.value}</p>
                      <p className="text-fluid-xs text-stone-500">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { n: "Unga wa Mahindi 2kg", p: "TZS 5,600", icon: <Store className="h-4 w-4" /> },
                    { n: "Mchele Shingo 1kg", p: "TZS 4,600", icon: <Store className="h-4 w-4" /> },
                    { n: "Sabuni ya kufulia 500g", p: "TZS 3,400", icon: <Receipt className="h-4 w-4" /> },
                  ].map((r, i) => (
                    <div key={r.n} className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-white px-3.5 py-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-800">
                        {r.icon}
                      </span>
                      <span className="flex-1 truncate text-fluid-sm font-medium text-ink-900">{r.n}</span>
                      <span className="font-display text-fluid-sm font-bold text-ink-950">{r.p}</span>
                      {i === 0 && <span className="sr-only">most popular today</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-950 px-4 py-3 text-white">
                  <span className="flex items-center gap-2 text-fluid-sm">
                    <Wallet className="h-4 w-4" aria-hidden="true" /> Mpokeaji / Till
                  </span>
                  <span className="font-display text-fluid-sm font-bold text-gold-300">TZS 21,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof / metrics band */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-stone-200 pt-8 sm:grid-cols-4">
            {[
              { v: "15,000+", l: sw ? "SMEs in Dodoma" : "SMEs in Dodoma" },
              { v: "TZS 25K–100K", l: sw ? "kwa mwezi" : "per month" },
              { v: "3 vituo", l: sw ? "POS, orodha, uhasibu" : "POS, stock, books" },
              { v: "30-day", l: sw ? "jaribio bure" : "free trial" },
            ].map((m) => (
              <div key={m.v}>
                <p className="font-display text-fluid-2xl font-bold text-ink-950">{m.v}</p>
                <p className="text-fluid-sm text-stone-500">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods strip */}
      <div className="border-y border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-fluid-sm font-semibold text-stone-500">
            {sw ? "Inakubali malipo (Awamu ya 2):" : "Accepts payments (Phase 2):"}
          </p>
          <ProvidersMini />
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>{sw ? "Vituo vya mfumo" : "The platform modules"}</SectionLabel>
          <h2 className="font-display text-fluid-3xl font-bold tracking-tight text-ink-950">
            {sw ? "Kila kitu kinachohitajika kuendesha biashara." : "Everything you need to run your business."}
          </h2>
          <p className="mt-4 text-fluid-lg text-stone-600">
            {sw
              ? "Mfumo mmoja jumuishi badala ya daftari, Excel na vikokotoo vitano."
              : "One integrated suite instead of ledger books, spreadsheets and five calculators."}
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="surface rise-in group p-6 transition-shadow duration-200 hover:shadow-lg"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white shadow-sm shadow-brand-700/25 transition-transform duration-200 group-hover:scale-105">
                {f.icon}
              </span>
              <h3 className="font-display text-fluid-lg font-semibold text-ink-950">{f.title}</h3>
              <p className="mt-2 text-fluid-base leading-relaxed text-stone-600">
                {sw ? f.sw : f.en}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Why / offline-first */}
      <section id="why" className="scroll-mt-20 bg-ink-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-fluid-xs font-semibold uppercase tracking-wider text-brand-200">
              {sw ? "Kwa nini tumeijenga hivi" : "Why we built it this way"}
            </p>
            <h2 className="font-display text-fluid-3xl font-bold tracking-tight">
              {sw ? "Imebuniwa kwa ukweli wa biashara za Tanzania." : "Designed for the realities of Tanzanian business."}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <WifiOff className="h-5 w-5" aria-hidden="true" />,
                t: sw ? "Hufanya kazi bila mtandao" : "Runs offline-first",
                en: "Interruptions happen. Sales keep recording offline and sync automatically when you reconnect.",
                sw: "Usumbufu wa mtandao hautazuia mauzo; data zinalinganisha zikiwa mtandaoni.",
              },
              {
                icon: <Languages className="h-5 w-5" aria-hidden="true" />,
                t: sw ? "Kiswahili na Kiingereza" : "Swahili & English",
                en: "Full bilingual interface your team will actually use — switch anytime.",
                sw: "Kiolesura kamili cha Kiswahili na Kiingereza kwa timu yako.",
              },
              {
                icon: <Wallet className="h-5 w-5" aria-hidden="true" />,
                t: sw ? "Weights for mobile money" : "Built for mobile money",
                en: "M-Pesa, Airtel Money and Tigo Pesa on the roadmap with automatic reconciliations.",
                sw: "M-Pesa, Airtel Money na Tigo Pesa liko katika ramani ya maendeleo.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-ink-950">
                  {c.icon}
                </span>
                <h3 className="font-display text-fluid-lg font-semibold">{c.t}</h3>
                <p className="mt-2 text-fluid-base leading-relaxed text-ink-200">{sw ? c.sw : c.en}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/40 to-ink-900 p-6 sm:grid-cols-4 sm:p-8">
            {[
              { v: "10–15%", l: sw ? "mkusanyiko wa kuhifadhi hadi kupotea" : "loss recovered from shrinkage" },
              { v: "85%", l: sw ? "biashara bado kwa kutumia kalamu" : "businesses still on paper ledgers" },
              { v: "60%+", l: sw ? "punguzo katika makosa ya malipo" : "fewer payment discrepancies" },
              { v: "<2", l: sw ? "miezi ya ulipaji wa mteja (CAC)" : "month CAC payback" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-fluid-3xl font-bold text-gold-400">{s.v}</p>
                <p className="mt-1 text-fluid-xs text-ink-200">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>{sw ? "Bei / Pricing" : "Pricing"}</SectionLabel>
          <h2 className="font-display text-fluid-3xl font-bold tracking-tight text-ink-950">
            {sw ? "Bei rahisi, yenye uwazi." : "Simple, transparent pricing."}
          </h2>
          <p className="mt-4 text-fluid-lg text-stone-600">
            {sw
              ? "Chagua kulingana na ukubwa wa biashara yako. Badilisha wakati wowote."
              : "Pick a tier that fits your shop today. Change anytime."}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-7 ${
                p.popular
                  ? "border-brand-700 bg-white shadow-xl shadow-brand-700/10"
                  : "border-stone-200 bg-white"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-700 px-3.5 py-1 text-fluid-xs font-bold text-white shadow-sm">
                  {sw ? "Maarufu / Hupendwa" : "Most popular"}
                </span>
              )}
              <h3 className="font-display text-fluid-xl font-bold text-ink-950">{p.name}</h3>
              <p className="mt-1 text-fluid-sm text-stone-500">{sw ? p.taglineSw : p.tagline}</p>
              <p className="mt-5 font-display text-fluid-3xl font-bold tracking-tight text-ink-950">
                {fmtTZS(p.priceTZS)}
                <span className="ml-1 text-fluid-sm font-medium text-stone-500">/mo</span>
              </p>
              <p className="mt-0.5 text-fluid-xs text-stone-400">
                ≈ {fmtUSD(p.usd)}/month · TZS kwa mwezi
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-fluid-sm text-ink-800">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-800">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-xl text-fluid-base font-semibold transition-colors ${
                  p.popular
                    ? "bg-brand-700 text-white hover:bg-brand-800"
                    : "border border-stone-300 bg-white text-ink-900 hover:bg-stone-50"
                }`}
              >
                {sw ? "Chagua Mpango" : "Choose plan"} — {p.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonial band */}
      <section className="bg-brand-50/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <LayoutDashboard className="mx-auto mb-4 h-8 w-8 text-brand-700" aria-hidden="true" />
          <blockquote className="font-display text-fluid-2xl font-semibold leading-snug text-ink-950">
            “{sw ? "Hapo awali nilikuwa nikipoteza pesa kwa bidhaa zilizoibwa. Sasa ninajua ni kipi kimeuzwa, na ni kwa nani." : "I used to lose money to stock shrinkage. Now I know exactly what sold and to whom."}”
          </blockquote>
          <p className="mt-4 text-fluid-sm font-semibold text-brand-800">
            mama Nyerere <span className="font-normal text-stone-500">· Mjini General Store, Dodoma</span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-fluid-3xl font-bold tracking-tight text-ink-950">
            {sw ? "Maswali ya kawaida" : "Frequently asked questions"}
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="surface overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display text-fluid-base font-semibold text-ink-950">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-stone-500 transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {open && (
                  <div className="border-t border-stone-100 px-5 pb-5 pt-3 text-fluid-base leading-relaxed text-stone-600">
                    {sw ? f.sw : f.en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="bg-grid-light relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-10 text-center text-white sm:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-fluid-3xl font-bold tracking-tight">
            {sw ? "Uko tayari kuondoa daftari la karatasi?" : "Ready to retire the paper ledger?"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fluid-lg text-brand-100">
            {sw
              ? "Jaribio la siku 30 bila malipo. Ongeza bidhaa zako na fanya mauzo ya kwanza leo."
              : "30-day free trial. Add your products and make your first sale today."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex min-h-13 items-center gap-2 rounded-xl bg-gold-500 px-7 text-fluid-lg font-bold text-ink-950 hover:bg-gold-400"
            >
              {sw ? "Anza Bure Sasa" : "Start Free Now"}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href="#features"
              className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 text-fluid-lg font-semibold text-white hover:bg-white/20"
            >
              {sw ? "Tazama vituo" : "Explore features"}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <BrandWordmark />
            <p className="mt-3 max-w-sm text-fluid-sm leading-relaxed text-stone-500">
              {sw
                ? "Mfumo wa usimamizi wa biashara kwa SMEs za Dodoma na Tanzania — unaoanza kwa bei ya TZS 25,000/mwezi."
                : "Business management for the SMEs of Dodoma and all of Tanzania — starting at TZS 25,000/month."}
            </p>
            <p className="mt-4 text-fluid-xs text-stone-400">Dodoma, Tanzania · Bilingual EN/SW · WCAG 2.1 AA</p>
          </div>
          {[
            { h: "Product / Bidhaa", links: ["Features / Vituo", "Pricing / Bei", "FAQ", "Roadmap"] },
            { h: "Company / Kampuni", links: ["About / Kuhusu", "Careers", "Press", "Contact"] },
            { h: "Legal", links: ["Privacy Policy", "Terms / Masharti", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.h}>
              <h3 className="text-fluid-sm font-semibold text-ink-950">{col.h}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-fluid-sm text-stone-500 hover:text-brand-800">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-100 py-5">
          <p className="mx-auto max-w-7xl px-4 text-fluid-xs text-stone-400 sm:px-6 lg:px-8">
            © 2026 Dodoma SME Management Suite · by Master-Bry (Brayan Hawald Ngowi). Built to WCAG 2.1 AA —{" "}
            <a href="#main" className="underline decoration-stone-300 underline-offset-2 hover:text-brand-800">
              accessibility statement
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}