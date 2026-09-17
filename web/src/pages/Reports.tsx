import { useState } from "react";
import {
  Calculator,
  FileText,
  TrendingUp,
  Landmark,
  Download,
  CalendarDays,
  PiggyBank,
  ReceiptText,
} from "lucide-react";
import { Badge, Button, Card, CardHeader, Select, Table, Td, Th, THead } from "../components/ui";
import { useI18n } from "../lib/i18n";
import { expenses, fmtNum, fmtTZS, weeklySales } from "../lib/mockData";

const monthRevenue = weeklySales.reduce((a, d) => a + d.amount, 0);
const cogs = Math.round(monthRevenue * 0.68);
const grossProfit = monthRevenue - cogs;
const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
const netProfit = grossProfit - totalExpenses;

const expCats: { name: string; color: string; pct: number }[] = [
  { name: "Rent", color: "#15803d", pct: 41 },
  { name: "Salaries", color: "#b45309", pct: 25 },
  { name: "Utilities", color: "#0f766e", pct: 12 },
  { name: "Supplies", color: "#4338ca", pct: 12 },
  { name: "Other", color: "#78716c", pct: 10 },
];

export default function Reports() {
  const { t, lang } = useI18n();
  const sw = lang === "sw";
  const [period, setPeriod] = useState("2026-09");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Ripoti na Uhasibu" : "Reports & Accounting"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Taarifa za kifedha zilizotayarishwa kwa TRA" : "Financials prepared TRA-ready"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <CalendarDays className="hidden h-4 w-4 text-stone-400 sm:block" aria-hidden="true" />
            <Select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Period" className="w-44">
              <option value="2026-09">September 2026</option>
              <option value="2026-08">August 2026</option>
              <option value="2026-07">July 2026</option>
            </Select>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" aria-hidden="true" /> PDF
          </Button>
          <Button size="sm">{sw ? "Tuma ripoti" : "Schedule email"}</Button>
        </div>
      </div>

      {/* P&L summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: <Landmark className="h-5 w-5" />, label: sw ? "Mapato" : "Revenue", value: fmtTZS(monthRevenue), delta: "+9.4%" },
          { icon: <Calculator className="h-5 w-5" />, label: "COGS", value: fmtTZS(cogs), delta: "", note: sw ? "68% ya mapato" : "68% of revenue" },
          { icon: <TrendingUp className="h-5 w-5" />, label: sw ? "Faida ya jumla" : "Gross profit", value: fmtTZS(grossProfit), delta: "32%" },
          { icon: <PiggyBank className="h-5 w-5" />, label: sw ? "Faida halisi" : "Net profit", value: fmtTZS(netProfit), delta: "+2.1%" },
        ].map((s) => (
          <Card key={s.label} className="rise-in">
            <div className="flex items-center justify-between">
              <span className="text-fluid-sm font-medium text-stone-500">{s.label}</span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-800" aria-hidden="true">
                {s.icon}
              </span>
            </div>
            <p className="mt-2 font-display text-fluid-2xl font-bold text-ink-950">{s.value}</p>
            <p className="text-fluid-xs">
              {s.delta && <Badge tone="green">{s.delta}</Badge>}{" "}
              <span className="text-stone-400">{s.note ?? (sw ? "dhidi ya mwezi uliopita" : "vs last month")}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* Income statement */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title={sw ? "Ripoti ya mafanikio / P&L" : "Income statement (P&L)"}
            subtitle={period}
            action={
              <Badge tone="green">{sw ? "Faida / Profit" : "Profit"}</Badge>
            }
          />
          <table className="w-full text-fluid-base">
            <tbody>
              <tr>
                <td className="py-2.5 font-medium text-stone-600">{sw ? "Mapato" : "Revenue"}</td>
                <td className="py-2.5 text-right font-semibold text-ink-950">{fmtTZS(monthRevenue)}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">COGS</td>
                <td className="py-2.5 text-right text-red-600">− {fmtTZS(cogs)}</td>
              </tr>
              <tr className="border-y border-stone-200">
                <td className="py-2.5 font-semibold text-ink-950">{sw ? "Faida ya jumla" : "Gross profit"}</td>
                <td className="py-2.5 text-right font-bold text-ink-950">{fmtTZS(grossProfit)}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">{sw ? "Gharama za uendeshaji" : "Operating expenses"}</td>
                <td className="py-2.5 text-right text-red-600">− {fmtTZS(totalExpenses)}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-stone-600">
                  {sw ? "Rent, utumiaji wa nishati/maji, vifaa, mishahara" : "Rent, utilities, supplies, salaries"}
                </td>
                <td className="py-2.5 text-right text-stone-400">{fmtNum(expCats.length * 1)} categories</td>
              </tr>
              <tr className="border-t border-stone-200">
                <td className="py-3 font-display text-fluid-lg font-bold text-ink-950">
                  {sw ? "FAIDA HALISI" : "NET PROFIT"}
                </td>
                <td className="py-3 text-right font-display text-fluid-lg font-bold text-brand-800">{fmtTZS(netProfit)}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader title={sw ? "Gharama kwa kategoria" : "Expenses by category"} subtitle={sw ? "September" : "September"} />
          <ul className="space-y-3.5">
            {expCats.map((c) => (
              <li key={c.name}>
                <div className="mb-1 flex items-center justify-between text-fluid-sm">
                  <span className="flex items-center gap-2 font-medium text-ink-900">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
                    {c.name}
                  </span>
                  <span className="font-semibold">{c.pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-stone-50 p-4">
            <p className="flex items-center gap-2 text-fluid-sm font-semibold text-ink-900">
              <ReceiptText className="h-4 w-4 text-brand-700" aria-hidden="true" />
              {sw ? "Jumla ya gharama" : "Total expenses"}
            </p>
            <p className="mt-1 font-display text-fluid-2xl font-bold text-ink-950">{fmtTZS(totalExpenses)}</p>
            <p className="text-fluid-xs text-stone-500">
              {sw ? "Rekodi za risiti zimehifadhiwa kwa uthibitisho wa TRA." : "Receipt records retained for TRA verification."} TRA ✓
            </p>
          </div>
        </Card>
      </div>

      {/* Expense ledger */}
      <Card>
        <CardHeader
          title={sw ? "Daftari la gharama" : "Expense ledger"}
          subtitle={sw ? "September 2026" : "September 2026"}
          action={
            <Button variant="secondary" size="sm">
              <FileText className="h-4 w-4" aria-hidden="true" /> {t("common.export")}
            </Button>
          }
        />
        <Table>
          <THead>
            <Th>{t("common.date")}</Th>
            <Th>{sw ? "Kategoria" : "Category"}</Th>
            <Th>{sw ? "Maelezo" : "Description"}</Th>
            <Th>{sw ? "Malipo" : "Payment"}</Th>
            <Th className="text-right">{sw ? "Kiasi" : "Amount"}</Th>
            <Th>{t("common.status")}</Th>
          </THead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-b border-stone-100 last:border-0">
                <Td className="text-stone-500">{e.date}</Td>
                <Td>
                  <Badge tone="stone">{e.category}</Badge>
                </Td>
                <Td className="text-ink-950">{e.description}</Td>
                <Td className="text-stone-500">{sw ? "Bank / Halifa" : "Bank"}</Td>
                <Td className="text-right font-semibold">{fmtTZS(e.amount)}</Td>
                <Td>
                  <Badge tone="green">{sw ? "Imelipwa" : "Paid"}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}