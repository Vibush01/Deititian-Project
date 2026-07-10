import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import { useSuccessStories } from '../hooks/usePageData'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ss1 from '../assets/images/SS1.webp'
import ss2 from '../assets/images/SS2.webp'
import ss3 from '../assets/images/SS3.webp'
import ss4 from '../assets/images/SS4.webp'
import ss5 from '../assets/images/SS5.webp'
import ss6 from '../assets/images/SS6.webp'
import ss7 from '../assets/images/SS7.webp'
import ss8 from '../assets/images/SS8.webp'
import ss9 from '../assets/images/SS9.webp'
import ss10 from '../assets/images/SS10.webp'
import ss11 from '../assets/images/SS11.webp'
import ss12 from '../assets/images/SS12.webp'
import ss13 from '../assets/images/SS13.webp'
import ss14 from '../assets/images/SS14.webp'
import ss15 from '../assets/images/SS15.webp'
import ss16 from '../assets/images/SS16.webp'

const defaultStories = [
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
    story: 'It\'s not just about losing weight; it\'s about maintaining it. FitJeeva taught me how to balance my meals and enjoy my food while still achieving incredible fitness goals.'
  },
  {
    id: 5,
    name: 'Complete Makeover',
    achievement: 'Stunning Body Transformation',
    image: ss5,
    story: 'FitJeeva\'s holistic approach helped me achieve a complete body transformation. With the right nutrition plan, I feel healthier, stronger, and more confident than ever before.'
  },
  {
    id: 6,
    name: 'Wellness Journey',
    achievement: 'Healthy Lifestyle Achieved',
    image: ss6,
    story: 'Thanks to FitJeeva, I finally understood the science behind healthy eating. Their personalized diet plan made it easy to adopt a sustainable and nourishing lifestyle.'
  },
  {
    id: 7,
    name: 'Fitness Milestone',
    achievement: 'Remarkable Progress',
    image: ss7,
    story: 'Every milestone felt achievable with FitJeeva by my side. Their expert guidance and constant motivation pushed me to reach fitness goals I never thought possible.'
  },
  {
    id: 8,
    name: 'Energy Restored',
    achievement: 'Vitality & Weight Loss',
    image: ss8,
    story: 'I was always tired and sluggish. FitJeeva\'s kitchen-based nutrition plan not only helped me lose weight but also restored my energy levels completely.'
  },
  {
    id: 9,
    name: 'Inspiring Change',
    achievement: 'Life-Changing Results',
    image: ss9,
    story: 'FitJeeva didn\'t just change my body — they changed my entire outlook on food and wellness. I now inspire others in my family to eat healthier too.'
  },
  {
    id: 10,
    name: 'Confident & Strong',
    achievement: 'Total Body Transformation',
    image: ss10,
    story: 'From feeling self-conscious to walking with confidence — FitJeeva\'s clinical nutrition expertise made all the difference in my transformation journey.'
  },
  {
    id: 11,
    name: 'Balanced Living',
    achievement: 'Sustainable Health Goals',
    image: ss11,
    story: 'What I love most about FitJeeva is their focus on sustainability. No crash diets, no extremes — just balanced, delicious meals that helped me achieve my health goals.'
  },
  {
    id: 12,
    name: 'Dream Achieved',
    achievement: 'Major Weight Loss Milestone',
    image: ss12,
    story: 'Reaching my dream weight felt impossible until FitJeeva created a plan that worked with my lifestyle. Their farm-to-plate philosophy truly resonated with me.'
  },
  {
    id: 13,
    name: 'Healthier & Happier',
    achievement: 'Overall Wellness Boost',
    image: ss13,
    story: 'FitJeeva helped me realize that wellness is not just about the number on the scale. I feel happier, more energetic, and healthier in every aspect of my life.'
  },
  {
    id: 14,
    name: 'Transformation Champion',
    achievement: 'Incredible Fitness Journey',
    image: ss14,
    story: 'My fitness journey with FitJeeva has been nothing short of incredible. The expert dietitians provided me with a roadmap to success that I could actually follow.'
  },
  {
    id: 15,
    name: 'New Beginning',
    achievement: 'Complete Health Overhaul',
    image: ss15,
    story: 'FitJeeva gave me a fresh start. Their clinical nutrition approach addressed my health issues at the root, and the results speak for themselves.'
  },
  {
    id: 16,
    name: 'Living My Best Life',
    achievement: 'Lasting Transformation',
    image: ss16,
    story: 'Thanks to FitJeeva, I\'m living my best life. The transformation has been lasting because they taught me how to make healthy choices every single day.'
  }
]

const SuccessStoriesPage = () => {
  const { stories: firestoreStories } = useSuccessStories()
  const stories = firestoreStories.length > 0 ? firestoreStories : defaultStories
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
