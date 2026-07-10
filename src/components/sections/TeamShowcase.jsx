import { Link } from 'react-router-dom'
import teamImg from '../../assets/images/team-img.webp'

const highlights = [
  'Medical Diet Experts',
  'Scientific & Personalized Approach',
  'Results That Last',
  'Care That Continues',
  'Safe, Effective & Sustainable',
]

const TeamShowcase = ({ showCTA = true }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E8F5E9]/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#C8E6C9]/30 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            Experts in Nutrition.<br className="hidden md:block" /> Driven by Results.
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A team of <strong className="text-[#2E7D32]">Medical Diet Experts</strong> dedicated to helping you reverse health conditions and live a healthier, happier life.
          </p>
        </div>

        {/* Team Image */}
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
            <img
              src={teamImg}
              alt="FitJeeva — Meet The Team"
              className="w-full h-auto block"
              loading="lazy"
              decoding="async"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Decorative accents */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#A5D6A7] rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#C8E6C9] rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Highlights Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 md:mt-14">
          {highlights.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-white border border-[#C8E6C9] text-gray-800 text-xs md:text-sm font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-[#2E7D32] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="w-2 h-2 bg-[#2E7D32] rounded-full flex-shrink-0"></span>
              {item}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center mt-8 text-lg md:text-xl font-bold text-[#2E7D32] italic">
          Your Health. Our Priority.
        </p>

        {/* CTA */}
        {showCTA && (
          <div className="text-center mt-8">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Meet Our Full Team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default TeamShowcase
