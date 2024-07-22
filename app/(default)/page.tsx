export const metadata = {
  title: 'Volunteers Suitability Score',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import VerticalTabs from '@/components/VerticalTabs'
import Upload from '@/components/Upload'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <VerticalTabs />

      {/* <Zigzag />
      <Testimonials />
      <Newsletter /> */}
    </>
  )
}
