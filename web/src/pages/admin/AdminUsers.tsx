import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Power, Search, ShieldCheck, Trash2, Users } from "lucide-react";
import { Badge, Button, Card, EmptyState, Select, Table, Td, Th, THead } from "../../components/ui";
import { useApp } from "../../lib/db";
import { useI18n } from "../../lib/i18n";
import { PlatformRole, roleLabel, SHOP_ROLES } from "../../lib/plans";
import { fmtUserInitials } from "../../lib/utils";

export default function AdminUsers() {
  const { db, toggleUserActive, removeUser, businessById } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [bizFilter, setBizFilter] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return db.users
      .slice()
      .sort((a, b) => Number(b.role === PlatformRole.Superadmin) - Number(a.role === PlatformRole.Superadmin))
      .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
      .filter((u) => (bizFilter === "all" ? true : u.businessId === bizFilter))
      .filter((u) => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [db.users, query, roleFilter, bizFilter]);

  const roleMeta = (role: string) => SHOP_ROLES.find((r) => r.value === role);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Watumiaji" : "Users"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? `Jumla ${db.users.length} · incl. ${db.users.filter((u) => u.role === PlatformRole.Superadmin).length} super admin` : `Total ${db.users.length} · incl. ${db.users.filter((u) => u.role === PlatformRole.Superadmin).length} super admin`}
          </p>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={sw ? "Tafuta jina au barua pepe…" : "Search name or email…"}
              className="min-h-11 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 text-fluid-base focus:border-brand-700 focus:border-2 focus:outline-none"
            />
          </div>
          <Select aria-label="Role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-44">
            <option value="all">{sw ? "Majukumu yote" : "All roles"}</option>
            <option value={PlatformRole.Superadmin}>{sw ? "Super Admin" : "Super Admin"}</option>
            {SHOP_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{sw ? r.sw : r.en}</option>
            ))}
          </Select>
          <Select aria-label="Business" value={bizFilter} onChange={(e) => setBizFilter(e.target.value)} className="w-52">
            <option value="all">{sw ? "Biashara zote" : "All businesses"}</option>
            {db.businesses.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState icon={<Users className="h-6 w-6" />} title={sw ? "Hakuna watumiaji" : "No users"} body={sw ? "Badilisha vichujio." : "Adjust filters."} />
        ) : (
          <Table>
            <THead>
              <Th>{sw ? "Mfanyakazi" : "User"}</Th>
              <Th>{sw ? "Biashara" : "Business"}</Th>
              <Th>{sw ? "Jukumu" : "Role"}</Th>
              <Th>{sw ? "Hali" : "Status"}</Th>
              <Th className="text-right">{sw ? "Hatua" : "Actions"}</Th>
            </THead>
            <tbody>
              {rows.map((u) => {
                const biz = u.businessId ? businessById(u.businessId) : null;
                const meta = roleMeta(u.role);
                return (
                  <tr key={u.id} className="border-b border-stone-100 last:border-0">
                    <Td>
                      <span className="flex items-center gap-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-fluid-xs font-bold text-brand-900">
                          {fmtUserInitials(u.name)}
                        </span>
                        <span>
                          <span className="flex items-center gap-1.5 text-fluid-sm font-semibold text-ink-950">
                            {u.name}
                            {u.role === PlatformRole.Superadmin && (
                              <ShieldCheck className="h-3.5 w-3.5 text-gold-600" aria-label="Super admin" />
                            )}
                          </span>
                          <span className="block text-fluid-xs text-stone-500">{u.email}</span>
                        </span>
                      </span>
                    </Td>
                    <Td>
                      {biz ? (
                        <Link to={`/admin/businesses/${biz.id}`} className="font-semibold text-ink-950 hover:text-brand-800 hover:underline">
                          {biz.name}
                        </Link>
                      ) : (
                        <span className="text-stone-500">—</span>
                      )}
                    </Td>
                    <Td>
                      <Badge tone={meta?.tone ?? "stone"}>{roleLabel(u.role, sw)}</Badge>
                    </Td>
                    <Td><Badge tone={u.isActive ? "green" : "red"}>{u.isActive ? (sw ? "Hai" : "Active") : (sw ? "Imefungwa" : "Disabled")}</Badge></Td>
                    <Td className="text-right">
                      {u.role === PlatformRole.Superadmin ? (
                        <span className="text-fluid-xs text-stone-400">{sw ? "Akaunti ya mfumo" : "Platform account"}</span>
                      ) : (
                        <div className="flex justify-end gap-1.5">
                          <Button variant="secondary" size="sm" onClick={() => toggleUserActive(u.id)} aria-pressed={!u.isActive}>
                            <Power className="h-4 w-4" aria-hidden="true" />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => {
                            if (confirm(sw ? `Ondoa ${u.name}?` : `Remove ${u.name}?`)) removeUser(u.id);
                          }}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}