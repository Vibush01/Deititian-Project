import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import ContactMethodCard from '../ui/ContactMethodCard'
import { siteInfo } from '../../data/siteData'

/**
 * "Start Your Transformation" contact CTA section with 3 contact method cards.
 * WhatsApp, Call, and Book Appointment.
 *
 * @param {string} className - Additional wrapper classes
 */
const ContactCTA = ({ className = '' }) => {
  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: 'Whatsapp Us',
      description: 'Schedule a quick chat with an expert counsellor right away to discuss your health goals.',
      ctaText: 'Chat Now',
      ctaLink: `https://wa.me/${siteInfo.whatsapp}`,
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Call Us',
      description: 'Schedule a quick call with an expert counsellor right away to book your appointment and start your journey.',
      ctaText: 'Call now',
      ctaLink: `tel:${siteInfo.phone.replace(/\s/g, '')}`,
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
    <section className={`section-padding bg-gray-light ${className}`}>
      <div className="container-custom">
        <SectionHeading
          title="Start Your Transformation: Contact Dietitian Shreya for Expert Guidance"
          subtitle="The first step to a healthier you starts here. Book a diet consultation and talk to a diet expert now to begin your transformation. Connect with our team through the channel you love — our responses are always personalised and judgment-free."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
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
