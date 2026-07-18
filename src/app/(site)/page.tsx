import About from '@/components/site/About'
import ContactCta from '@/components/site/ContactCta'
import Footer from '@/components/site/Footer'
import Header from '@/components/site/Header'
import Hero from '@/components/site/Hero'
import Listings from '@/components/site/Listings'
import Renovation from '@/components/site/Renovation'
import ServiceAreasBar from '@/components/site/ServiceAreasBar'

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Listings />
      <Renovation />
      <About />
      <ServiceAreasBar />
      <ContactCta />
      <Footer />
    </>
  )
}
