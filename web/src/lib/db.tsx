import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BusinessType, PlatformRole, planById, ShopRole, Tier, usersLeftForPlan } from "./plans";

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  businessId: string | null; // null => platform (superadmin)
  email: string;
  password: string; // demo only — never store plaintext in production
  name: string;
  phone: string;
  role: PlatformRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  ownerId: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  subscriptionTier: Tier;
  subscriptionStart: string;
  subscriptionEnd: string;
  isActive: boolean;
  createdAt: string;
}

interface DB {
  version: 2;
  users: User[];
  businesses: Business[];
  sessionUserId: string | null;
}

/* ------------------------------------------------------------------ */
/* Helpers + seed data                                                 */
/* ------------------------------------------------------------------ */

const DAY = 86_400_000;
const now = () => new Date().toISOString();
const addMonths = (months: number) => new Date(Date.now() + months * 30 * DAY).toISOString();

let counter = 0;
const uid = (prefix: string) => `${prefix}_${Date.now().toString(36)}_${(counter++).toString(36)}`;

function seed(): DB {
  const t = now();
  const superadmin: User = {
    id: uid("u"),
    businessId: null,
    email: "superadmin@dodoma-sme.app",
    password: "Super@1234",
    name: "Brayan Ngowi (Master-Bry)",
    phone: "+255 712 000 000",
    role: PlatformRole.Superadmin,
    isActive: true,
    createdAt: t,
    lastLogin: t,
  };

  const amina: User = {
    id: uid("u"),
    businessId: null,
    email: "admin@mjini.co.tz",
    password: "Admin@1234",
    name: "Amina Nyerere",
    phone: "+255 712 000 111",
    role: PlatformRole.Admin,
    isActive: true,
    createdAt: t,
  };
  const neema: User = {
    id: uid("u"),
    businessId: null,
    email: "neema@mjini.co.tz",
    password: "Cash@1234",
    name: "Neema John",
    phone: "+255 762 555 800",
    role: PlatformRole.Cashier,
    isActive: true,
    createdAt: t,
  };
  const seif: User = {
    id: uid("u"),
    businessId: null,
    email: "seif@mjini.co.tz",
    password: "Cash@1234",
    name: "Baba Seif",
    phone: "+255 713 999 222",
    role: PlatformRole.Manager,
    isActive: true,
    createdAt: t,
  };
  const juma: User = {
    id: uid("u"),
    businessId: null,
    email: "admin@kariakoo.co.tz",
    password: "Admin@1234",
    name: "Bwana Juma",
    phone: "+255 755 222 333",
    role: PlatformRole.Admin,
    isActive: true,
    createdAt: t,
  };
  const zawadi: User = {
    id: uid("u"),
    businessId: null,
    email: "admin@zawadi.co.tz",
    password: "Admin@1234",
    name: "Zawadi Beauty",
    phone: "+255 762 444 555",
    role: PlatformRole.Admin,
    isActive: true,
    createdAt: t,
  };

  const mjini: Business = {
    id: uid("b"),
    name: "Mjini General Store",
    type: BusinessType.Retail,
    ownerId: amina.id,
    phone: "+255 712 000 111",
    email: "hello@mjinistore.co.tz",
    city: "Dodoma",
    region: "Dodoma Mjini",
    subscriptionTier: Tier.Professional,
    subscriptionStart: "2026-07-01T00:00:00.000Z",
    subscriptionEnd: addMonths(6),
    isActive: true,
    createdAt: t,
  };
  const kariakoo: Business = {
    id: uid("b"),
    name: "Kariakoo Freshmart",
    type: BusinessType.Retail,
    ownerId: juma.id,
    phone: "+255 755 222 333",
    email: "juma@freshmart.co.tz",
    city: "Dodoma",
    region: "Kikuyu",
    subscriptionTier: Tier.Basic,
    subscriptionStart: now(),
    subscriptionEnd: addMonths(3),
    isActive: true,
    createdAt: t,
  };
  const zawadiBiz: Business = {
    id: uid("b"),
    name: "Zawadi Beauty Lounge",
    type: BusinessType.Salon,
    ownerId: zawadi.id,
    phone: "+255 762 444 555",
    email: "info@zawadibeauty.co.tz",
    city: "Dodoma",
    region: "Nzuguni",
    subscriptionTier: Tier.Enterprise,
    subscriptionStart: "2026-05-01T00:00:00.000Z",
    subscriptionEnd: addMonths(9),
    isActive: true,
    createdAt: t,
  };

  amina.businessId = mjini.id;
  neema.businessId = mjini.id;
  seif.businessId = mjini.id;
  juma.businessId = kariakoo.id;
  zawadi.businessId = zawadiBiz.id;

  return {
    version: 2,
    users: [superadmin, amina, neema, seif, juma, zawadi],
    businesses: [mjini, kariakoo, zawadiBiz],
    sessionUserId: null,
  };
}

/* ------------------------------------------------------------------ */
/* Persistence (demo store backed by localStorage)                     */
/* ------------------------------------------------------------------ */

const KEY = "sme.db.v2";

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as DB;
    if (parsed?.version !== 2 || !Array.isArray(parsed.users) || !Array.isArray(parsed.businesses)) {
      return seed();
    }
    return parsed;
  } catch {
    return seed();
  }
}

function save(db: DB) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* storage full / unavailable — demo continues in memory */
  }
}

/* ------------------------------------------------------------------ */
/* Store + context                                                     */
/* ------------------------------------------------------------------ */

interface ActionResult {
  ok: boolean;
  error?: string;
}

interface AddBusinessInput {
  name: string;
  type: BusinessType;
  city: string;
  region: string;
  phone: string;
  email: string;
  tier: Tier;
  months: number;
  owner: { name: string; email: string; phone: string; password: string };
}

interface AddUserInput {
  businessId: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: ShopRole;
}

interface AppContextValue {
  db: DB;
  currentUser: User | null;
  currentBusiness: Business | null;
  login: (email: string, password: string) => ActionResult;
  logout: () => void;
  // platform (superadmin)
  addBusiness: (input: AddBusinessInput) => ActionResult;
  updateBusiness: (id: string, patch: Partial<Business>) => void;
  setTier: (businessId: string, tier: Tier, months: number) => void;
  toggleBusinessActive: (id: string) => void;
  deleteBusiness: (id: string) => void;
  // users
  addUser: (input: AddUserInput) => ActionResult;
  updateUser: (id: string, patch: Partial<User>) => void;
  toggleUserActive: (id: string) => void;
  removeUser: (id: string) => void;
  setUserRole: (id: string, role: ShopRole) => void;
  // selectors
  businessById: (id: string) => Business | undefined;
  usersOfBusiness: (businessId: string) => User[];
  userOf: (id: string) => User | undefined;
  usersLeft: (businessId: string) => number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(load);

  const commit = useCallback((updater: (draft: DB) => DB) => {
    setDb((prev) => {
      const next = updater({ ...prev, users: [...prev.users], businesses: [...prev.businesses] });
      save(next);
      return next;
    });
  }, []);

  const currentUser = db.users.find((u) => u.id === db.sessionUserId) ?? null;
  const currentBusiness = currentUser?.businessId
    ? db.businesses.find((b) => b.id === currentUser.businessId) ?? null
    : null;

  const login = useCallback(
    (email: string, password: string): ActionResult => {
      const found = db.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!found) return { ok: false, error: "Invalid email or password / Barua pepe au nenosiri lisilofaa." };
      if (!found.isActive) return { ok: false, error: "Account is disabled / Akaunti imefungwa." };
      if (found.password !== password) {
        return { ok: false, error: "Invalid email or password / Barua pepe au nenosiri lisilofaa." };
      }
      commit((d) => {
        const u = d.users.find((x) => x.id === found.id)!;
        u.lastLogin = now();
        d.sessionUserId = found.id;
        return d;
      });
      return { ok: true };
    },
    [db.users, commit],
  );

  const logout = useCallback(() => {
    commit((d) => {
      d.sessionUserId = null;
      return d;
    });
  }, [commit]);

  const addBusiness = useCallback(
    (input: AddBusinessInput): ActionResult => {
      const existing = db.users.some((u) => u.email.toLowerCase() === input.owner.email.toLowerCase());
      if (existing) {
        return { ok: false, error: "Owner email already in use / Barua pepe tayari inatumika." };
      }
      const ownerId = uid("u");
      const businessId = uid("b");
      const owner: User = {
        id: ownerId,
        businessId,
        email: input.owner.email,
        password: input.owner.password,
        name: input.owner.name,
        phone: input.owner.phone,
        role: PlatformRole.Admin,
        isActive: true,
        createdAt: now(),
      };
      const biz: Business = {
        id: businessId,
        name: input.name,
        type: input.type,
        ownerId,
        phone: input.phone,
        email: input.email,
        city: input.city,
        region: input.region,
        subscriptionTier: input.tier,
        subscriptionStart: now(),
        subscriptionEnd: addMonths(input.months),
        isActive: true,
        createdAt: now(),
      };
      commit((d) => {
        d.users.push(owner);
        d.businesses.push(biz);
        return d;
      });
      return { ok: true };
    },
    [db.users, commit],
  );

  const updateBusiness = useCallback(
    (id: string, patch: Partial<Business>) => {
      commit((d) => {
        const b = d.businesses.find((x) => x.id === id);
        if (b) Object.assign(b, patch);
        return d;
      });
    },
    [commit],
  );

  const setTier = useCallback(
    (businessId: string, tier: Tier, months: number) => {
      commit((d) => {
        const b = d.businesses.find((x) => x.id === businessId);
        if (!b) return d;
        b.subscriptionTier = tier;
        b.subscriptionEnd = addMonths(months);
        return d;
      });
    },
    [commit],
  );

  const toggleBusinessActive = useCallback(
    (id: string) => {
      commit((d) => {
        const b = d.businesses.find((x) => x.id === id);
        if (!b) return d;
        b.isActive = !b.isActive;
        if (!b.isActive) {
          for (const u of d.users) {
            if (u.businessId === id && u.role !== PlatformRole.Admin) u.isActive = false;
          }
        }
        return d;
      });
    },
    [commit],
  );

  const deleteBusiness = useCallback(
    (id: string) => {
      commit((d) => {
        d.businesses = d.businesses.filter((b) => b.id !== id);
        d.users = d.users.filter((u) => u.businessId !== id);
        if (d.sessionUserId && !d.users.some((u) => u.id === d.sessionUserId)) {
          d.sessionUserId = null;
        }
        return d;
      });
    },
    [commit],
  );

  const addUser = useCallback(
    (input: AddUserInput): ActionResult => {
      const biz = db.businesses.find((b) => b.id === input.businessId);
      if (!biz) return { ok: false, error: "Business not found." };

      const activeUsers = db.users.filter(
        (u) => u.businessId === input.businessId && u.isActive,
      ).length;
      const limit = planById(biz.subscriptionTier).users;
      if (activeUsers >= limit) {
        return {
          ok: false,
          error: `Plan ${biz.subscriptionTier} allows ${limit === Infinity ? "unlimited" : limit} user(s). ${limit === Infinity ? "" : "Upgrade to add more."}`,
        };
      }
      if (db.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
        return { ok: false, error: "Email already in use / Barua pepe tayari inatumika." };
      }
      const u: User = {
        id: uid("u"),
        businessId: input.businessId,
        email: input.email,
        password: input.password,
        name: input.name,
        phone: input.phone ?? "",
        role: input.role as unknown as PlatformRole,
        isActive: true,
        createdAt: now(),
      };
      commit((d) => {
        d.users.push(u);
        return d;
      });
      return { ok: true };
    },
    [db.users, db.businesses, commit],
  );

  const updateUser = useCallback(
    (id: string, patch: Partial<User>) => {
      commit((d) => {
        const u = d.users.find((x) => x.id === id);
        if (u) Object.assign(u, patch);
        return d;
      });
    },
    [commit],
  );

  const toggleUserActive = useCallback(
    (id: string) => {
      commit((d) => {
        const u = d.users.find((x) => x.id === id);
        if (u) u.isActive = !u.isActive;
        return d;
      });
    },
    [commit],
  );

  const removeUser = useCallback(
    (id: string) => {
      commit((d) => {
        const target = d.users.find((x) => x.id === id);
        if (target?.role === PlatformRole.Superadmin) return d; // platform account cannot be removed
        d.users = d.users.filter((u) => u.id !== id);
        // remove business if its owner is removed (avoids orphan shops)
        if (target?.role === PlatformRole.Admin && target.businessId) {
          d.businesses = d.businesses.filter((b) => b.id !== target.businessId);
        }
        if (d.sessionUserId === id) d.sessionUserId = null;
        return d;
      });
    },
    [commit],
  );

  const setUserRole = useCallback(
    (id: string, role: ShopRole) => {
      commit((d) => {
        const u = d.users.find((x) => x.id === id);
        if (u && u.role !== PlatformRole.Superadmin) u.role = role as unknown as PlatformRole;
        return d;
      });
    },
    [commit],
  );

  const businessById = useCallback(
    (id: string) => db.businesses.find((b) => b.id === id),
    [db.businesses],
  );

  const usersOfBusiness = useCallback(
    (businessId: string) => db.users.filter((u) => u.businessId === businessId),
    [db.users],
  );

  const userOf = useCallback(
    (id: string) => db.users.find((u) => u.id === id),
    [db.users],
  );

  const usersLeft = useCallback(
    (businessId: string) => {
      const biz = db.businesses.find((b) => b.id === businessId);
      if (!biz) return 0;
      const active = db.users.filter((u) => u.businessId === businessId && u.isActive).length;
      return usersLeftForPlan(planById(biz.subscriptionTier), active);
    },
    [db.users, db.businesses],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      db,
      currentUser,
      currentBusiness,
      login,
      logout,
      addBusiness,
      updateBusiness,
      setTier,
      toggleBusinessActive,
      deleteBusiness,
      addUser,
      updateUser,
      toggleUserActive,
      removeUser,
      setUserRole,
      businessById,
      usersOfBusiness,
      userOf,
      usersLeft,
    }),
    [
      db,
      currentUser,
      currentBusiness,
      login,
      logout,
      addBusiness,
      updateBusiness,
      setTier,
      toggleBusinessActive,
      deleteBusiness,
      addUser,
      updateUser,
      toggleUserActive,
      removeUser,
      setUserRole,
      businessById,
      usersOfBusiness,
      userOf,
      usersLeft,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}