import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import fitjeevaHomevisit from '../assets/images/fitjeeva-homevisit.jpg'
import fitjeevaClinical from '../assets/images/fitjeeva-clinical.jpg'
import fitjeevaMillet from '../assets/images/fitjeeva-millet.jpg'

const dummyStories = [
  {
    id: 1,
    name: 'Aarti S.',
    achievement: 'Lost 15kg in 6 months',
    image: fitjeevaHomevisit,
    story: 'Before joining FitJeeva, I struggled with my weight and low energy levels. The personalized diet plan and constant support from the experts completely transformed my lifestyle. I feel healthier and more confident than ever!'
  },
  {
    id: 2,
    name: 'Rahul V.',
    achievement: 'Reversed Type 2 Diabetes',
    image: fitjeevaClinical,
    story: 'I was diagnosed with early-stage diabetes and was prescribed medication. FitJeeva showed me how to manage my condition purely through diet and lifestyle changes. My HbA1c is now normal without any medication.'
  },
  {
    id: 3,
    name: 'Priya M.',
    achievement: 'Managed PCOS & Lost 8kg',
    image: fitjeevaMillet,
    story: 'Dealing with PCOS was extremely frustrating until I found FitJeeva. Their holistic approach helped balance my hormones, clear my skin, and safely lose the stubborn weight I had been fighting for years.'
  }
]

const SuccessStoriesPage = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden pb-10">
      <section className="py-12 md:py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container-custom text-center max-w-4xl relative z-10">
          <span className="inline-block bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B5E20] mb-6">Success Stories</h1>
          <p className="text-lg text-gray-700">Real people, real results. Discover how our personalized nutrition plans have transformed lives across the globe.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyStories.map((story) => (
              <div key={story.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                <div className="h-56 overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-[#2E7D32] font-bold text-sm mb-4">{story.achievement}</p>
                  <p className="text-gray-600 italic leading-relaxed text-sm">"{story.story}"</p>
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

export default SuccessStoriesPage
