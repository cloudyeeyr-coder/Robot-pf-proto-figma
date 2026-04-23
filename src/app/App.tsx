import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { RoleLayout } from './components/layout/RoleLayout';
import { RouteGuard } from './components/guards/RouteGuard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { NotFoundPage } from '../pages/NotFound';
import { ForbiddenPage } from '../pages/Forbidden';
import { PlaceholderPage } from '../pages/Placeholder';
import { BuyerSignupPage } from '../pages/signup/BuyerSignup';
import { SiPartnerSignupPage } from '../pages/signup/SiPartnerSignup';
import { PartnerPendingPage } from '../pages/signup/PartnerPending';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      {/* Public - No Auth Required */}
      <Route
        path="/search"
        element={
          <PublicLayout>
            <PlaceholderPage />
          </PublicLayout>
        }
      />
      <Route
        path="/calculator"
        element={
          <PublicLayout>
            <PlaceholderPage />
          </PublicLayout>
        }
      />
      <Route path="/signup/buyer" element={<BuyerSignupPage />} />
      <Route path="/signup/partner" element={<SiPartnerSignupPage />} />
      <Route path="/signup/partner/pending" element={<PartnerPendingPage />} />

      {/* Buyer Routes */}
      <Route
        path="/my/contracts"
        element={
          <RouteGuard requiredRole="buyer">
            <RoleLayout role="buyer">
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/my/as-tickets"
        element={
          <RouteGuard requiredRole="buyer">
            <RoleLayout role="buyer">
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/booking"
        element={
          <RouteGuard requiredRole="buyer">
            <RoleLayout role="buyer">
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />

      {/* SI Partner Routes */}
      <Route
        path="/partner/profile"
        element={
          <RouteGuard requiredRole="si_partner">
            <RoleLayout role="si_partner" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/partner/proposals"
        element={
          <RouteGuard requiredRole="si_partner">
            <RoleLayout role="si_partner" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/partner/badges"
        element={
          <RouteGuard requiredRole="si_partner">
            <RoleLayout role="si_partner" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />

      {/* Manufacturer Routes */}
      <Route
        path="/manufacturer/dashboard"
        element={
          <RouteGuard requiredRole="manufacturer">
            <RoleLayout role="manufacturer" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/manufacturer/badges"
        element={
          <RouteGuard requiredRole="manufacturer">
            <RoleLayout role="manufacturer" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/manufacturer/proposals"
        element={
          <RouteGuard requiredRole="manufacturer">
            <RoleLayout role="manufacturer" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <RouteGuard requiredRole="admin">
            <RoleLayout role="admin" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/admin/escrow"
        element={
          <RouteGuard requiredRole="admin">
            <RoleLayout role="admin" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/admin/as-sla"
        element={
          <RouteGuard requiredRole="admin">
            <RoleLayout role="admin" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/admin/events"
        element={
          <RouteGuard requiredRole="admin">
            <RoleLayout role="admin" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />
      <Route
        path="/admin/disputes"
        element={
          <RouteGuard requiredRole="admin">
            <RoleLayout role="admin" showSidebar>
              <PlaceholderPage />
            </RoleLayout>
          </RouteGuard>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}