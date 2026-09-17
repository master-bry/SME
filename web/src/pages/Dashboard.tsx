import { useMemo } from "react";
import {
  Wallet,
  Users,
  TrendingUp,
  ArrowDownRight,
  Plus,
  Download,
  ReceiptText,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge, Button, Card, CardHeader, StatCard, Table, Td, Th, THead } from "../components/ui";
import { customers, fmtNum, fmtTZS, products, recentSales, salesByCategory, weeklySales, expenses } from "../lib/mockData";
import { useI18n } from "../lib/i18n";

const PIE_COLORS = ["#15803d", "#0f766e", "#b45309", "#4338ca"];

const methodLabel: Record<string, string> = {
  cash: "Cash",
  mpesa: "M-Pesa",
  airtel: "Airtel",
  tigo: "Tigo",
  credit: "Credit",
};

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-3.5 py-2 shadow-lg">
      <p className="text-fluid-xs font-semibold text-stone-500">{label ?? payload[0].name}</p>
      <p className="font-display text-fluid-base font-bold text-ink-950">{fmtTZS(payload[0].value)}</p>
    </div>
  );
}

export default function Dashboard() {
  const { t, lang } = useI18n();
  const sw = lang === "sw";

  const totalExpenses = useMemo(() => expenses.reduce((a, e) => a + e.amount, 0), []);
  const totalSalesToday = weeklySales[weeklySales.length - 1].amount;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Dashibodi" : "Dashboard"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Muhtasari wa duka lako" : "Your shop at a glance"} ·{" "}
            <time dateTime="2026-09-17">17 Sept 2026</time>
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {sw ? "Mauzo mapya / New sale" : "New sale"}
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={sw ? "Mauzo leo" : "Today's sales"}
          value={fmtTZS(totalSalesToday)}
          delta="+18%"
          deltaTone="green"
          icon={<Wallet className="h-5 w-5" aria-hidden="true" />}
          hint={sw ? "vs wiki iliyopita" : "vs last week"}
        />
        <StatCard
          label={sw ? "Mauzo mwezi huu" : "Month revenue"}
          value={fmtTZS(4125000)}
          delta="+9.4%"
          deltaTone="green"
          icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}
          hint="TZS 3,771,000"
        />
        <StatCard
          label={sw ? "Wateja wapya" : "New customers"}
          value="94"
          delta="+12%"
          deltaTone="green"
          icon={<Users className="h-5 w-5" aria-hidden="true" />}
          hint={sw ? "hivi karibuni" : "this month"}
        />
        <StatCard
          label={sw ? "Matumizi (September)" : "Expenses (September)"}
          value={fmtTZS(totalExpenses)}
          delta="-4.1%"
          deltaTone="red"
          icon={<ArrowDownRight className="h-5 w-5" aria-hidden="true" />}
          hint={sw ? "vs Agosti" : "vs August"}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader
            title={sw ? "Mwelekeo wa mauzo" : "Sales trend"}
            subtitle={sw ? "Wiki iliyopita · TZS" : "Last 7 days · TZS"}
            action={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-fluid-xs font-bold text-brand-900">
                {sw ? "Ju-u / Up" : "Up"} ↑
              </span>
            }
          />
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklySales} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803d" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#15803d" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#78716c", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#78716c", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : String(v))}
                  width={44}
                />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="amount" stroke="#15803d" strokeWidth={2.5} fill="url(#salesFill)" name="Sales" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader
            title={sw ? "Mauzo kwa kategoria" : "Sales by category"}
            subtitle={sw ? "% mwezi huu" : "% this month"}
          />
          <div className="flex h-64 flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3} strokeWidth={2}>
                    {salesByCategory.map((s, i) => (
                      <Cell key={s.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-full max-w-[180px] space-y-2" aria-label={sw ? "Kategoria" : "Categories"}>
              {salesByCategory.map((s, i) => (
                <li key={s.name} className="flex items-center gap-2 text-fluid-sm text-ink-900">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} aria-hidden="true" />
                  <span className="flex-1">{s.name}</span>
                  <span className="font-semibold">{s.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Low stock + recent sales */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <CardHeader
            title={sw ? "Bidhaa chache" : "Low stock"}
            subtitle={sw ? "Agiza tena hivi karibuni" : "Reorder soon"}
            action={
              <Button variant="ghost" size="sm">
                {sw ? "Ona zote" : "View all"}
              </Button>
            }
          />
          <ul className="space-y-3">
            {products
              .filter((p) => p.stock <= p.reorderLevel)
              .slice(0, 4)
              .map((p) => {
                const pct = Math.round((p.stock / (p.reorderLevel * 2)) * 100);
                const tone = pct < 40 ? ("red" as const) : ("amber" as const);
                return (
                  <li key={p.id} className="rounded-2xl border border-stone-100 bg-stone-50 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-fluid-sm font-semibold text-ink-950">{p.name}</p>
                      <Badge tone={tone}>{fmtNum(p.stock)} {p.unit}</Badge>
                    </div>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
                        <div className={`h-full rounded-full ${tone === "red" ? "bg-red-500" : "bg-gold-500"}`} style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                      <span className="text-fluid-xs font-medium text-stone-500">{pct}%</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title={sw ? "Mauzo ya hivi karibuni" : "Recent sales"}
            subtitle={sw ? "Miingio ya hivi punde" : "Latest transactions"}
            action={
              <Button variant="ghost" size="sm">
                {t("common.viewAll")}
              </Button>
            }
          />
          <Table>
            <THead>
              <Th>{sw ? "Risiti" : "Receipt"}</Th>
              <Th>{t("common.date")}</Th>
              <Th>{sw ? "Mteja" : "Customer"}</Th>
              <Th>{sw ? "Malipo" : "Payment"}</Th>
              <Th className="text-right">{t("common.total")}</Th>
            </THead>
            <tbody>
              {recentSales.map((s) => (
                <tr key={s.id} className="border-b border-stone-100 last:border-0">
                  <Td>
                    <span className="flex items-center gap-2 font-semibold text-ink-950">
                      <ReceiptText className="hidden h-4 w-4 text-stone-400 sm:block" aria-hidden="true" />
                      {s.id}
                    </span>
                  </Td>
                  <Td className="text-stone-500">{new Date(s.date).toLocaleTimeString(sw ? "sw-TZ" : "en", { hour: "2-digit", minute: "2-digit" })}</Td>
                  <Td>{s.customer}</Td>
                  <Td>
                    <Badge tone={s.method === "cash" ? "green" : "blue"}>{methodLabel[s.method]}</Badge>
                  </Td>
                  <Td className="text-right font-semibold">{fmtTZS(s.amount)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>

      {/* Top customers */}
      <Card>
        <CardHeader
          title={sw ? "Wateja wa juu" : "Top customers"}
          subtitle={sw ? "Kwa matumizi jumla" : "By total spend"}
        />
        <Table>
          <THead>
            <Th>{sw ? "Mteja" : "Customer"}</Th>
            <Th>{sw ? "Simu" : "Phone"}</Th>
            <Th>{sw ? "Aina" : "Tier"}</Th>
            <Th className="text-right">{sw ? "Kununua" : "Purchases"}</Th>
            <Th className="text-right">{sw ? "Jumla" : "Total"}</Th>
            <Th className="text-right">{sw ? "Pointi" : "Points"}</Th>
          </THead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-stone-100 last:border-0">
                <Td>
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-fluid-xs font-bold text-brand-900">
                      {c.name.charAt(0)}
                    </span>
                    <span className="font-semibold text-ink-950">{c.name}</span>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}