'use client'


import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { About } from '@/components/about'
import { Gallery } from '@/components/gallery'
import { Press } from '@/components/press'
import { Experience } from '@/components/experience'
import { Menu } from '@/components/menu'
import { Testimonials } from '@/components/testimonials'
import { VisitUs } from '@/components/visit-us'
import { Reservation } from '@/components/reservation'
import { SiteFooter } from '@/components/site-footer'
import { PageLoader, CustomCursor } from '@/components/page-loader'

export default function Page() {
  return (
    <main className="bg-background">
      <PageLoader />
      <CustomCursor />
      <SiteHeader />
      <Hero />
      <Stats />
      <About />
      <Gallery />
      <Press />
      <Experience />
      <Menu />
      <Testimonials />
      <VisitUs />
      <Reservation />
      <SiteFooter />
    </main>
  )
}
