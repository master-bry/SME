import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { X } from "lucide-react";

/* ---------------- Logo ---------------- */
export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 text-white ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
        <path d="M4 17v-5h2.4v5H4Zm4.8 0V8.5h2.4V17h-2.4Zm4.8 0v-7h2.4v7h-2.4Zm4.8 0v-6h2.4v6h-2.4Z" />
        <rect x="4" y="17.8" width="16" height="1.6" rx="0.8" fill="#f5b323" />
      </svg>
    </span>
  );
}

export function BrandWordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-base font-bold tracking-tight ${dark ? "text-white" : "text-ink-950"}`}>
          Dodoma <span className="text-brand-700">SME</span>
        </span>
        <span className={`text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${dark ? "text-ink-300" : "text-stone-500"}`}>
          Management Suite
        </span>
      </span>
    </span>
  );
}

/* ---------------- Button ---------------- */
type Variant = "primary" | "secondary" | "ghost" | "danger" | "gold";
type Size = "sm" | "md" | "lg";

const btnVariants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 shadow-sm border border-brand-800",
  secondary:
    "bg-white text-ink-900 border border-stone-300 hover:bg-stone-50 shadow-sm",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-50 border border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm border border-red-700",
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-sm border border-gold-600 font-semibold",
};

const btnSizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-fluid-sm gap-1.5",
  md: "min-h-11 px-4 text-fluid-base gap-2",
  lg: "min-h-13 px-6 text-fluid-lg gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55 ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
      {...rest}
    />
  );
}

/* ---------------- Card ---------------- */
export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`surface p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-fluid-lg font-semibold text-ink-950">{title}</h3>
        {subtitle && <p className="mt-0.5 text-fluid-sm text-stone-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------- Badge ---------------- */
type BadgeTone = "green" | "amber" | "red" | "blue" | "stone";

const badgeTones: Record<BadgeTone, string> = {
  green: "bg-brand-100 text-brand-900 border-brand-200",
  amber: "bg-gold-100 text-gold-900 border-gold-200",
  red: "bg-red-100 text-red-900 border-red-200",
  blue: "bg-sky-100 text-sky-900 border-sky-200",
  stone: "bg-stone-100 text-stone-700 border-stone-200",
};

export function Badge({ tone = "stone", children, className = "" }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-fluid-xs font-semibold ${badgeTones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/* ---------------- Stat card ---------------- */
export function StatCard({
  label,
  value,
  delta,
  deltaTone = "green",
  icon,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "green" | "red";
  icon: ReactNode;
  hint?: string;
}) {
  return (
    <Card className="flex flex-col gap-3 rise-in">
      <div className="flex items-center justify-between">
        <span className="text-fluid-sm font-medium text-stone-500">{label}</span>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-800 border border-brand-100" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">{value}</div>
      <div className="flex items-center gap-2 text-fluid-xs">
        {delta && (
          <Badge tone={deltaTone === "green" ? "green" : "red"}>{delta}</Badge>
        )}
        {hint && <span className="text-stone-400">{hint}</span>}
      </div>
    </Card>
  );
}

/* ---------------- Input / Select (always labeled, accessible) ---------------- */
interface FieldWrapProps {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function Field({ label, hint, error, children, htmlFor }: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-fluid-sm font-medium text-ink-900">
        {label}
      </label>
      {children}
      {hint && !error && <span className="text-fluid-xs text-stone-500">{hint}</span>}
      {error && <span className="text-fluid-xs font-medium text-red-700">{error}</span>}
    </div>
  );
}

const inputBase =
  "min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base text-ink-950 placeholder:text-stone-400 transition-colors hover:border-stone-400 focus:border-brand-700 focus:border-2 focus:outline-none";

export function Input({ label, id, className = "", ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const autoId = useId();
  const resolved = id ?? autoId;
  return label ? (
    <Field label={label} htmlFor={resolved}>
      <input id={resolved} className={`${inputBase} ${className}`} {...rest} />
    </Field>
  ) : (
    <input id={resolved} className={`${inputBase} ${className}`} {...rest} />
  );
}

export function Select({ label, id, children, className = "", ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  const autoId = useId();
  const resolved = id ?? autoId;
  return label ? (
    <Field label={label} htmlFor={resolved}>
      <select id={resolved} className={`${inputBase} appearance-none bg-no-repeat pr-9 ${className}`} {...rest}>
        {children}
      </select>
    </Field>
  ) : (
    <select id={resolved} className={`${inputBase} appearance-none ${className}`} {...rest}>
      {children}
    </select>
  );
}

/* ---------------- Modal (focus trap + ESC) ---------------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="dialog-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="surface relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-b-none p-5 sm:max-w-lg sm:rounded-3xl sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-fluid-xl font-semibold text-ink-950">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-stone-500 hover:bg-stone-100 hover:text-ink-950"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-5 flex flex-wrap justify-end gap-2.5 border-t border-stone-200 pt-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------------- Table helpers ---------------- */
export function Table({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`-mx-5 overflow-x-auto px-5 sm:-mx-6 sm:px-6 ${className}`}>
      <table className="w-full min-w-[520px] border-collapse text-left">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-stone-200">
        {children}
      </tr>
    </thead>
  );
}

export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <th scope="col" className={`pb-3 pr-4 text-fluid-xs font-semibold uppercase tracking-wider text-stone-500 ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <td className={`py-3 pr-4 text-fluid-base text-ink-900 ${className}`}>{children}</td>;
}

/* ---------------- Progress (stock levels) ---------------- */
export function StockBar({ value, max, tone = "green" }: { value: number; max: number; tone?: "green" | "amber" | "red" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color =
    tone === "red"
      ? "bg-red-500"
      : tone === "amber"
        ? "bg-gold-500"
        : "bg-brand-600";
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-stone-200"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Stock level"
    >
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------------- Empty state ---------------- */
export function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-stone-400 border border-stone-200" aria-hidden="true">
        {icon}
      </span>
      <p className="font-display text-fluid-base font-semibold text-ink-900">{title}</p>
      {body && <p className="max-w-sm text-fluid-sm text-stone-500">{body}</p>}
    </div>
  );
}

/* ---------------- Providers row for landing --------------- */
export function ProvidersMini() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-fluid-xs font-semibold uppercase tracking-wider text-stone-500">
      {["M-Pesa", "Airtel Money", "Tigo Pesa", "Cash", "Card"].map((p) => (
        <span key={p} className="rounded-md border border-stone-200 bg-white px-2.5 py-1">
          {p}
        </span>
      ))}
    </div>
  );
}