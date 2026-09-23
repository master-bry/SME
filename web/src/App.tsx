import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout, SkipLink } from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import { useApp, AppProvider } from "./lib/db";
import { LanguageProvider } from "./lib/i18n";
import { PlatformRole } from "./lib/plans";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pos = lazy(() => import("./pages/Pos"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Customers = lazy(() => import("./pages/Customers"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const Team = lazy(() => import("./pages/Team"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBusinesses = lazy(() => import("./pages/admin/AdminBusinesses"));
const AdminBusinessDetail = lazy(() => import("./pages/admin/AdminBusinessDetail"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} · Dodoma SME`;
  }, [title]);
  return null;
}

function PageLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-brand-700" aria-hidden="true" />
        <p className="text-fluid-sm text-stone-500">Inapakia… / Loading…</p>
      </div>
    </div>
  );
}

function RequireApp({ children }: { children: ReactNode }) {
  const { currentUser } = useApp();
  if (!currentUser || currentUser.role === PlatformRole.Superadmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== PlatformRole.Superadmin) return <Navigate to="/app" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Shop app (any shop role) */}
        <Route
          path="/app/*"
          element={
            <RequireApp>
              <Layout>
                <Routes>
                  <Route index element={<><DocumentTitle title="Dashboard" /><Dashboard /></>} />
                  <Route path="pos" element={<><DocumentTitle title="Point of Sale" /><Pos /></>} />
                  <Route path="inventory" element={<><DocumentTitle title="Inventory" /><Inventory /></>} />
                  <Route path="customers" element={<><DocumentTitle title="Customers" /><Customers /></>} />
                  <Route path="reports" element={<><DocumentTitle title="Reports & Accounting" /><Reports /></>} />
                  <Route path="users" element={<><DocumentTitle title="Team & Users" /><Team /></>} />
                  <Route path="settings" element={<><DocumentTitle title="Settings" /><Settings /></>} />
                  <Route path="*" element={<Navigate to="/app" replace />} />
                </Routes>
              </Layout>
            </RequireApp>
          }
        />

        {/* Super admin console */}
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Routes>
                  <Route index element={<><DocumentTitle title="Admin Overview" /><AdminDashboard /></>} />
                  <Route path="businesses" element={<><DocumentTitle title="Businesses" /><AdminBusinesses /></>} />
                  <Route path="businesses/:id" element={<><DocumentTitle title="Business" /><AdminBusinessDetail /></>} />
                  <Route path="subscriptions" element={<><DocumentTitle title="Subscriptions" /><AdminSubscriptions /></>} />
                  <Route path="users" element={<><DocumentTitle title="Users" /><AdminUsers /></>} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </RequireAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <SkipLink />
          <AppRoutes />
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}