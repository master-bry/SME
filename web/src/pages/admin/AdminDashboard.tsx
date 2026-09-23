import { Link } from "react-router-dom";
import { Store, Users, CreditCard, TrendingUp, ShieldCheck, Plus } from "lucide-react";
import { Badge, Button, Card, StatCard, Table, Td, Th, THead } from "../../components/ui";
import { useApp } from "../../lib/db";
import { useI18n } from "../../lib/i18n";
import { fmtTZS } from "../../lib/mockData";
import { businessTypeLabel, planById, PlatformRole, TIER_LIST, TIER_LABEL, TIER_TONE } from "../../lib/plans";
import { daysLeft, fmtDate } from "../../lib/utils";

export default function AdminDashboard() {
  const { db, userOf } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  const active = db.businesses.filter((b) => b.isActive).length;
  const mrr = db.businesses
    .filter((b) => b.isActive)
    .reduce((a, b) => a + planById(b.subscriptionTier).priceTZS, 0);
  const expirySoon = db.businesses.filter((b) => b.isActive && daysLeft(b.subscriptionEnd) <= 30).length;

  const tierCounts = db.businesses.reduce<Record<string, number>>((acc, b) => {
    acc[b.subscriptionTier] = (acc[b.subscriptionTier] ?? 0) + 1;
    return acc;
  }, {});
  const maxTier = Math.max(1, ...Object.values(tierCounts));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Muhtasari wa mfumo" : "Platform overview"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Anwani ya biashara, subscription na watumiaji wote." : "All businesses, subscriptions & users."}
          </p>
        </div>
        <Link to="/admin/businesses">
          <Button>
            <Plus className="h-4 w-4" aria-hidden="true" />
            {sw ? "Ongeza biashara" : "Add business"}
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={sw ? "Biashara zote" : "Total businesses"} value={String(db.businesses.length)} delta={`${active} ${sw ? "hai" : "active"}`} icon={<Store className="h-5 w-5" />} hint={sw ? `+${db.businesses.filter((b) => isRecentMonth(b.createdAt)).length} mwezi huu` : `+${db.businesses.filter((b) => isRecentMonth(b.createdAt)).length} this month`} />
        <StatCard label="MRR" value={fmtTZS(mrr)} delta="+9.4%" deltaTone="green" icon={<CreditCard className="h-5 w-5" />} hint={sw ? "kutoka kwa mpango hai" : "from active plans"} />
        <StatCard label={sw ? "Watumiaji wote" : "Total users"} value={String(db.users.filter((u) => u.role !== PlatformRole.Superadmin).length)} icon={<Users className="h-5 w-5" />} hint={`${db.users.filter((u) => u.role === PlatformRole.Cashier).length} cashiers / ${db.users.filter((u) => u.role === PlatformRole.Manager).length} managers`} />
        <StatCard label={sw ? "Subscriptions kuisha karibu" : "Expiring soon"} value={String(expirySoon)} deltaTone="red" icon={<TrendingUp className="h-5 w-5" />} hint={sw ? "ndani ya siku 30" : "within 30 days"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Tier distribution */}
        <Card>
          <h3 className="mb-4 font-display text-fluid-lg font-semibold text-ink-950">
            {sw ? "Mgawanyo wa mpango" : "Plan distribution"}
          </h3>
          <ul className="space-y-4">
            {TIER_LIST.map((id) => {
              const label = TIER_LABEL[id];
              const tierPlan = planById(id);
              return (
                <li key={id}>
                  <div className="mb-1 flex items-center justify-between text-fluid-sm">
                    <span className="font-semibold text-ink-900">
                      {label}
                      <span className="ml-2 text-stone-400">· {fmtTZS(tierPlan.priceTZS)}/mo</span>
                    </span>
                    <span className="font-semibold text-ink-950">{tierCounts[id] ?? 0}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100" role="progressbar" aria-valuenow={tierCounts[id] ?? 0} aria-valuemin={0} aria-valuemax={maxTier} aria-label={label}>
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${((tierCounts[id] ?? 0) / maxTier) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 rounded-2xl bg-ink-950 p-4 text-white">
            <p className="text-fluid-xs uppercase tracking-wider text-ink-300">{sw ? "Thamani ya mwaka (ARR)" : "Annualized value"}</p>
            <p className="mt-1 font-display text-fluid-2xl font-bold text-gold-400">{fmtTZS(mrr * 12)}</p>
          </div>
        </Card>

        {/* Recent businesses */}
        <Card>
          <h3 className="mb-4 font-display text-fluid-lg font-semibold text-ink-950">
            {sw ? "Biashara za hivi karibuni" : "Recent businesses"}
          </h3>
          <ul className="space-y-3">
            {db.businesses.slice(-4).reverse().map((b) => (
              <li key={b.id}>
                <Link to={`/admin/businesses/${b.id}`} className="flex items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-3.5 transition-colors hover:border-brand-300 hover:bg-white">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-700 font-display text-fluid-sm font-bold text-white">
                      {b.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-fluid-sm font-semibold text-ink-950">{b.name}</span>
                      <span className="block truncate text-fluid-xs text-stone-500">
                        {businessTypeLabel(b.type, sw)} · {userOf(b.ownerId)?.name}
                      </span>
                    </span>
                  </span>
<Badge tone={TIER_TONE[b.subscriptionTier]}>{TIER_LABEL[b.subscriptionTier]}</Badge>
                </Link>
              </li>
            ))}
            {db.businesses.length === 0 && (
              <li className="text-fluid-sm text-stone-500">{sw ? "Hakuna biashara bado." : "No businesses yet."}</li>
            )}
          </ul>
          <Link to="/admin/businesses" className="mt-4 inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-brand-800 hover:underline">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {sw ? "Simamia biashara zote" : "Manage all businesses"}
          </Link>
        </Card>
      </div>

      {/* Account status table */}
      <Card>
        <h3 className="mb-4 font-display text-fluid-lg font-semibold text-ink-950">
          {sw ? "Hali ya akaunti" : "Account status"}
        </h3>
        <Table>
          <THead>
            <Th>{sw ? "Biashara" : "Business"}</Th>
            <Th>{sw ? "Mmiliki" : "Owner"}</Th>
            <Th>{sw ? "Mpango" : "Plan"}</Th>
            <Th>{sw ? "Kumalizika" : "Renewal"}</Th>
            <Th>{sw ? "Siku zilizobaki" : "Days left"}</Th>
            <Th>{sw ? "Hali" : "Status"}</Th>
          </THead>
          <tbody>
            {db.businesses
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((b) => {
                const dl = daysLeft(b.subscriptionEnd);
                return (
                  <tr key={b.id} className="border-b border-stone-100 last:border-0">
                    <Td>
                      <Link to={`/admin/businesses/${b.id}`} className="font-semibold text-ink-950 hover:text-brand-800 hover:underline">
                        {b.name}
                      </Link>
                      <span className="block text-fluid-xs text-stone-500">{businessTypeLabel(b.type, sw)}</span>
                    </Td>
                    <Td className="text-stone-600">{userOf(b.ownerId)?.name ?? "—"}</Td>
                    <Td><Badge tone={TIER_TONE[b.subscriptionTier]}>{TIER_LABEL[b.subscriptionTier]}</Badge></Td>
                    <Td className="text-stone-500">{fmtDate(b.subscriptionEnd, sw)}</Td>
                    <Td>
                      <Badge tone={dl <= 30 ? "red" : dl <= 60 ? "amber" : "green"}>{dl} {sw ? "siku" : "days"}</Badge>
                    </Td>
                    <Td><Badge tone={b.isActive ? "green" : "red"}>{b.isActive ? (sw ? "Hai" : "Active") : (sw ? "Imefungwa" : "Disabled")}</Badge></Td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

function isRecentMonth(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
}