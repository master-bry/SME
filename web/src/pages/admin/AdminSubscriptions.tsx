import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Search, TrendingUp } from "lucide-react";
import { Badge, Button, Card, EmptyState, Field, Modal, Select, Table, Td, Th, THead } from "../../components/ui";
import { useApp } from "../../lib/db";
import { useI18n } from "../../lib/i18n";
import { fmtTZS } from "../../lib/mockData";
import { PLANS, Tier, TIER_LABEL, TIER_TONE, planById } from "../../lib/plans";
import { daysLeft, fmtDate } from "../../lib/utils";

export default function AdminSubscriptions() {
  const { db, setTier, businessById } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editId, setEditId] = useState<string | null>(null);
  const [tier, setTierState] = useState<Tier>(Tier.Professional);
  const [months, setMonths] = useState(1);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return db.businesses
      .slice()
      .sort((a, b) => new Date(b.subscriptionEnd).getTime() - new Date(a.subscriptionEnd).getTime())
      .filter((b) => {
        const dl = daysLeft(b.subscriptionEnd);
        if (status === "expiring" && !(b.isActive && dl <= 30)) return false;
        if (status === "expired" && b.isActive) return false;
        if (status === "active" && !b.isActive) return false;
        return true;
      })
      .filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [db.businesses, query, status]);

  const editBiz = editId ? businessById(editId) : null;

  const totalMRR = db.businesses.filter((b) => b.isActive).reduce((a, b) => a + planById(b.subscriptionTier).priceTZS, 0);
  const expiringSoon = db.businesses.filter((b) => b.isActive && daysLeft(b.subscriptionEnd) <= 30).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Subscriptions" : "Subscriptions"}
          </h2>
          <p className="text-fluid-sm text-stone-500">{sw ? "Mipango na uhuishaji wa biashara zote" : "All business plans & renewals"}</p>
        </div>
        <div className="flex gap-2">
          <Card className="!p-4">
            <p className="text-fluid-xs font-medium text-stone-500">MRR</p>
            <p className="font-display text-fluid-lg font-bold text-ink-950">{fmtTZS(totalMRR)}</p>
          </Card>
          <Card className="!p-4">
            <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Zinakaribia kuisha" : "Expiring soon"}</p>
            <p className="font-display text-fluid-lg font-bold text-red-600">{expiringSoon}</p>
          </Card>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sw ? "Tafuta biashara…" : "Search business…"}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </div>
          <Select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-44">
            <option value="all">{sw ? "Zote" : "All"}</option>
            <option value="active">{sw ? "Hai" : "Active"}</option>
            <option value="expiring">{sw ? "Zinaisha siku 30" : "Expiring ≤30d"}</option>
            <option value="expired">{sw ? "Imefungwa" : "Disabled"}</option>
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={<CreditCard className="h-6 w-6" />} title={sw ? "Hakuna subscriptions" : "No subscriptions"} body={sw ? "Badilisha vichujio." : "Adjust filters."} />
        ) : (
          <Table>
            <THead>
              <Th>{sw ? "Biashara" : "Business"}</Th>
              <Th>{sw ? "Mpango" : "Plan"}</Th>
              <Th>{sw ? "Bei / mwezi" : "Monthly"}</Th>
              <Th>{sw ? "Kuanza" : "Started"}</Th>
              <Th>{sw ? "Kumalizika" : "Renews"}</Th>
              <Th>{sw ? "Hali" : "Status"}</Th>
              <Th className="text-right">{sw ? "Hatua" : "Actions"}</Th>
            </THead>
            <tbody>
              {rows.map((b) => {
                const dl = daysLeft(b.subscriptionEnd);
                return (
                  <tr key={b.id} className="border-b border-stone-100 last:border-0">
                    <Td>
                      <Link to={`/admin/businesses/${b.id}`} className="font-semibold text-ink-950 hover:text-brand-800 hover:underline">{b.name}</Link>
                    </Td>
                    <Td><Badge tone={TIER_TONE[b.subscriptionTier]}>{TIER_LABEL[b.subscriptionTier]}</Badge></Td>
                    <Td className="font-semibold">{fmtTZS(planById(b.subscriptionTier).priceTZS)}</Td>
                    <Td className="text-stone-500">{fmtDate(b.subscriptionStart, sw)}</Td>
                    <Td className="text-stone-500">{fmtDate(b.subscriptionEnd, sw)}</Td>
                    <Td><Badge tone={b.isActive ? (dl <= 30 ? "amber" : "green") : "red"}>{b.isActive ? (dl <= 30 ? sw ? "Inaisha karibu" : "Expiring" : sw ? "Hai" : "Active") : sw ? "Imefungwa" : "Disabled"}</Badge></Td>
                    <Td className="text-right">
                      <Button variant="secondary" size="sm" onClick={() => { setEditId(b.id); setTierState(b.subscriptionTier); setMonths(1); }}>
                        {sw ? "Badilisha" : "Change"}
                      </Button>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Edit subscription modal */}
      <Modal
        open={!!editBiz}
        onClose={() => setEditId(null)}
        title={sw ? "Badilisha subscription" : "Change subscription"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditId(null)}>{sw ? "Ghairi" : "Cancel"}</Button>
            <Button onClick={() => {
              if (editBiz) {
                setTier(editBiz.id, tier, months);
                setEditId(null);
              }
            }}>
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              {sw ? "Hifadhi" : "Save"}
            </Button>
          </>
        }
      >
        {editBiz && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
              <span className="font-display text-fluid-base font-semibold text-ink-950">{editBiz.name}</span>
              <Badge tone={TIER_TONE[editBiz.subscriptionTier]}>{TIER_LABEL[editBiz.subscriptionTier]}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label={sw ? "Mpango mpya" : "New plan"} value={tier} onChange={(e) => setTierState(e.target.value as Tier)}>
                {PLANS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {fmtTZS(p.priceTZS)}/mo · {p.users === Infinity ? "∞ users" : `${p.users} users`}</option>
                ))}
              </Select>
              <Field label={sw ? "Muda (miezi)" : "Duration (months)"} htmlFor="sub-months">
                <input id="sub-months" type="number" min={1} max={36} value={months} onChange={(e) => setMonths(Math.max(1, Number(e.target.value) || 1))} className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none" />
              </Field>
            </div>
            <p className="flex items-start gap-2 rounded-xl bg-brand-50 px-3.5 py-3 text-fluid-xs text-brand-900">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {sw
                ? "Mabadiliko yanaathiri muda (miezi) na watumiaji wapya wanaweza kuongezwa hadi kikomo cha mpango. Watumiaji waliopo hawafutwi."
                : "Change affects the renewal period and how many new team users can be added (existing users are kept)."}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}