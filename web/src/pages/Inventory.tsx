import { useMemo, useState } from "react";
import { Plus, Search, Upload, Download, Boxes } from "lucide-react";
import { Badge, Button, Card, EmptyState, Field, Input, Modal, Select, StockBar, Table, Td, Th, THead } from "../components/ui";
import { fmtNum, fmtTZS, products } from "../lib/mockData";
import { useI18n } from "../lib/i18n";

export default function Inventory() {
  const { t, lang } = useI18n();
  const sw = lang === "sw";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("all");
  const [stockOnly, setStockOnly] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (stockOnly && p.stock > p.reorderLevel) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    });
  }, [query, cat, stockOnly]);

  const cats = useMemo(() => ["all", ...new Set(products.map((p) => p.category))], []);
  const stockValue = products.reduce((a, p) => a + p.costPrice * p.stock, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Hesabu za bidhaa" : "Inventory"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Bidhaa " : "Products"} · {fmtNum(products.length)} ·{" "}
            {sw ? "thamani ya hisa" : "stock value"} {fmtTZS(stockValue)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="secondary" size="sm">
            <Upload className="h-4 w-4" aria-hidden="true" /> CSV
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" aria-hidden="true" /> {t("common.export")}
          </Button>
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" /> {sw ? "Bidhaa mpya" : "New product"}
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sw ? "Tafuta bidhaa au SKU…" : "Search products or SKU…"}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="flex cursor-pointer items-center gap-2 text-fluid-sm font-medium text-ink-800">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-brand-700 focus:ring-brand-500"
              />
              {sw ? "Chache tu / Low stock only" : "Low stock only"}
            </label>
            <Select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} className="w-40">
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? (sw ? "Zote" : "All") : c}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={<Boxes className="h-6 w-6" />} title={sw ? "Hakuna bidhaa" : "No products"} body={sw ? "Badilisha vichujio au ongeza bidhaa." : "Adjust filters or add a product."} />
        ) : (
          <Table>
            <THead>
              <Th>{sw ? "Bidhaa" : "Product"}</Th>
              <Th>SKU</Th>
              <Th>{sw ? "Kategoria" : "Category"}</Th>
              <Th className="text-right">{sw ? "Gharama" : "Cost"}</Th>
              <Th className="text-right">{sw ? "Bei" : "Price"}</Th>
              <Th>{sw ? "Hisia" : "Stock"}</Th>
              <Th className="text-right">{sw ? "Thamani" : "Value"}</Th>
            </THead>
            <tbody>
              {rows.map((p) => {
                const low = p.stock <= p.reorderLevel;
                const tone = low ? ("red" as const) : p.stock <= p.reorderLevel * 2 ? ("amber" as const) : ("green" as const);
                return (
                  <tr key={p.id} className="border-b border-stone-100 last:border-0">
                    <Td>
                      <span className="flex items-center gap-2.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-fluid-xs font-bold text-brand-800">
                          {p.name.slice(0, 3).toUpperCase()}
                        </span>
                        <span className="font-semibold text-ink-950">{p.name}</span>
                      </span>
                    </Td>
                    <Td className="text-stone-500">{p.sku}</Td>
                    <Td>
                      <Badge tone="stone">{p.category}</Badge>
                    </Td>
                    <Td className="text-right text-stone-600">{fmtTZS(p.costPrice)}</Td>
                    <Td className="text-right font-semibold">{fmtTZS(p.sellingPrice)}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="w-24">
                          <StockBar value={p.stock} max={p.reorderLevel * 3} tone={tone} />
                        </div>
                        <span className={`text-fluid-xs font-semibold ${low ? "text-red-600" : "text-stone-600"}`}>
                          {fmtNum(p.stock)} {p.unit}
                        </span>
                        {low && (
                          <Badge tone="red" className="ml-1">
                            {sw ? "Chache" : "Low"}
                          </Badge>
                        )}
                      </div>
                    </Td>
                    <Td className="text-right font-semibold">{fmtTZS(p.costPrice * p.stock)}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={sw ? "Ongeza bidhaa mpya" : "Add new product"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={() => setOpen(false)}>{sw ? "Hifadhi" : t("common.save")}</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label={sw ? "Jina la bidhaa" : "Product name"} placeholder="e.g. Unga wa Mahindi 2kg" />
          </div>
          <Input label="SKU" placeholder="UMA-001" />
          <Select label={sw ? "Kategoria" : "Category"} defaultValue="Grocery">
            <option>Grocery</option>
            <option>Produce</option>
            <option>Household</option>
            <option>Pharmacy</option>
          </Select>
          <Input label={sw ? "Bei ya gharama (TZS)" : "Cost price (TZS)"} type="number" inputMode="decimal" placeholder="4500" />
          <Input label={sw ? "Bei ya kuuza (TZS)" : "Selling price (TZS)"} type="number" inputMode="decimal" placeholder="5600" />
          <Input label={`${sw ? "Hisia ya kwanza" : "Opening stock"} (${sw ? "idadi" : "qty"})`} type="number" inputMode="numeric" placeholder="50" />
          <Input label={sw ? "Kiwango cha agizo tena" : "Reorder level"} type="number" inputMode="numeric" placeholder="20" />
          <div className="sm:col-span-2">
            <Field label={sw ? "Maelezo (hiari)" : "Description (optional)"}>
              <textarea
                rows={3}
                className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-fluid-base placeholder:text-stone-400 focus:border-brand-700 focus:border-2 focus:outline-none"
                placeholder="…"
              />
            </Field>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-stone-50 px-4 py-3 text-fluid-xs text-stone-500">
          {sw ? "Barcode itatolewa kiotomatiki baada ya kuhifadhi." : "A barcode is generated automatically once saved."} Barcode ✕ ✕ ✕
        </p>
      </Modal>
    </div>
  );
}