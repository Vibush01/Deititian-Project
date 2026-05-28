import ConsultationCTA from '../components/sections/ConsultationCTA'
import TeamShowcase from '../components/sections/TeamShowcase'
import useDocumentMeta from '../hooks/useDocumentMeta'

const TeamPage = () => {
  useDocumentMeta({
    title: 'Our Team – The People Behind FitJeeva',
    description: 'Meet the dedicated professionals behind FitJeeva. Our operations, customer success, and tech teams work together to ensure your wellness journey is smooth and successful.',
    canonical: '/team',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-10">
      <section className="py-12 md:py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container-custom text-center max-w-4xl relative z-10">
          <span className="inline-block bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Our Backbone
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B5E20] mb-6">Meet The Team</h1>
          <p className="text-lg text-gray-700">The dedicated professionals working behind the scenes to make your wellness journey smooth and successful.</p>
        </div>
      </section>

      <TeamShowcase showCTA={false} />

      <ConsultationCTA />
    </div>
  )
}

export default TeamPage

