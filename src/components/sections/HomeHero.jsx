import { Link } from 'react-router-dom'
import Button from '../ui/Button'

/**
 * Home Hero — Clean, modern split layout matching the original site.
 */

const HomeHero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-primary-lighter overflow-hidden">
      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider animate-fade-in-up">
            #1 Best Diet Clinic India
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Evidence <span className="text-primary italic font-medium">Before</span> Trends.
            <br className="hidden md:block" />
            Beyond <span className="text-primary italic font-medium">Calorie</span> Counting.
          </h1>
          
          <p className="text-lg text-gray-text max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our medical diet clinic specializes in personalized diet plans using real Indian food and millet-based diets. Real people. Real transformations.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button to="/contact-us" size="lg" className="animate-pulse-glow">
              Book a Consultation
            </Button>
            <Button to="/service" variant="secondary" size="lg">
              Explore Programs
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-12 pt-8 border-t border-gray-border flex flex-wrap justify-center lg:justify-start gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-3xl font-black text-dark">1 Lakh+</p>
              <p className="text-sm font-semibold text-gray-text uppercase">Success Stories</p>
            </div>
            <div>
              <p className="text-3xl font-black text-dark">50+</p>
              <p className="text-sm font-semibold text-gray-text uppercase">Expert Dietitians</p>
            </div>
            <div>
              <p className="text-3xl font-black text-dark">10+</p>
              <p className="text-sm font-semibold text-gray-text uppercase">Clinic Locations</p>
            </div>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Background decorative blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-3xl -z-10"></div>
          
          {/* Circular accent */}
          <div className="absolute top-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-20 animate-float"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary rounded-full opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop"
              alt="Dietitian Shreya"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
