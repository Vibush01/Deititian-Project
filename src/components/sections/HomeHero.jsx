import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

/**
 * Home Hero — Full-width carousel-style hero matching the original site.
 * Features:
 *  - Patterned background with subtle texture
 *  - Central hero photo (dietitian) with pink accent circles
 *  - Bold text overlays: "Evidence Before Trends" + "Beyond Calorie Counting"
 *  - Pink wave SVG curve across bottom
 *  - 6 circular before/after client photos along the wave
 *  - Weight loss stats overlaid near client photos
 *  - Decorative carousel arrows
 */

const clientPhotos = [
  { img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop', pos: 'before' },
  { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', pos: 'after' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', pos: 'before' },
  { img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', pos: 'after' },
  { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', pos: 'before' },
  { img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', pos: 'after' },
]

const transformationStats = [
  { lost: '14.3 KG', duration: '2 Months' },
  { lost: '55 KG', duration: '5 Months' },
  { lost: '37 KG', duration: '7 Months' },
]

const HomeHero = () => {
  return (
    <section className="home-hero">
      {/* ===== Pink wave SVG at bottom ===== */}
      <svg
        className="home-hero-wave"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 400V220C120 180 240 160 360 200C480 240 540 300 660 300C780 300 840 240 960 200C1080 160 1200 180 1320 220C1380 240 1420 260 1440 270V400H0Z"
          fill="#E91E63"
        />
        <path
          d="M0 400V260C120 220 240 200 360 240C480 280 540 330 660 330C780 330 840 280 960 240C1080 200 1200 220 1320 260C1380 280 1420 295 1440 300V400H0Z"
          fill="#C2185B"
        />
      </svg>

      {/* ===== Content Layer ===== */}
      <div className="home-hero-content">
        <div className="container-custom py-8 md:py-12 lg:py-16">

          {/* === Top area: small logo/arrow icon === */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="text-primary">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                <path d="M16 0L24 12H20L28 24H4L12 12H8L16 0Z" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* === Main hero layout: texts + central photo === */}
          <div className="relative flex items-center justify-center min-h-[350px] md:min-h-[400px] lg:min-h-[420px]">

            {/* Left text overlay */}
            <div className="hero-text-overlay absolute left-4 md:left-8 lg:left-16 top-1/4 md:top-1/3 -translate-y-1/2 z-10 hidden sm:block">
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
                <span className="script-text block text-primary text-lg md:text-xl lg:text-2xl mb-[-4px]">Evidence</span>
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-black">Before</span>
                <br />
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-black">Trends</span>
              </h2>
            </div>

            {/* Right text overlay */}
            <div className="hero-text-overlay absolute right-4 md:right-8 lg:right-16 top-1/4 md:top-1/3 -translate-y-1/2 z-10 hidden sm:block text-right">
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold text-dark leading-tight">
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-black">Beyond</span>
                <br />
                <span className="script-text text-primary text-lg md:text-xl lg:text-2xl">Calorie</span>
                <br />
                <span className="text-dark text-3xl md:text-4xl lg:text-5xl font-black">Counting</span>
              </h2>
            </div>

            {/* Central hero photo */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Pink accent circle behind photo */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-primary opacity-80" />

              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop"
                alt="Dietitian Shreya"
                className="hero-central-photo relative z-10 w-48 h-60 md:w-64 md:h-80 lg:w-72 lg:h-[360px] object-cover object-top rounded-b-[40%]"
              />

              {/* Mobile text (shown only on small screens) */}
              <div className="sm:hidden text-center mt-4 z-10 relative">
                <h2 className="text-2xl font-black text-dark leading-tight">
                  Evidence <span className="text-primary italic font-normal">Before</span> Trends
                </h2>
                <h2 className="text-2xl font-black text-dark leading-tight mt-1">
                  Beyond <span className="text-primary italic font-normal">Calorie</span> Counting
                </h2>
              </div>
            </div>

            {/* Carousel arrows */}
            <button
              className="hero-arrow absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-gray-text text-sm" />
            </button>
            <button
              className="hero-arrow absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-gray-text text-sm" />
            </button>
          </div>

          {/* === Client transformation photos along the wave === */}
          <div className="relative z-10 hidden md:block">
            <div className="flex justify-between items-end max-w-6xl mx-auto px-4 -mt-16 lg:-mt-20">
              {/* Group 1: client pair + stat */}
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <img src={clientPhotos[0].img} alt="Client before" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '0s' }} />
                  <img src={clientPhotos[1].img} alt="Client after" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '0.3s' }} />
                </div>
                <div className="hero-stat-text text-center text-white mt-1">
                  <p className="text-xs italic text-white/80">Lost</p>
                  <p className="text-xl lg:text-2xl font-extrabold leading-tight">
                    {transformationStats[0].lost} <span className="text-xs font-normal text-white/80">in</span>
                  </p>
                  <p className="text-sm lg:text-base font-bold">{transformationStats[0].duration}</p>
                </div>
              </div>

              {/* Spacer for central area */}
              <div className="w-32 lg:w-48" />

              {/* Group 2: client pair + stat */}
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <img src={clientPhotos[2].img} alt="Client before" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '0.6s' }} />
                  <img src={clientPhotos[3].img} alt="Client after" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '0.9s' }} />
                </div>
                <div className="hero-stat-text text-center text-white mt-1">
                  <p className="text-xs italic text-white/80">Lost</p>
                  <p className="text-xl lg:text-2xl font-extrabold leading-tight">
                    {transformationStats[1].lost} <span className="text-xs font-normal text-white/80">in</span>
                  </p>
                  <p className="text-sm lg:text-base font-bold">{transformationStats[1].duration}</p>
                </div>
              </div>

              {/* Group 3: client pair + stat */}
              <div className="flex flex-col items-center">
                <div className="flex gap-2 mb-2">
                  <img src={clientPhotos[4].img} alt="Client before" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '1.2s' }} />
                  <img src={clientPhotos[5].img} alt="Client after" className="hero-client-circle w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover animate-float" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="hero-stat-text text-center text-white mt-1">
                  <p className="text-xs italic text-white/80">Lost</p>
                  <p className="text-xl lg:text-2xl font-extrabold leading-tight">
                    {transformationStats[2].lost} <span className="text-xs font-normal text-white/80">in</span>
                  </p>
                  <p className="text-sm lg:text-base font-bold">{transformationStats[2].duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* === Mobile client stats (simplified) === */}
          <div className="relative z-10 md:hidden mt-4 pb-4">
            <div className="flex justify-center gap-6 flex-wrap">
              {transformationStats.map((stat, i) => (
                <div key={i} className="text-center text-white">
                  <p className="text-xs italic text-white/80">Lost</p>
                  <p className="text-lg font-extrabold leading-tight">{stat.lost}</p>
                  <p className="text-xs font-semibold">in {stat.duration}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomeHero
