import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Store, Eye, Power, Trash2, ShieldCheck } from "lucide-react";
import { Badge, Button, Card, EmptyState, Field, Input, Modal, Select, Table, Td, Th, THead } from "../../components/ui";
import { useApp } from "../../lib/db";
import { useI18n } from "../../lib/i18n";
import { fmtTZS } from "../../lib/mockData";
import { BUSINESS_TYPES, businessTypeLabel, BusinessType, planById, PLANS, Tier, TIER_LABEL, TIER_TONE } from "../../lib/plans";
import { daysLeft, fmtDate, fmtUserInitials } from "../../lib/utils";

const emptyForm = {
  name: "",
  type: BusinessType.Retail,
  city: "Dodoma",
  region: "Dodoma Mjini",
  phone: "",
  email: "",
  tier: Tier.Professional,
  months: 12,
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  ownerPassword: "",
};

export default function AdminBusinesses() {
  const { db, addBusiness, toggleBusinessActive, deleteBusiness, userOf, usersOfBusiness } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return db.businesses
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((b) => (tierFilter === "all" ? true : b.subscriptionTier === tierFilter))
      .filter((b) => !q || b.name.toLowerCase().includes(q) || (userOf(b.ownerId)?.name.toLowerCase() ?? "").includes(q));
  }, [db.businesses, query, tierFilter, userOf]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.ownerName || !form.ownerEmail || !form.ownerPassword || form.months < 1) {
      setError(sw ? "Jaza jina la biashara na taarifa zote za mmiliki." : "Fill business name and all owner details.");
      return;
    }
    const res = addBusiness({
      name: form.name,
      type: form.type,
      city: form.city,
      region: form.region,
      phone: form.phone,
      email: form.email,
      tier: form.tier,
      months: form.months,
      owner: {
        name: form.ownerName,
        email: form.ownerEmail,
        phone: form.ownerPhone,
        password: form.ownerPassword,
      },
    });
    if (!res.ok) {
      setError(res.error ?? "Failed / Imeshindikana.");
      return;
    }
    setOpen(false);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Biashara" : "Businesses"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Jumla " : "Total "} {db.businesses.length} · {sw ? "mmiliki ni admin wa duka lake" : "each owner is admin of their shop"}
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {sw ? "Ongeza biashara mpya" : "Add business"}
        </Button>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sw ? "Tafuta biashara au mmiliki…" : "Search business or owner…"}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </div>
          <Select aria-label="Tier" value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} className="w-48">
            <option value="all">{sw ? "Mipango yote" : "All plans"}</option>
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>{p.name} · {fmtTZS(p.priceTZS)}</option>
            ))}
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={<Store className="h-6 w-6" />} title={sw ? "Hakuna biashara" : "No businesses"} body={sw ? "Ongeza biashara ya kwanza." : "Add your first business."} />
        ) : (
          <Table>
            <THead>
              <Th>{sw ? "Biashara" : "Business"}</Th>
              <Th>{sw ? "Mmiliki (Admin)" : "Owner (Admin)"}</Th>
              <Th>{sw ? "Watumiaji" : "Users"}</Th>
              <Th>{sw ? "Mpango" : "Plan"}</Th>
              <Th>{sw ? "Uhuishaji" : "Renewal"}</Th>
              <Th>{sw ? "Hali" : "Status"}</Th>
              <Th className="text-right">{sw ? "Hatua" : "Actions"}</Th>
            </THead>
            <tbody>
              {rows.map((b) => {
                const o = userOf(b.ownerId);
                const team = usersOfBusiness(b.id);
                const dl = daysLeft(b.subscriptionEnd);
                const cap = planById(b.subscriptionTier).users;
                return (
                  <tr key={b.id} className="border-b border-stone-100 last:border-0">
                    <Td>
                      <Link to={`/admin/businesses/${b.id}`} className="font-semibold text-ink-950 hover:text-brand-800 hover:underline">
                        {b.name}
                      </Link>
                      <span className="block text-fluid-xs text-stone-500">{businessTypeLabel(b.type, sw)} · {b.city}, {b.region}</span>
                    </Td>
                    <Td>
                      {o ? (
                        <span className="flex items-center gap-2.5">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-100 text-fluid-xs font-bold text-gold-800">{fmtUserInitials(o.name)}</span>
                          <span>
                            <span className="flex items-center gap-1.5 text-fluid-sm font-semibold text-ink-950">
                              {o.name}
                              <ShieldCheck className="h-3.5 w-3.5 text-gold-600" aria-label="Owner" />
                            </span>
                            <span className="block text-fluid-xs text-stone-500">{o.email}</span>
                          </span>
                        </span>
                      ) : "—"}
                    </Td>
                    <Td>
                      <span className={`font-semibold ${team.length >= cap ? "text-amber-700" : "text-ink-950"}`}>
                        {team.length}
                        {cap === Infinity ? "" : `/${cap}`}
                      </span>
                    </Td>
                    <Td><Badge tone={TIER_TONE[b.subscriptionTier]}>{TIER_LABEL[b.subscriptionTier]}</Badge></Td>
                    <Td>
                      <span className="text-fluid-sm text-stone-600">{fmtDate(b.subscriptionEnd, sw)}</span>
                      <span className="block text-fluid-xs">
                        <Badge tone={dl <= 30 ? "red" : dl <= 60 ? "amber" : "green"}>{dl} {sw ? "siku" : "days"}</Badge>
                      </span>
                    </Td>
                    <Td><Badge tone={b.isActive ? "green" : "red"}>{b.isActive ? (sw ? "Hai" : "Active") : (sw ? "Imefungwa" : "Disabled")}</Badge></Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Link to={`/admin/businesses/${b.id}`} aria-label={`View ${b.name}`}>
                          <Button variant="secondary" size="sm"><Eye className="h-4 w-4" aria-hidden="true" /></Button>
                        </Link>
                        <Button variant="secondary" size="sm" onClick={() => toggleBusinessActive(b.id)} aria-pressed={b.isActive}>
                          <Power className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => {
                          if (confirm(sw ? `Futa kabisa ${b.name} na watumiaji wake?` : `Permanently delete ${b.name} and its users?`)) deleteBusiness(b.id);
                        }} aria-label={`Delete ${b.name}`}>
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Add business modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={sw ? "Ongeza biashara mpya" : "Add new business"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>{sw ? "Ghairi" : "Cancel"}</Button>
            <Button type="submit" form="biz-form">{sw ? "Hifadhi biashara + mmiliki" : "Save business + owner"}</Button>
          </>
        }
      >
        <form id="biz-form" onSubmit={submit} className="space-y-5" noValidate>
          <fieldset className="rounded-2xl border border-stone-200 p-4">
            <legend className="px-2 text-fluid-sm font-bold text-ink-950">1 · {sw ? "Taarifa za biashara" : "Business details"}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input label={sw ? "Jina la biashara/duka" : "Business name"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Mjini General Store" required />
              </div>
              <Select label={sw ? "Aina" : "Type"} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as BusinessType })}>
                {BUSINESS_TYPES.map((bt) => (
                  <option key={bt.id} value={bt.id}>{sw ? bt.sw : bt.en}</option>
                ))}
              </Select>
              <Select label={sw ? "Mpango (subscription)" : "Subscription plan"} value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as Tier })}>
                {PLANS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {fmtTZS(p.priceTZS)}/mo · {p.users === Infinity ? "unlimited" : `${p.users} user${p.users === 1 ? "" : "s"}`}</option>
                ))}
              </Select>
              <Input label={sw ? "Muddi (miezi)" : "Duration (months)"} type="number" min={1} max={36} value={String(form.months)} onChange={(e) => setForm({ ...form, months: Math.max(1, Number(e.target.value) || 1) })} />
              <Select label={sw ? "Mji" : "City"} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                {["Dodoma", "Iringa", "Mbeya", "Dar es Salaam", "Arusha"].map((c) => <option key={c}>{c}</option>)}
              </Select>
              <Input label={sw ? "Wilaya/Mtaa" : "District / Area"} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="Dodoma Mjini" />
              <Input label={sw ? "Simu ya duka" : "Shop phone"} inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+255 7…" />
              <Input label="Email ya duka" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="hello@duka.co.tz" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-brand-200 bg-brand-50/40 p-4">
            <legend className="px-2 text-fluid-sm font-bold text-brand-900">2 · {sw ? "Mmiliki (atakuwa Admin wa duka)" : "Owner (becomes shop Admin)"}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input label={sw ? "Jina kamili" : "Full name"} value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Amina Nyerere" required />
              </div>
              <Input label="Email (login)" type="email" value={form.ownerEmail} onChange={(e) => setForm({ ...form, ownerEmail: e.target.value })} placeholder="admin@duka.co.tz" required />
              <Input label={sw ? "Simu" : "Phone"} inputMode="tel" value={form.ownerPhone} onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })} placeholder="+255 7…" />
              <div className="sm:col-span-2">
                <Field label={sw ? "Nenosiri la kwanza" : "Initial password"} htmlFor="owner-pass" hint={sw ? "Mmiliki atatumia hili kuingia kama admin." : "Owner uses this to log in as admin."}>
                  <input
                    id="owner-pass"
                    type="text"
                    minLength={8}
                    required
                    value={form.ownerPassword}
                    onChange={(e) => setForm({ ...form, ownerPassword: e.target.value })}
                    placeholder="Min 8 characters"
                    className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
                  />
                </Field>
              </div>
            </div>
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-white px-3.5 py-3 text-fluid-xs text-gold-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              {sw
                ? "Mmiliki angetumika kiotomatiki kama Admin na anaweza kuongeza wengine kulingana na mpango (Basic 1, Professional 5, Enterprise bila kikomo)."
                : "Owner is auto-created as Admin and can add team members up to their plan limit (Basic 1, Professional 5, Enterprise unlimited)."}
            </p>
          </fieldset>

          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm font-medium text-red-800">{error}</p>
          )}
        </form>
      </Modal>
    </div>
  );
}