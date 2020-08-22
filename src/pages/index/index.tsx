import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/Header';

const AboutSection = React.lazy(() => import('./AboutSection'));
const ContactSection = React.lazy(() => import('./ContactSection'));
const WelcomeSection = React.lazy(() => import('./WelcomeSection'));

export const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Matheus Albino</title>
        <meta name="description" content="Matheus Albino's personal website" />
      </Helmet>

      <Header />

      <main className="container space-y-4 divide-y divide-secondary divide-opacity-25 text-secondary">
        <Suspense fallback={null}>
          <WelcomeSection />
        </Suspense>
        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
    </>
  );
};
