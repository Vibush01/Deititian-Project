import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import fitjeevaHomevisit from '../assets/images/fitjeeva-homevisit.jpg'
import fitjeevaBanner from '../assets/images/fitjeeva-banner.jpg'

const dummyTeam = [
  {
    id: 1,
    name: 'Suresh Kumar',
    role: 'Customer Success Manager',
    image: fitjeevaBanner,
    bio: 'Suresh ensures that every client at FitJeeva receives prompt support, guidance, and a seamless experience throughout their health journey.'
  },
  {
    id: 2,
    name: 'Priya Desai',
    role: 'Operations Head',
    image: fitjeevaHomevisit,
    bio: 'Priya handles the day-to-day operations, ensuring that all our dietitians and clients are perfectly synced for daily consultations.'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Health Tech Lead',
    image: fitjeevaBanner,
    bio: 'Amit leads our digital platform, making sure that your diet plans, recipes, and progress trackers are always accessible and secure.'
  }
]

const TeamPage = () => {
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

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {dummyTeam.map((member) => (
              <div key={member.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#2E7D32] font-bold text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  )
}

export default TeamPage
