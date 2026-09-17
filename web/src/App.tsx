import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n";
import { Layout, SkipLink } from "./components/Layout";

const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pos = lazy(() => import("./pages/Pos"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Customers = lazy(() => import("./pages/Customers"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

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

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <Layout>
              <Routes>
                <Route
                  index
                  element={
                    <>
                      <DocumentTitle title="Dashboard" />
                      <Dashboard />
                    </>
                  }
                />
                <Route
                  path="pos"
                  element={
                    <>
                      <DocumentTitle title="Point of Sale" />
                      <Pos />
                    </>
                  }
                />
                <Route
                  path="inventory"
                  element={
                    <>
                      <DocumentTitle title="Inventory" />
                      <Inventory />
                    </>
                  }
                />
                <Route
                  path="customers"
                  element={
                    <>
                      <DocumentTitle title="Customers" />
                      <Customers />
                    </>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <>
                      <DocumentTitle title="Reports & Accounting" />
                      <Reports />
                    </>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <>
                      <DocumentTitle title="Settings" />
                      <Settings />
                    </>
                  }
                />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </Routes>
            </Layout>
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
        <SkipLink />
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}