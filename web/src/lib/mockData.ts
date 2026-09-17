// Realistic Tanzanian business data for the demo dashboard.
export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderLevel: number;
  unit: string;
}

export interface SaleRecord {
  id: string;
  date: string;
  customer: string;
  items: number;
  method: "cash" | "mpesa" | "airtel" | "tigo" | "credit";
  amount: number;
  status: "completed" | "pending";
  cashier: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  type: "walk-in" | "regular" | "vip";
  totalSpent: number;
  purchases: number;
  loyaltyPoints: number;
  lastPurchase: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export const products: Product[] = [
  { id: "p1", name: "Unga wa Mahindi 2kg", category: "Grocery", sku: "UMA-001", costPrice: 4500, sellingPrice: 5600, stock: 120, reorderLevel: 30, unit: "pcs" },
  { id: "p2", name: "Mchele Shingo 1kg", category: "Grocery", sku: "MCH-102", costPrice: 3800, sellingPrice: 4600, stock: 85, reorderLevel: 25, unit: "pcs" },
  { id: "p3", name: "Mafuta ya kupikia 2L", category: "Grocery", sku: "MAF-210", costPrice: 12500, sellingPrice: 15000, stock: 14, reorderLevel: 20, unit: "jugs" },
  { id: "p4", name: "Sabuni ya kufulia 500g", category: "Household", sku: "SAB-500", costPrice: 2700, sellingPrice: 3400, stock: 60, reorderLevel: 15, unit: "pcs" },
  { id: "p5", name: "Chai ya Majani 100g", category: "Beverage", sku: "CHK-110", costPrice: 5200, sellingPrice: 6400, stock: 9, reorderLevel: 12, unit: "pcs" },
  { id: "p6", name: "Sukari 2kg", category: "Grocery", sku: "SUK-2K", costPrice: 6800, sellingPrice: 7900, stock: 45, reorderLevel: 15, unit: "pcs" },
  { id: "p7", name: "Parachichi (danda)", category: "Produce", sku: "PAR-001", costPrice: 350, sellingPrice: 500, stock: 400, reorderLevel: 100, unit: "pcs" },
  { id: "p8", name: "Nyanya (kg)", category: "Produce", sku: "NYA-001", costPrice: 1200, sellingPrice: 1800, stock: 22, reorderLevel: 10, unit: "kg" },
  { id: "p9", name: "Dawa ya kichwa Panadol 10s", category: "Pharmacy", sku: "PND-10", costPrice: 950, sellingPrice: 1400, stock: 130, reorderLevel: 40, unit: "packs" },
  { id: "p10", name: "Mchele Mpishi 25kg", category: "Grocery", sku: "MCM-25", costPrice: 68000, sellingPrice: 78000, stock: 5, reorderLevel: 3, unit: "bags" },
];

export const weeklySales: { day: string; amount: number }[] = [
  { day: "Mon", amount: 385000 },
  { day: "Tue", amount: 412000 },
  { day: "Wed", amount: 370000 },
  { day: "Thu", amount: 448000 },
  { day: "Fri", amount: 512000 },
  { day: "Sat", amount: 690000 },
  { day: "Sun", amount: 445000 },
];

export const salesByCategory: { name: string; value: number }[] = [
  { name: "Grocery", value: 52 },
  { name: "Produce", value: 22 },
  { name: "Household", value: 14 },
  { name: "Pharmacy", value: 12 },
];

export const recentSales: SaleRecord[] = [
  { id: "S-10233", date: "2026-09-17T10:42:00", customer: "Walk-in", items: 3, method: "cash", amount: 23600, status: "completed", cashier: "Amina" },
  { id: "S-10232", date: "2026-09-17T09:55:00", customer: "Mama Nyerere", items: 5, method: "mpesa", amount: 81400, status: "completed", cashier: "Amina" },
  { id: "S-10231", date: "2026-09-17T09:18:00", customer: "Bwana Juma", items: 1, method: "airtel", amount: 1400, status: "completed", cashier: "Neema" },
  { id: "S-10230", date: "2026-09-16T18:22:00", customer: "Walk-in", items: 2, method: "tigo", amount: 12200, status: "completed", cashier: "Neema" },
  { id: "S-10229", date: "2026-09-16T17:05:00", customer: "Zawadi Beauty", items: 7, method: "credit", amount: 64500, status: "pending", cashier: "Amina" },
  { id: "S-10228", date: "2026-09-16T16:47:00", customer: "Walk-in", items: 2, method: "cash", amount: 9200, status: "completed", cashier: "Amina" },
];

export const customers: Customer[] = [
  { id: "c1", name: "Mama Nyerere", phone: "+255 712 000 111", type: "vip", totalSpent: 1285000, purchases: 42, loyaltyPoints: 1285, lastPurchase: "Today" },
  { id: "c2", name: "Bwana Juma", phone: "+255 755 222 333", type: "regular", totalSpent: 486000, purchases: 18, loyaltyPoints: 486, lastPurchase: "Today" },
  { id: "c3", name: "Zawadi Beauty", phone: "+255 762 444 555", type: "vip", totalSpent: 2210000, purchases: 61, loyaltyPoints: 2210, lastPurchase: "Yesterday" },
  { id: "c4", name: "Kikwete Shop", phone: "+255 713 666 777", type: "regular", totalSpent: 390000, purchases: 12, loyaltyPoints: 390, lastPurchase: "3 days ago" },
  { id: "c5", name: "Bi Halima", phone: "+255 788 888 999", type: "walk-in", totalSpent: 94000, purchases: 5, loyaltyPoints: 94, lastPurchase: "1 week ago" },
];

export const expenses: Expense[] = [
  { id: "e1", category: "Rent", description: "Duka la Nyerere Road — Sept", amount: 180000, date: "2026-09-01" },
  { id: "e2", category: "Utilities", description: "TANESCO umeme + maji", amount: 64000, date: "2026-09-05" },
  { id: "e3", category: "Supplies", description: "Vifungashio: mifuko, lebo", amount: 27500, date: "2026-09-08" },
  { id: "e4", category: "Salaries", description: "Mfanyakazi 1 — Sept (awamu ya 1)", amount: 150000, date: "2026-09-10" },
  { id: "e5", category: "Other", description: "Usafiri wa bidhaa", amount: 18000, date: "2026-09-12" },
];

export const topProducts = [...products]
  .sort((a, b) => a.sellingPrice * a.stock - b.sellingPrice * b.stock)
  .slice(0, 5);

export const fmtTZS = (n: number) =>
  new Intl.NumberFormat("sw-TZ", { style: "currency", currency: "TZS", maximumFractionDigits: 0 }).format(n);

export const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const fmtNum = (n: number) => new Intl.NumberFormat("sw-TZ").format(n);