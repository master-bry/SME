import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "sw";

const dictionary = {
  en: {
    "app.name": "Dodoma SME Suite",
    "app.tagline": "Manage your business, wherever you are.",
    "nav.dashboard": "Dashboard",
    "nav.pos": "Point of Sale",
    "nav.inventory": "Inventory",
    "nav.customers": "Customers",
    "nav.reports": "Reports & Accounting",
    "nav.team": "Team & Users",
    "nav.settings": "Settings",
    "nav.landing": "Home",
    "role.admin": "Admin",
    "role.manager": "Manager",
    "role.cashier": "Cashier",
    "common.search": "Search",
    "common.viewAll": "View all",
    "common.export": "Export",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.add": "Add",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.close": "Close",
    "common.actions": "Actions",
    "common.total": "Total",
    "common.qty": "Qty",
    "common.price": "Price",
    "common.status": "Status",
    "common.date": "Date",
    "common.yesterday": "Yesterday",
    },
  sw: {
    "app.name": "Dodoma SME Suite",
    "app.tagline": "Simamisha biashara yako, popote ulipo.",
    "nav.dashboard": "Dashibodi",
    "nav.pos": "Kituo cha mauzo",
    "nav.inventory": "Hesabu za bidhaa",
    "nav.customers": "Wateja",
    "nav.reports": "Ripoti na uhasibu",
    "nav.team": "Timu na watumiaji",
    "nav.settings": "Mipangilio",
    "nav.landing": "Nyumbani",
    "role.admin": "Admin",
    "role.manager": "Meneja",
    "role.cashier": "Muuzaji",
    "common.search": "Tafuta",
    "common.viewAll": "Ona zote",
    "common.export": "Safirisha",
    "common.save": "Hifadhi",
    "common.cancel": "Ghairi",
    "common.add": "Ongeza",
    "common.edit": "Hariri",
    "common.delete": "Futa",
    "common.close": "Funga",
    "common.actions": "Hatua",
    "common.total": "Jumla",
    "common.qty": "Idadi",
    "common.price": "Bei",
    "common.status": "Hali",
    "common.date": "Tarehe",
    "common.yesterday": "Jana",
  },
} as const;

export type TKey = keyof (typeof dictionary)["en"];

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("sme.lang");
    return stored === "sw" ? "sw" : "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("sme.lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: TKey) => dictionary[lang][key],
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}