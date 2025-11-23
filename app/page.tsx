'use client';

import { HomeHeader } from '@/components/homepage/HomeHeader';
import { HeadlineBlock } from '@/components/homepage/HeadlineBlock';
import { PhoneMockupLive } from '@/components/homepage/PhoneMockupLive';
import { SocialProofCard } from '@/components/homepage/SocialProofCard';
import { LandingPageTour } from '@/components/homepage/LandingPageTour';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-hidden">
        {/* Header */}
        <HomeHeader />

        {/* Landing Page Tour */}
        <LandingPageTour />

        {/* Main Content - Single Page, No Scroll */}
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            {/* Three-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-16 items-center">
              {/* Left Column: Headline + CTA */}
              <div className="order-1 lg:order-1 headline-block">
                <HeadlineBlock />
              </div>

              {/* Center Column: iPhone Mockup */}
              <div className="order-2 lg:order-2 flex justify-center phone-mockup">
                <PhoneMockupLive />
              </div>

              {/* Right Column: Social Proof */}
              <div className="order-3 lg:order-3 social-proof">
                <SocialProofCard />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl" />
        </div>
      </main>
    </LanguageProvider>
  );
}
