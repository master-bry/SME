import { useMemo, useState } from "react";
import { Banknote, Search, Plus, Minus, Trash2, Check, Smartphone, ReceiptText, ShoppingBasket } from "lucide-react";
import { Badge, Button, Card, EmptyState, Input, Logo } from "../components/ui";
import { fmtNum, fmtTZS, products, type Product } from "../lib/mockData";

type PayMethod = "cash" | "mpesa" | "airtel" | "tigo" | "credit";

interface CartLine {
  product: Product;
  qty: number;
}

const payOptions: { id: PayMethod; label: string; symbol: string }[] = [
  { id: "cash", label: "Cash / Taslimu", symbol: "TZS" },
  { id: "mpesa", label: "M-Pesa", symbol: "M" },
  { id: "airtel", label: "Airtel", symbol: "A" },
  { id: "tigo", label: "Tigo", symbol: "T" },
  { id: "credit", label: "Credit / Deni", symbol: "C" },
];

export default function Pos() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [method, setMethod] = useState<PayMethod>("cash");
  const [customer, setCustomer] = useState("");
  const [tendered, setTendered] = useState("");
  const [completed, setCompleted] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 8);
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    );
  }, [query]);

  const add = (p: Product) =>
    setCart((prev) => {
      const found = prev.find((l) => l.product.id === p.id);
      if (found) return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { product: p, qty: 1 }];
    });

  const setQty = (id: string, qty: number) =>
    setCart((prev) => (qty <= 0 ? prev.filter((l) => l.product.id !== id) : prev.map((l) => (l.product.id === id ? { ...l, qty } : l))));

  const subtotal = cart.reduce((a, l) => a + l.product.sellingPrice * l.qty, 0);
  const discount = method === "credit" ? 0 : 0;
  const tenderedN = parseFloat(tendered) || 0;
  const change = tenderedN - (subtotal - discount);

  const checkout = () => {
    setCompleted(true);
    setTimeout(() => {
      setCompleted(false);
      setCart([]);
      setCustomer("");
      setTendered("");
    }, 2200);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      {/* Product picker */}
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: name, SKU, barcode… / Tafuta: jina, SKU, barcode…"
                className="min-h-12 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
                aria-label="Search products"
              />
            </div>
            <div className="flex gap-2">
              {["Grocery", "Produce", "Pharmacy"].map((c) => (
                <button
                  key={c}
                  onClick={() => setQuery(c)}
                  className={`min-h-10 rounded-xl border px-3.5 text-fluid-xs font-semibold transition-colors ${
                    query === c ? "border-brand-700 bg-brand-700 text-white" : "border-stone-300 bg-white text-ink-800 hover:bg-stone-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-fluid-xs text-stone-500" aria-live="polite">
            {results.length} {results.length === 1 ? "product" : "products"} / bidhaa
          </p>
        </Card>

        <ul className="grid gap-3 sm:grid-cols-2">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => add(p)}
                disabled={p.stock <= 0}
                className="group flex w-full items-center gap-3.5 rounded-2xl border border-stone-200 bg-white p-3.5 text-left transition-all hover:border-brand-600 hover:shadow-md disabled:opacity-50"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 font-display text-fluid-xl font-bold text-brand-800">
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-fluid-sm font-semibold text-ink-950">{p.name}</span>
                  <span className="block text-fluid-xs text-stone-500">
                    {p.sku} · {fmtNum(p.stock)} {p.unit} in / salio
                  </span>
                  <span className="mt-1 block font-display text-fluid-base font-bold text-brand-800">{fmtTZS(p.sellingPrice)}</span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-700 text-white transition-transform group-hover:scale-110" aria-hidden="true">
                  <Plus className="h-5 w-5" />
                </span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="sm:col-span-2">
              <EmptyState icon={<Search className="h-6 w-6" />} title="No products found" body="Hakuna bidhaa kama hiyo. Jaribu jina lingine." />
            </li>
          )}
        </ul>
      </div>

      {/* Cart / checkout */}
      <div className="xl:sticky xl:top-20 xl:h-fit">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-fluid-lg font-semibold text-ink-950">
              <ShoppingBasket className="h-5 w-5 text-brand-700" aria-hidden="true" />
              Cart / Kikapu
            </h2>
            <Badge tone="stone">{cart.reduce((a, l) => a + l.qty, 0)} items</Badge>
          </div>

          {cart.length === 0 ? (
            <EmptyState
              icon={<ShoppingBasket className="h-6 w-6" />}
              title="Cart is empty"
              body={completed ? "Sale completed ✓ / Mauzo yamekamilika ✓" : "Choose products on the left / Chagua bidhaa upande" }
            />
          ) : (
            <>
              <ul className="max-h-72 space-y-2.5 overflow-y-auto pr-1">
                {cart.map((l) => (
                  <li key={l.product.id} className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-fluid-sm font-semibold text-ink-950">{l.product.name}</p>
                      <p className="text-fluid-xs text-stone-500">{fmtTZS(l.product.sellingPrice)} each / kila</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="grid h-9 w-9 place-items-center rounded-lg border border-stone-300 bg-white hover:bg-stone-100" onClick={() => setQty(l.product.id, l.qty - 1)} aria-label={`Decrease ${l.product.name}`}>
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center font-display text-fluid-base font-bold text-ink-950">{l.qty}</span>
                      <button className="grid h-9 w-9 place-items-center rounded-lg border border-stone-300 bg-white hover:bg-stone-100" onClick={() => setQty(l.product.id, l.qty + 1)} aria-label={`Increase ${l.product.name}`}>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-right font-display text-fluid-sm font-bold text-ink-950">{fmtTZS(l.product.sellingPrice * l.qty)}</span>
                      <button className="grid h-9 w-9 place-items-center rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600" onClick={() => setQty(l.product.id, 0)} aria-label={`Remove ${l.product.name}`}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl bg-brand-50 p-3.5">
                <Input
                  label="Customer / Mteja (optional)"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Mama Nyerere"
                />
              </div>

              <div>
                <p className="mb-2 text-fluid-xs font-semibold uppercase tracking-wider text-stone-500">
                  Payment method / Malipo
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {payOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMethod(opt.id)}
                      aria-pressed={method === opt.id}
                      className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border text-fluid-xs font-semibold transition-colors ${
                        method === opt.id
                          ? "border-brand-700 bg-brand-700 text-white"
                          : "border-stone-200 bg-white text-ink-800 hover:border-brand-600"
                      }`}
                    >
                      <span className="font-display text-fluid-base font-bold">{opt.symbol}</span>
                      {opt.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {method === "cash" && (
                <Input
                  label="Cash received / Pesa taslimu"
                  type="number"
                  inputMode="decimal"
                  value={tendered}
                  onChange={(e) => setTendered(e.target.value)}
                  placeholder="0"
                />
              )}

              <div className="space-y-1.5 border-t border-stone-200 pt-3 text-fluid-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{fmtTZS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Discount / Punguzo</span>
                  <span>{fmtTZS(discount)}</span>
                </div>
                <div className="flex justify-between font-display text-fluid-lg font-bold text-ink-950">
                  <span>Total / Jumla</span>
                  <span>{fmtTZS(subtotal - discount)}</span>
                </div>
                {method === "cash" && tenderedN > 0 && (
                  <div className="rounded-xl bg-brand-100 px-3 py-2 text-fluid-sm font-semibold text-brand-900">
                    Change / Rudi: {fmtTZS(Math.max(0, change))}
                  </div>
                )}
              </div>

              <Button size="lg" className="w-full" onClick={checkout} aria-live="polite">
                {completed ? (
                  <>
                    <Check className="h-5 w-5" aria-hidden="true" /> Sale complete / Imekamilika
                  </>
                ) : (
                  <>
                    <Banknote className="h-5 w-5" aria-hidden="true" />
                    Confirm & print / Thibitisha kisha uchapishe
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 text-fluid-xs text-stone-400">
                <span className="inline-flex items-center gap-1">
                  <ReceiptText className="h-3.5 w-3.5" aria-hidden="true" /> Print / SMS
                </span>
                <span className="inline-flex items-center gap-1">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> Offline-ready
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Logo className="h-5 w-5 rounded-md" /> Shift #4 / Zamu ya 4
                </span>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}