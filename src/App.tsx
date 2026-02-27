import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import {
  RedirectWithParams,
  LocalePersist,
  RootRedirect,
  AppRouteGuard,
  GuestRouteGuard,
  PaywallRouteGuard,
  DocumentMeta,
} from '@/components/shared';
import { AccountHeader, AccountBottomNav } from '@/components/account';
import { containerClass } from '@/lib/ui/container';
import {
  HomeLandingPage,
  HoroscopesPage,
  InsightsPage,
  SoulmateSketchPage,
  BabySketchPage,
  ExpertPage,
  WelcomePage,
  QuizPage,
  EmailPage,
  PromoCodePage,
  LandingPaywallPage,
  PrivacyNoticePage,
  EulaPage,
  ReviewIdPage,
  NotFoundPage,
  AuthVerifyPage,
} from '@/views';
import { ProfilePage } from '@/views/app/ProfilePage';
import { ReviewRedirect } from '@/components/soulmate';
import { YandexMetrika, MetaPixel } from '@/components/analytics';
import { isValidLocale, defaultLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { store } from '@/lib/store';
import { StripeProvider } from '@/components/stripe/StripeProvider';
import { Toaster } from 'react-hot-toast';

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !isValidLocale(locale)) {
    return <RedirectWithParams to={`/${defaultLocale}`} />;
  }

  const t = getTranslations(locale as Locale);

  return (
    <>
      <DocumentMeta
        title={t.metadata.title}
        description={t.metadata.description}
      />

      <LocalePersist locale={locale} />

      <Outlet />
    </>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <AccountHeader />
      <main className="flex-1 w-full pb-20 md:pb-0">
        <div className={`${containerClass} py-8 md:py-12`}>{children}</div>
      </main>
      <AccountBottomNav />
    </div>
  );
}

type LocaleRouteProps = {
  children: (locale: string) => React.ReactNode;
};

function LocaleRoute({ children }: LocaleRouteProps) {
  const { locale: maybeLocale } = useParams<{ locale: string }>();

  if (!maybeLocale || !isValidLocale(maybeLocale)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return <>{children(maybeLocale)}</>;
}

function LocaleReviewIdRoute() {
  const { locale, id } = useParams<{ locale: string; id: string }>();

  if (!locale || !isValidLocale(locale) || !id) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return <ReviewIdPage locale={locale} id={id} />;
}

export function App() {
  return (
    <ReduxProvider store={store}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <BrowserRouter>
        <YandexMetrika />

        <MetaPixel />

        <StripeProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/:locale" element={<LocaleLayout />}>
            <Route
              index
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <HomeLandingPage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="auth/verify"
              element={
                <LocaleRoute>
                  {(locale) => <AuthVerifyPage locale={locale} />}
                </LocaleRoute>
              }
            />

            <Route
              path="app"
              element={
                <AppRouteGuard>
                  <LocaleRoute>
                    {(locale) => (
                      <Navigate to={`/${locale}/app/horoscopes`} replace />
                    )}
                  </LocaleRoute>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/horoscopes"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <HoroscopesPage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/insights"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <InsightsPage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/soulmate-sketch"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <SoulmateSketchPage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/baby-sketch"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <BabySketchPage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/expert"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <ExpertPage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="app/profile"
              element={
                <AppRouteGuard>
                  <AppLayout>
                    <ProfilePage />
                  </AppLayout>
                </AppRouteGuard>
              }
            />

            <Route
              path="soulmate/welcome"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <WelcomePage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="soulmate/quiz"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <QuizPage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />
            <Route
              path="soulmate/result"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <RedirectWithParams to={`/${locale}/soulmate/quiz`} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="soulmate/review"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <ReviewRedirect locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="soulmate/review/:id"
              element={
                <GuestRouteGuard>
                  <LocaleReviewIdRoute />
                </GuestRouteGuard>
              }
            />

            <Route
              path="email"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <EmailPage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="promo-code"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <PromoCodePage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="landing-paywall"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <PaywallRouteGuard>
                      <LandingPaywallPage locale={locale} />
                    </PaywallRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="privacy-notice"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <PrivacyNoticePage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />

            <Route
              path="eula"
              element={
                <LocaleRoute>
                  {(locale) => (
                    <GuestRouteGuard>
                      <EulaPage locale={locale} />
                    </GuestRouteGuard>
                  )}
                </LocaleRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </StripeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}
