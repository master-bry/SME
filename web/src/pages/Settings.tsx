import { useState } from "react";
import { Landmark, Bell, Languages, ShieldCheck, Users, Save } from "lucide-react";
import { Badge, Button, Card, CardHeader, Field, Input, Select } from "../components/ui";
import { useI18n, type Lang } from "../lib/i18n";

export default function Settings() {
  const { t, lang, setLang } = useI18n();
  const sw = lang === "sw";
  const [saved, setSaved] = useState(false);
  const [currency, setCurrency] = useState("TZS");

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Mipangilio" : "Settings"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Malipo, lugha na timu" : "Billing, language and team"}
          </p>
        </div>
        <Button onClick={save}>
          <Save className="h-4 w-4" aria-hidden="true" />
          {sw ? "Hifadhi" : t("common.save")}
        </Button>
      </div>

      {saved && (
        <p role="status" className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-fluid-sm font-semibold text-brand-900">
          ✓ {sw ? "Imesajiliwa." : "Saved."}
        </p>
      )}

      {/* Business */}
      <Card>
        <CardHeader title={sw ? "Taarifa za biashara" : "Business profile"} subtitle="Mjini General Store · Dodoma Centre" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={sw ? "Jina la biashara" : "Business name"} defaultValue="Mjini General Store" />
          <Select label={sw ? "Aina ya biashara" : "Business type"} defaultValue="retail">
            <option value="retail">Retail / Rejareja</option>
            <option value="restaurant">Restaurant / Mkahawa</option>
            <option value="pharmacy">Pharmacy / Duka la dawa</option>
            <option value="salon">Salon</option>
            <option value="clinic">Clinic / Kliniki</option>
          </Select>
          <Input label={sw ? "Mmiliki" : "Owner"} defaultValue="Amina Nyerere" />
          <Input label={sw ? "Simu" : "Phone"} defaultValue="+255 712 000 111" />
          <Input label="Email" type="email" defaultValue="hello@mjinistore.co.tz" />
          <Select label={sw ? "Mji" : "City"} defaultValue="Dodoma">
            <option>Dodoma</option>
            <option>Iringa</option>
            <option>Mbeya</option>
          </Select>
        </div>
      </Card>

      {/* Language & region */}
      <Card>
        <CardHeader title={sw ? "Lugha & eneo" : "Language & region"} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={sw ? "Lugha ya mfumo" : "Interface language"} htmlFor="lang">
            <select
              id="lang"
              value={lang as Lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </Field>
          <Field label="Currency / Fedha" htmlFor="currency">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            >
              <option value="TZS">TZS — Tanzanian Shilling</option>
              <option value="USD">USD — US Dollar</option>
            </select>
          </Field>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-800">
              <Languages className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-fluid-sm font-semibold text-ink-950">EN / SW</p>
              <p className="text-fluid-xs text-stone-500">{sw ? "Kiswahili na Kiingereza" : "Swahili & English"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-800">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-fluid-sm font-semibold text-ink-950">{sw ? "Fedha" : "Currency"}</p>
              <p className="text-fluid-xs text-stone-500">{currency}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-800">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-fluid-sm font-semibold text-ink-950">WCAG 2.1 AA</p>
              <p className="text-fluid-xs text-stone-500">{sw ? "Inapatikana / Accessible" : "Accessibility built in"}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader title={sw ? "Ujumbe na tahadhari" : "Notifications & alerts"} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Bell className="h-5 w-5" aria-hidden="true" />, label: sw ? "Bidhaa zinaisha" : "Low stock alerts", on: true },
            { icon: <Bell className="h-5 w-5" aria-hidden="true" />, label: sw ? "Ripoti ya mauzo ya kila siku" : "Daily sales report", on: true },
            { icon: <Bell className="h-5 w-5" aria-hidden="true" />, label: sw ? "Ripoti za kila wiki (email)" : "Weekly email report", on: false },
            { icon: <Bell className="h-5 w-5" aria-hidden="true" />, label: sw ? "Usalama: mazoezi ya kuingia" : "Login activity alerts", on: true },
          ].map((n) => (
            <li key={n.label} className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3.5">
              <span className="flex items-center gap-3 text-fluid-sm font-medium text-ink-900">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand-800">{n.icon}</span>
                {n.label}
              </span>
              <input
                type="checkbox"
                defaultChecked={n.on}
                aria-label={n.label}
                className="h-5 w-5 rounded border-stone-300 text-brand-700 focus:ring-brand-500"
              />
            </li>
          ))}
        </ul>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader title={sw ? "Timu na majukumu" : "Team & roles"} subtitle={sw ? "Professional: watumiaji 5" : "Professional plan: 5 users"} />
        <ul className="space-y-2.5">
          {[
            { name: "Amina Nyerere", role: "Admin", email: "admin@mjini.co.tz" },
            { name: "Neema John", role: "Cashier / Muuzaji", email: "neema@mjini.co.tz" },
            { name: "Baba Seif", role: "Manager / Meneja", email: "seif@mjini.co.tz" },
          ].map((u) => (
            <li key={u.email} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-100 px-4 py-3">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-fluid-sm font-bold text-brand-900">
                  {u.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-fluid-sm font-semibold text-ink-950">{u.name}</span>
                  <span className="block text-fluid-xs text-stone-500">{u.email}</span>
                </span>
              </span>
              <span className="flex items-center gap-3">
                <Badge tone={u.role === "Admin" ? "amber" : u.role.includes("Cashier") ? "stone" : "green"}>{u.role}</Badge>
                <Button variant="ghost" size="sm">
                  {t("common.edit")}
                </Button>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3">
          <span className="flex items-center gap-2 text-fluid-sm font-semibold text-brand-900">
            <Users className="h-4 w-4" aria-hidden="true" />
            {sw ? "Mpango: Professional · TZS 50,000/mwezi" : "Plan: Professional · TZS 50,000/mo"}
          </span>
          <Badge tone="green">{sw ? "Imelipwa" : "Active"}</Badge>
        </div>
      </Card>
    </div>
  );
}