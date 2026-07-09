import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import ContactMethodCard from '../ui/ContactMethodCard'
import useSiteSettings from '../../hooks/useSiteSettings'

const ContactCTA = ({ className = '' }) => {
  const { settings } = useSiteSettings()
  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: 'Whatsapp Us',
      description: 'Schedule a quick chat with an expert counsellor right away to discuss your health goals.',
      ctaText: 'Chat Now',
      ctaLink: `https://wa.me/${settings.whatsapp}`,
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Call Us',
      description: 'Schedule a quick call with an expert counsellor right away to book your appointment and start your journey.',
      ctaText: 'Call now',
      ctaLink: `tel:${settings.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Book an Appointment',
      description: 'Choose a slot that works for you and start your health journey right away.',
      ctaText: 'Book consultation',
      ctaLink: '/contact-us',
    },
  ]

  return (
    <section className={`py-16 md:py-24 bg-gray-50 border-t border-gray-100 ${className}`}>
      <div className="container-custom">
        <SectionHeading
          title="Start Your Transformation: Contact FitJeeva for Expert Guidance"
          subtitle="The first step to a healthier you starts here. Book a diet consultation and talk to a diet expert now to begin your transformation. Connect with our team through the channel you love — our responses are always personalised and judgment-free."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <ContactMethodCard
              key={index}
              icon={method.icon}
              title={method.title}
              description={method.description}
              ctaText={method.ctaText}
              ctaLink={method.ctaLink}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
