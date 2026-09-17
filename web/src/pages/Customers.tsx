import { useMemo, useState } from "react";
import { Plus, Search, Star, Users } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Modal, Table, Td, Th, THead } from "../components/ui";
import { customers, fmtNum, fmtTZS } from "../lib/mockData";
import { useI18n } from "../lib/i18n";

export default function Customers() {
  const { t, lang } = useI18n();
  const sw = lang === "sw";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof customers)[0] | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Wateja" : "Customers"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Wateja " : "Customers"} · {fmtNum(customers.length)} ·{" "}
            {sw ? "jumla ya matumizi" : "lifetime spend"} {fmtTZS(customers.reduce((a, c) => a + c.totalSpent, 0))}
          </p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" /> {sw ? "Mteja mpya" : "New customer"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { l: sw ? "Jumla ya wateja" : "Total customers", v: fmtNum(94), d: "+12 this month" },
          { l: sw ? "Kurudia kununua" : "Repeat rate", v: "68%", d: "+4.2% mwezi huu" },
          { l: sw ? "Pointi za uaminifu" : "Loyalty points out", v: fmtNum(3850), d: "≈ TZS 192,500" },
        ].map((s) => (
          <Card key={s.l} className="rise-in">
            <p className="text-fluid-sm font-medium text-stone-500">{s.l}</p>
            <p className="mt-1 font-display text-fluid-2xl font-bold text-ink-950">{s.v}</p>
            <p className="text-fluid-xs text-stone-400">{s.d}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sw ? "Tafuta mteja kwa jina au simu…" : "Search by name or phone…"}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={<Users className="h-6 w-6" />} title={sw ? "Hakuna wateja" : "No customers"} body={sw ? "Jaribu tafuta nyingine." : "Try another search."} />
        ) : (
          <Table>
            <THead>
              <Th>{sw ? "Mteja" : "Customer"}</Th>
              <Th>{sw ? "Simu" : "Phone"}</Th>
              <Th>{sw ? "Aina" : "Tier"}</Th>
              <Th className="text-right">{sw ? "Kununua" : "Purchases"}</Th>
              <Th className="text-right">{sw ? "Jumla" : "Total"}</Th>
              <Th className="text-right">{sw ? "Pointi" : "Points"}</Th>
              <Th className="text-right">{t("common.actions")}</Th>
            </THead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60">
                  <Td>
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-fluid-sm font-bold text-brand-900">
                        {c.name.charAt(0)}
                      </span>
                      <span className="font-semibold text-ink-950">{c.name}</span>
                      {c.type === "vip" && <Star className="h-4 w-4 fill-gold-400 text-gold-500" aria-label="VIP" />}
                    </span>
                  </Td>
                  <Td className="text-stone-500">{c.phone}</Td>
                  <Td>
                    <Badge tone={c.type === "vip" ? "amber" : c.type === "regular" ? "green" : "stone"}>
                      {c.type === "vip" ? "VIP" : c.type === "regular" ? "Regular" : "Walk-in"}
                    </Badge>
                  </Td>
                  <Td className="text-right">{fmtNum(c.purchases)}</Td>
                  <Td className="text-right font-semibold">{fmtTZS(c.totalSpent)}</Td>
                  <Td className="text-right text-stone-500">{fmtNum(c.loyaltyPoints)}</Td>
                  <Td className="text-right">
                    <Button variant="secondary" size="sm" onClick={() => setSelected(c)}>
                      {sw ? "Ona" : "View"}
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* New customer modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={sw ? "Ongeza mteja" : "Add customer"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setOpen(false)}>{t("common.save")}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label={sw ? "Jina" : "Name"} placeholder="Mama Nyerere" />
          </div>
          <Input label={sw ? "Simu" : "Phone"} inputMode="tel" placeholder="+255 7…" />
          <Input label="Email" type="email" placeholder="mama@duka.co.tz" />
        </div>
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-fluid-xs text-brand-900">
          {sw
            ? "Mteja ataanza na pointi 0; pointi zinajipata kwa ununuzi."
            : "Customer starts at 0 loyalty points; points accrue from purchases."} Loyalty ✓
        </p>
      </Modal>

      {/* Customer detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        footer={
          <Button onClick={() => setSelected(null)}>{t("common.close")}</Button>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Simu" : "Phone"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{selected.phone}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">Tier / Aina</p>
                <p className="mt-0.5 font-semibold text-ink-950">{selected.type}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Kununua" : "Purchases"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{fmtNum(selected.purchases)}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Jumla ya matumizi" : "Total spent"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{fmtTZS(selected.totalSpent)}</p>
              </div>
              <div className="rounded-2xl bg-gold-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Pointi za uaminifu" : "Loyalty points"}</p>
                <p className="mt-0.5 font-display text-fluid-xl font-bold text-gold-700">{fmtNum(selected.loyaltyPoints)}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-fluid-xs font-medium text-stone-500">{sw ? "Mwisho kununua" : "Last purchase"}</p>
                <p className="mt-0.5 font-semibold text-ink-950">{selected.lastPurchase}</p>
              </div>
            </div>
            <p className="text-fluid-xs text-stone-400">
              100 points ≈ TZS 5,000 discount. / Pointi 100 ≈ punguzo la TZS 5,000. Redeem / Kabidhi kwenye POS.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}