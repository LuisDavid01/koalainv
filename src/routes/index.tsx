import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/landing/Navbar'
import Ticker from '@/components/landing/Ticker'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import WhyCentralized from '@/components/landing/WhyCentralized'
import FooterLanding from '@/components/landing/FooterLanding'

export const Route = createFileRoute('/')({ component: IndexPage })

function IndexPage() {
  return (
    <>
      <Navbar />
      <Ticker />
      <Hero />
      <Benefits />
      <WhyCentralized />
      <FooterLanding />
    </>
  )
}
