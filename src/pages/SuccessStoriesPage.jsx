import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ss1 from '../assets/images/SS1.JPG'
import ss2 from '../assets/images/SS2.JPG'
import ss3 from '../assets/images/SS3.JPG'
import ss4 from '../assets/images/SS4.JPG'

const stories = [
  {
    id: 1,
    name: 'Incredible Transformation',
    achievement: 'Massive Weight Loss',
    image: ss1,
    story: 'Struggling with weight was a constant battle until I found FitJeeva. Through a customized, easy-to-follow diet plan, I have completely transformed my health, energy levels, and confidence!'
  },
  {
    id: 2,
    name: 'Muskan',
    achievement: 'Lost 28 Kgs',
    image: ss2,
    story: 'Going from 93 Kgs to 65 Kgs felt impossible, but FitJeeva made it a reality. Their constant support and personalized nutrition approach helped me shed 28 Kgs safely and naturally.'
  },
  {
    id: 3,
    name: 'Health Reclaimed',
    achievement: 'Significant Fat Loss',
    image: ss3,
    story: 'I had almost given up on losing weight. Thanks to the expert dietitians at FitJeeva, I learned how to eat right without starving myself. The results have been absolutely life-changing.'
  },
  {
    id: 4,
    name: 'A New Lifestyle',
    achievement: 'Sustainable Weight Management',
    image: ss4,
    story: 'It’s not just about losing weight; it’s about maintaining it. FitJeeva taught me how to balance my meals and enjoy my food while still achieving incredible fitness goals.'
  }
]

const SuccessStoriesPage = () => {
  useDocumentMeta({
    title: 'Success Stories – Real Weight Loss & Health Transformations',
    description: 'Read real success stories from FitJeeva clients. Inspiring weight loss, diabetes reversal, and PCOS management transformations through personalized clinical nutrition.',
    canonical: '/success-stories',
  })

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                <div className="h-72 bg-gray-50 flex items-center justify-center p-4">
                  <img src={story.image} alt={story.name} className="w-full h-full object-contain rounded-xl shadow-sm" />
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
