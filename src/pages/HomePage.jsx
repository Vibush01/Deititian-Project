import HeroSection from '../components/sections/HeroSection'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ClinicLocations from '../components/sections/ClinicLocations'
import ConsultationForm from '../components/sections/ConsultationForm'

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        title="Hi, I am Dietitian Shreya"
        subtitle="India's #1 medical diet clinic chain. 1 Lakh+ success stories. Expert PCOD, thyroid, diabetes & weight loss plans."
        ctaText="Book a session"
        ctaLink="/contact-us"
        image="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=600&fit=crop"
        bgColor="bg-primary-lighter"
      />

      {/* Stats */}
      <StatsCounter />

      {/* Consultation Form */}
      <ConsultationForm />

      {/* Consultation CTA Banner */}
      <ConsultationCTA />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Contact CTA */}
      <ContactCTA />

      {/* Clinic Locations */}
      <ClinicLocations />
    </div>
  )
}

export default HomePage
