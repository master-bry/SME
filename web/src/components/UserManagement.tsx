import { useMemo, useState, type FormEvent } from "react";
import { Plus, ShieldCheck, UserCog, Users } from "lucide-react";
import { useApp } from "../lib/db";
import { planById, PlatformRole, roleLabel, SHOP_ROLES, ShopRole, type RoleMeta } from "../lib/plans";
import { fmtUserInitials } from "../lib/utils";
import { useI18n } from "../lib/i18n";
import { Badge, Button, Card, CardHeader, EmptyState, Field, Input, Modal, Select } from "./ui";

const roleTone = (role: string): RoleMeta["tone"] =>
  SHOP_ROLES.find((r) => r.value === role)?.tone ?? "stone";

interface Props {
  businessId: string;
  title?: string;
  subtitle?: string;
}

export default function UserManagement({ businessId, title = "Team", subtitle }: Props) {
  const { db, addUser, toggleUserActive, removeUser, setUserRole, usersOfBusiness, usersLeft } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  const biz = db.businesses.find((b) => b.id === businessId);
  const users = useMemo(() => usersOfBusiness(businessId), [usersOfBusiness, businessId]);
  const plan = biz ? planById(biz.subscriptionTier) : null;
  const left = biz ? usersLeft(businessId) : 0;
  const full = left === 0;

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: ShopRole.Cashier });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError(sw ? "Jaza jina, barua pepe na nenosiri." : "Fill name, email and password.");
      return;
    }
    const res = addUser({
      businessId,
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      role: form.role,
    });
    if (!res.ok) {
      setError(res.error ?? "Failed / Imeshindikana.");
      return;
    }
    setOpen(false);
    setForm({ name: "", email: "", phone: "", password: "", role: ShopRole.Cashier });
  };

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle ?? (plan ? `${plan.name} plan · ${left === Infinity ? "unlimited" : String(left)} slot${left === 1 ? "" : "s"} left / mabaki` : undefined)}
        action={
          <Button size="sm" onClick={() => setOpen(true)} disabled={full} title={full && plan ? `${plan.name}: ${plan.users === Infinity ? "unlimited users" : `${plan.users} user(s) max`}` : undefined}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            {sw ? "Ongeza mfanyakazi" : "Add user"}
          </Button>
        }
      />
      {full && plan && (
        <p className="mb-4 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-fluid-sm text-gold-900">
          {sw
            ? `Mpango wa ${plan.name} unaruhusu ${plan.users === Infinity ? "watumiaji wasio na kikomo" : `watumiaji ${plan.users}`}. Punguza watu, au mwezesha kuboresha kupitia msimamizi mkuu.`
            : `${plan.name} allows ${plan.users === Infinity ? "unlimited users" : `${plan.users} users`}. Remove someone, or ask the super admin to upgrade.`}
        </p>
      )}

      {users.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6" />}
          title={sw ? "Hakuna watumiaji" : "No users yet"}
          body={sw ? "Ongeza mfanyakazi wa kwanza." : "Add your first team member."}
        />
      ) : (
        <ul className="space-y-2.5">
          {users.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50/60 px-4 py-3">
              <span className="flex min-w-0 items-center gap-3">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-fluid-xs font-bold ${
                  u.role === PlatformRole.Admin ? "bg-gold-100 text-gold-800" : "bg-brand-100 text-brand-900"
                }`}>
                  {fmtUserInitials(u.name)}
                </span>
                <span className="min-w-0">
                  <span className={`flex items-center gap-2 text-fluid-sm font-semibold ${u.isActive ? "text-ink-950" : "text-stone-400"}`}>
                    {u.name}
                    {u.id === biz?.ownerId && (
                      <ShieldCheck className="h-4 w-4 text-gold-600" aria-label="Owner" />
                    )}
                  </span>
                  <span className="block truncate text-fluid-xs text-stone-500">{u.email}</span>
                </span>
              </span>

              <span className="flex flex-wrap items-center gap-2">
                <Badge tone={roleTone(u.role)}>{roleLabel(u.role, sw)}</Badge>
                {!u.isActive && (
                  <Badge tone="red">{sw ? "Imefungwa" : "Disabled"}</Badge>
                )}
                {/* Role selector (owner stays admin) */}
                {u.id !== biz?.ownerId && u.role !== PlatformRole.Superadmin && (
                  <Select
                    aria-label={`Role for ${u.name}`}
                    value={u.role}
                    onChange={(e) => setUserRole(u.id, e.target.value as ShopRole)}
                    className="!min-h-9 w-36 !py-1.5 text-fluid-xs"
                  >
                    {SHOP_ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {sw ? r.sw : r.en}
                      </option>
                    ))}
                  </Select>
                )}
                {u.id === biz?.ownerId && (
                  <span className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-fluid-xs font-semibold text-stone-500">
                    <UserCog className="h-3.5 w-3.5" aria-hidden="true" />
                    Owner
                  </span>
                )}
                {/* Actions */}
                <div className="ml-1 flex items-center gap-1">
                  {u.id !== biz?.ownerId && u.role !== PlatformRole.Superadmin && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toggleUserActive(u.id)}
                        aria-pressed={!u.isActive}
                      >
                        {u.isActive ? (sw ? "Funga" : "Disable") : (sw ? "Washa" : "Enable")}
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => {
                        if (confirm(sw ? `Ondoa ${u.name}?` : `Remove ${u.name}?`)) removeUser(u.id);
                      }}>
                        {sw ? "Futa" : "Remove"}
                      </Button>
                    </>
                  )}
                  {u.id === biz?.ownerId && (
                    <span className="text-fluid-xs text-stone-400">{sw ? "Mmiliki hana uwezo wa kufutwa." : "Owner cannot be removed."}</span>
                  )}
                </div>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Add user modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={sw ? "Ongeza mfanyakazi" : "Add team member"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>{sw ? "Ghairi" : "Cancel"}</Button>
            <Button type="submit" form="user-form">{sw ? "Ongeza" : "Add"}</Button>
          </>
        }
      >
        <form id="user-form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <div className="sm:col-span-2">
            <Input label={sw ? "Jina kamili" : "Full name"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Neema John" required />
          </div>
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="neema@duka.co.tz" required />
          <Input label={sw ? "Simu (hiari)" : "Phone (optional)"} inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+255 7…" />
          <Select label={sw ? "Jukumu" : "Role"} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as ShopRole })}>
            {SHOP_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{sw ? r.sw : r.en}</option>
            ))}
          </Select>
          <Field label={sw ? "Nenosiri la kwanza" : "Initial password"} htmlFor="new-pass" hint={sw ? "Mfanyakazi anaweza kubadilisha baadaye." : "Employee can change this later."}>
            <input
              id="new-pass"
              type="text"
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min 8 chars / herufi 8"
              required
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </Field>
          {error && (
            <p role="alert" className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm font-medium text-red-800">
              {error}
            </p>
          )}
          <p className="sm:col-span-2 text-fluid-xs text-stone-500">
            {plan
              ? sw
                ? `Mpango ${plan.name}: ${plan.users === Infinity ? "watumiaji wasio na kikomo" : `max ${plan.users} watumiaji`}. Salio la sasa: ${left === Infinity ? "∞" : left}.`
                : `${plan.name} plan: ${plan.users === Infinity ? "unlimited users" : `max ${plan.users} users`}. Slots left: ${left === Infinity ? "∞" : left}.`
              : ""}
          </p>
        </form>
      </Modal>
    </Card>
  );
}