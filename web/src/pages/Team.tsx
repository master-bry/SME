import { Navigate } from "react-router-dom";
import { Info } from "lucide-react";
import { Badge, Card } from "../components/ui";
import UserManagement from "../components/UserManagement";
import { useApp } from "../lib/db";
import { useI18n } from "../lib/i18n";
import { fmtTZS } from "../lib/mockData";
import { PlatformRole, planById, TIER_TONE, TIER_LABEL } from "../lib/plans";
import { daysLeft, fmtDate } from "../lib/utils";

export default function Team() {
  const { currentUser, currentBusiness, usersLeft } = useApp();
  const { lang } = useI18n();
  const sw = lang === "sw";

  if (!currentUser || currentUser.role === PlatformRole.Superadmin) {
    return <Navigate to="/login" replace />;
  }
  if (!currentBusiness) {
    return <Navigate to="/app" replace />;
  }

  const plan = planById(currentBusiness.subscriptionTier);
  const dl = daysLeft(currentBusiness.subscriptionEnd);
  const left = usersLeft(currentBusiness.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-fluid-2xl font-bold tracking-tight text-ink-950">
            {sw ? "Timu na watumiaji" : "Team & users"}
          </h2>
          <p className="text-fluid-sm text-stone-500">
            {sw ? "Dhibiti wafanyakazi wako na nafasi za mpango." : "Manage your staff and plan allowance."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {/* Subscription summary */}
        <div className="space-y-4">
          <Card className="p-0">
            <div className="rounded-t-2xl bg-ink-950 p-5 text-white">
              <p className="text-fluid-xs uppercase tracking-wider text-ink-300">{sw ? "Mpango wako" : "Your plan"}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="font-display text-fluid-xl font-bold text-gold-400">{plan.name}</p>
                <Badge tone={TIER_TONE[currentBusiness.subscriptionTier]}>{TIER_LABEL[currentBusiness.subscriptionTier]}</Badge>
              </div>
              <p className="mt-2 text-fluid-sm text-ink-200">{fmtTZS(plan.priceTZS)}/mo</p>
            </div>
            <div className="space-y-2 p-5 text-fluid-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">{sw ? "Watumiaji walioruhusiwa" : "Allowed users"}</span>
                <span className="font-semibold text-ink-950">{plan.users === Infinity ? "∞" : plan.users}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">{sw ? "Nafasi zilizobaki" : "Slots left"}</span>
                <span className={`font-semibold ${left === 0 ? "text-red-600" : "text-brand-800"}`}>{left === Infinity ? "∞" : left}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">{sw ? "Inaisha" : "Renews"}</span>
                <span className="font-semibold text-ink-950">{fmtDate(currentBusiness.subscriptionEnd, sw)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">{sw ? "Siku zilizobaki" : "Days left"}</span>
                <Badge tone={dl <= 30 ? "red" : dl <= 60 ? "amber" : "green"}>{dl}</Badge>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
              <p className="text-fluid-sm text-stone-600">
                {sw
                  ? "Mmiliki (Owner) hana uwezo wa kufutwa na anaweza kuongeza wafanyakazi hadi kikomo cha mpango. Ili kubadilisha mpango, wasiliana na msimamizi mkuu."
                  : "The Owner is always Admin and can add staff up to the plan limit. To change your plan, contact your super admin."}
              </p>
            </div>
          </Card>
        </div>

        {/* Team management */}
        <UserManagement
          businessId={currentBusiness.id}
          title={sw ? "Wafanyakazi" : "Staff"}
          subtitle={`${currentBusiness.name} · ${plan.name}`}
        />
      </div>
    </div>
  );
}