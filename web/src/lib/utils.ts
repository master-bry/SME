export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const fmtUserInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export const fmtDate = (iso: string, sw = false) =>
  new Date(iso).toLocaleDateString(sw ? "sw-TZ" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const daysLeft = (endIso: string) => {
  const ms = new Date(endIso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
};