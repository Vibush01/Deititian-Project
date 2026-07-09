import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import { useExperts } from '../hooks/usePageData'
import useDocumentMeta from '../hooks/useDocumentMeta'
import fitjeevaDietitian from '../assets/images/fitjeeva-dietitian.jpg'
import fitjeevaClinical from '../assets/images/fitjeeva-clinical.jpg'

const defaultExperts = [
  {
    id: 1,
    name: 'Dr. Anjali Sharma',
    role: 'Chief Clinical Nutritionist',
    image: fitjeevaDietitian,
    bio: 'With over 15 years of experience in clinical nutrition, Dr. Sharma specializes in metabolic disorders and therapeutic diets.'
  },
  {
    id: 2,
    name: 'Neha Verma',
    role: 'PCOS & Thyroid Specialist',
    image: fitjeevaClinical,
    bio: 'Neha holds a Masters in Food & Nutrition and has successfully helped over 500+ women reverse their hormonal imbalances naturally.'
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    role: 'Sports Nutritionist',
    image: fitjeevaDietitian,
    bio: 'Rohan specializes in athletic performance and muscle building, creating customized macros for optimal fitness results.'
  }
]

const ExpertsPage = () => {
  const { experts: firestoreExperts } = useExperts()
  const experts = firestoreExperts.length > 0 ? firestoreExperts : defaultExperts
  useDocumentMeta({
    title: 'Our Nutrition Experts – Meet the Clinical Dietitians',
    description: 'Meet FitJeeva\'s qualified clinical dietitians and nutrition experts. Specialists in PCOS, thyroid, diabetes, sports nutrition & weight management.',
    canonical: '/experts',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-10">
      <section className="py-12 md:py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container-custom text-center max-w-4xl relative z-10">
          <span className="inline-block bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Meet Our Experts
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B5E20] mb-6">Our Nutrition Experts</h1>
          <p className="text-lg text-gray-700">Guided by science, driven by care. Meet the qualified dietitians and nutritionists behind FitJeeva's success.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{expert.name}</h3>
                  <p className="text-[#2E7D32] font-bold text-sm mb-4">{expert.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{expert.bio}</p>
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

export default ExpertsPage
