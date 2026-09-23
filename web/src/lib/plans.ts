/* ------------------------------------------------------------------ */
/* Enums — canonical data types (mirrors the spec, §12)                */
/* ------------------------------------------------------------------ */

export enum Tier {
  Basic = "basic",
  Professional = "professional",
  Enterprise = "enterprise",
}

export enum ShopRole {
  Admin = "admin",
  Manager = "manager",
  Cashier = "cashier",
}

export enum PlatformRole {
  Superadmin = "superadmin",
  Admin = "admin",
  Manager = "manager",
  Cashier = "cashier",
}

export enum BusinessType {
  Retail = "retail",
  Restaurant = "restaurant",
  Pharmacy = "pharmacy",
  Salon = "salon",
  Clinic = "clinic",
}

/* ------------------------------------------------------------------ */
/* Plans                                                               */
/* ------------------------------------------------------------------ */

export interface Plan {
  id: Tier;
  name: string;
  nameSw: string;
  priceTZS: number;
  priceUSD: number;
  users: number; // Infinity for enterprise
  locations: number;
  tagline: string;
  taglineSw: string;
}

export const PLANS: Plan[] = [
  {
    id: Tier.Basic,
    name: "Basic",
    nameSw: "Basic",
    priceTZS: 25000,
    priceUSD: 10,
    users: 1,
    locations: 1,
    tagline: "For small vendors starting out",
    taglineSw: "Kwa wafanyabiashara wadogo wanaoanza",
  },
  {
    id: Tier.Professional,
    name: "Professional",
    nameSw: "Professional",
    priceTZS: 50000,
    priceUSD: 20,
    users: 5,
    locations: 1,
    tagline: "The heart of the suite — built for growth",
    taglineSw: "Kiini cha mfumo — kwa ukuaji",
  },
  {
    id: Tier.Enterprise,
    name: "Enterprise",
    nameSw: "Enterprise",
    priceTZS: 100000,
    priceUSD: 40,
    users: Infinity,
    locations: Infinity,
    tagline: "For multi-branch & growing chains",
    taglineSw: "Kwa matawi mengi na minyororo inayokua",
  },
];

export const planById = (id: Tier | undefined | null): Plan =>
  PLANS.find((p) => p.id === id) ?? PLANS[0];

export const TIER_LIST: Tier[] = [
  Tier.Basic,
  Tier.Professional,
  Tier.Enterprise,
];

export const TIER_LABEL: Record<Tier, string> = {
  [Tier.Basic]: "Basic",
  [Tier.Professional]: "Professional",
  [Tier.Enterprise]: "Enterprise",
};

export const TIER_TONE: Record<Tier, "stone" | "green" | "amber"> = {
  [Tier.Basic]: "stone",
  [Tier.Professional]: "green",
  [Tier.Enterprise]: "amber",
};

/* ------------------------------------------------------------------ */
/* Roles                                                               */
/* ------------------------------------------------------------------ */

export interface RoleMeta {
  value: ShopRole;
  en: string;
  sw: string;
  tone: "amber" | "green" | "stone";
}

export const SHOP_ROLES: RoleMeta[] = [
  { value: ShopRole.Admin, en: "Admin", sw: "Meneja Mkuu", tone: "amber" },
  { value: ShopRole.Manager, en: "Manager", sw: "Meneja", tone: "green" },
  { value: ShopRole.Cashier, en: "Cashier", sw: "Muuzaji", tone: "stone" },
];

export const roleLabel = (role: PlatformRole | string, sw = false) => {
  const m = SHOP_ROLES.find((r) => r.value === role);
  if (m) return sw ? m.sw : m.en;
  return role === PlatformRole.Superadmin ? (sw ? "Super Admin" : "Super Admin") : role;
};

/* ------------------------------------------------------------------ */
/* Business types                                                      */
/* ------------------------------------------------------------------ */

export const BUSINESS_TYPES: { id: BusinessType; en: string; sw: string }[] = [
  { id: BusinessType.Retail, en: "Retail / General shop", sw: "Duka / Rejareja" },
  { id: BusinessType.Restaurant, en: "Restaurant / Cafe", sw: "Mkahawa" },
  { id: BusinessType.Pharmacy, en: "Pharmacy", sw: "Duka la dawa" },
  { id: BusinessType.Salon, en: "Salon / Hair shop", sw: "Saluni" },
  { id: BusinessType.Clinic, en: "Clinic", sw: "Kliniki" },
];

export const businessTypeLabel = (id: BusinessType | string, sw = false) => {
  const t = BUSINESS_TYPES.find((b) => b.id === id);
  return t ? (sw ? t.sw : t.en) : id;
};

/* ------------------------------------------------------------------ */
/* Plan-driven limits                                                  */
/* ------------------------------------------------------------------ */

// Used for the "add user" gate: how many more active users may be created.
export const usersLeftForPlan = (plan: Plan, activeUsers: number) => {
  if (plan.users === Infinity) return Infinity;
  return Math.max(0, plan.users - activeUsers);
};