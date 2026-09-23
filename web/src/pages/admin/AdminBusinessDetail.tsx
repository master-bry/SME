import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Mail, MapPin, Phone, Power, Store, Trash2, UserCog } from "lucide-react";
import { Badge, Button, Card, CardHeader, Select, Field } from "../../components/ui";
import UserManagement from "../../components/UserManagement";
import { useApp } from "../../lib/db";
import { useI18n } from "../../lib/i18n";
import { fmtTZS } from "../../lib/mockData";
import { PLANS, Tier, TIER_LABEL, TIER_TONE, planById } from "../../lib/plans";
import { daysLeft, fmtDate, fmtUserInitials } from "../../lib/utils";

export default function AdminBusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const { businessById, userOf, setTier, toggleBusinessActive, deleteBusiness, updateUser } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";
  const navigate = useNavigate();

  const biz = businessById(id ?? "");
  const owner = biz ? userOf(biz.ownerId) : undefined;

  const [tier, setTierState] = useState<Tier>(biz?.subscriptionTier ?? Tier.Professional);
  const [months, setMonths] = useState(1);

  if (!biz) {
    return (
      <Card className="flex flex-col items-center gap-4 py-12 text-center">
        <Store className="h-10 w-10 text-stone-300" aria-hidden="true" />
        <p className="font-display text-fluid-lg font-semibold text-ink-950">{sw ? "Biashara haikupatikana" : "Business not found"}</p>
        <Link to="/admin/businesses"><Button variant="secondary"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {sw ? "Rudi" : "Back"}</Button></Link>
      </Card>
    );
  }

  const dl = daysLeft(biz.subscriptionEnd);
  const cap = planById(biz.subscriptionTier).users;

  return (
    <div className="space-y-6">
      <Link to="/admin/businesses" className="inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-brand-800 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {sw ? "Rudi kwa biashara" : "Back to businesses"}
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-700 font-display text-fluid-xl font-bold text-white">
            {biz.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">{biz.name}</h2>
              <Badge tone={TIER_TONE[biz.subscriptionTier]}>{TIER_LABEL[biz.subscriptionTier]}</Badge>
              <Badge tone={biz.isActive ? "green" : "red"}>{biz.isActive ? (sw ? "Hai" : "Active") : (sw ? "Imefungwa" : "Disabled")}</Badge>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-fluid-sm text-stone-500">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" /> {biz.city}, {biz.region}</span>
              <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" aria-hidden="true" /> {biz.phone || "—"}</span>
              <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" aria-hidden="true" /> {biz.email || "—"}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm" onClick={() => toggleBusinessActive(biz.id)} aria-pressed={biz.isActive}>
            <Power className="h-4 w-4" aria-hidden="true" />
            {biz.isActive ? (sw ? "Funga" : "Disable") : (sw ? "Washa" : "Enable")}
          </Button>
          <Button variant="danger" size="sm" onClick={() => {
            if (confirm(sw ? `Futa kabisa ${biz.name}?` : `Permanently delete ${biz.name}?`)) {
              deleteBusiness(biz.id);
              navigate("/admin/businesses");
            }
          }}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
        {/* Subscription + owner */}
        <div className="space-y-6">
          <Card>
            <CardHeader title={sw ? "Subscription" : "Subscription"} subtitle={sw ? "Badilisha mpango na muda" : "Change plan & duration"} />
            <div className="flex items-center justify-between rounded-2xl bg-ink-950 p-4 text-white">
              <div>
                <p className="text-fluid-xs uppercase tracking-wider text-ink-300">{sw ? "Malipo ya kila mwezi" : "Monthly price"}</p>
                <p className="font-display text-fluid-2xl font-bold text-gold-400">{fmtTZS(planById(biz.subscriptionTier).priceTZS)}</p>
              </div>
              <div className="text-right">
                <Badge tone={dl <= 30 ? "red" : dl <= 60 ? "amber" : "green"}>{dl} {sw ? "siku zimesalia" : "days left"}</Badge>
                <p className="mt-1 text-fluid-xs text-ink-200">{sw ? "Kumalizika" : "Renews"}: {fmtDate(biz.subscriptionEnd, sw)}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Select label={sw ? "Mpango" : "Plan"} value={tier} onChange={(e) => setTierState(e.target.value as Tier)}>
                {PLANS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {fmtTZS(p.priceTZS)}/mo · {p.users === Infinity ? "∞ users" : `${p.users} users`}</option>
                ))}
              </Select>
              <Field label={sw ? "Ongeza miezi" : "Extend months"} htmlFor="months">
                <input id="months" type="number" min={1} max={36} value={months} onChange={(e) => setMonths(Math.max(1, Number(e.target.value) || 1))} className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none" />
              </Field>
            </div>
            <Button className="mt-4 w-full" onClick={() => setTier(biz.id, tier, months)}>
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              {sw ? "Hifadhi mabadiliko ya subscription" : "Apply subscription change"}
            </Button>
            <p className="mt-3 text-fluid-xs text-stone-500">
              {cap === Infinity
                ? (sw ? "Enterprise: watumiaji wasio na kikomo." : "Enterprise: unlimited users.")
                : (sw ? `Mipaka ya sasa: ${cap} watumiaji hai.` : `Current cap: ${cap} active users.`)}
            </p>
          </Card>

          <Card>
            <CardHeader title={sw ? "Mmiliki / Owner" : "Owner"} subtitle={sw ? "Admin wa duka" : "Shop admin"} />
            {owner ? (
              <div className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-100 font-display text-fluid-sm font-bold text-gold-800">{fmtUserInitials(owner.name)}</span>
                <div>
                  <p className="flex items-center gap-2 font-semibold text-ink-950">
                    {owner.name}
                    <UserCog className="h-4 w-4 text-gold-600" aria-label="Owner" />
                  </p>
                  <p className="text-fluid-xs text-stone-500">{owner.email} · {owner.phone || "no phone"}</p>
                </div>
              </div>
            ) : (
              <p className="text-fluid-sm text-stone-500">{sw ? "Mmiliki hakuonekana." : "Owner not found."}</p>
            )}
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => {
              const n = prompt(sw ? "Jina jipya la mmiliki:" : "New owner name:", owner?.name ?? "");
              if (n?.trim() && owner) updateUser(owner.id, { name: n.trim() });
            }}>
              {sw ? "Hariri jina la mmiliki" : "Edit owner name"}
            </Button>
            <div className="mt-4 grid grid-cols-2 gap-3 text-fluid-sm">
              <div className="rounded-2xl bg-stone-50 p-3.5">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Iliundwa" : "Created"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{fmtDate(biz.createdAt, sw)}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-3.5">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Aina" : "Type"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{biz.type}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Team management */}
        <UserManagement
          businessId={biz.id}
          title={sw ? "Timu ya watumiaji" : "Team & users"}
          subtitle={`${biz.name} · ${TIER_LABEL[biz.subscriptionTier]} plan`}
        />
      </div>
    </div>
  );
}