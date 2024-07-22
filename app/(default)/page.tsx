export const metadata = {
  title: 'Volunteers Suitability Score',
  description: 'Page description',
}
import Hero from '@/components/hero'
import Features from '@/components/features'
import VerticalTabs from '@/components/VerticalTabs'

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
