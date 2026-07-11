import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FaArrowRight, FaNewspaper, FaStar, FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import HomeHero from "../components/sections/HomeHero";
import StatsCounter from "../components/sections/StatsCounter";
import ConsultationCTA from "../components/sections/ConsultationCTA";
import InstagramFeed from "../components/sections/InstagramFeed";
import ContactCTA from "../components/sections/ContactCTA";
import ClinicLocations from "../components/sections/ClinicLocations";
import ConsultationForm from "../components/sections/ConsultationForm";
import { useHomeExpertiseCards } from "../hooks/useServices";
import { useMediaData, useHomePageData } from "../hooks/usePageData";
import useSiteSettings from "../hooks/useSiteSettings";
import useDocumentMeta from "../hooks/useDocumentMeta";

/* =========================================================
   Scroll-reveal Hook — IntersectionObserver
   ========================================================= */
const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      reveals.forEach((r) => observer.observe(r));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
};

/* =========================================================
   Home-Page-Only Sections
   ========================================================= */

/* --- Quick-link icon cards (PCOD | Thyroid | Diabetes | Explore) --- */
const quickLinks = [
  {
    label: "PCOD",
    sublabel: "Hormonal Balance",
    to: "/service/pcod-pcos",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path
          d="M32 18c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm-10 14c-3 0-5.5 2.5-5.5 5.5S19 43 22 43s5.5-2.5 5.5-5.5S25 32 22 32zm20 0c-3 0-5.5 2.5-5.5 5.5S39 43 42 43s5.5-2.5 5.5-5.5S45 32 42 32z"
          fill="#2E7D32"
        />
      </svg>
    ),
  },
  {
    label: "Thyroid",
    sublabel: "Metabolism Care",
    to: "/service/thyroid",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path
          d="M32 16c-2 0-3 1-3 3v6c-4 1-7 5-7 9 0 6 4 10 10 14 6-4 10-8 10-14 0-4-3-8-7-9v-6c0-2-1-3-3-3z"
          fill="#2E7D32"
        />
      </svg>
    ),
  },
  {
    label: "Diabetes",
    sublabel: "Sugar Control",
    to: "/service/diabetes",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path
          d="M32 14l-2 4h-6l2 6-4 4 6 2v6h4v-6l6-2-4-4 2-6h-6l2-4z"
          fill="#2E7D32"
        />
        <circle cx="32" cy="36" r="5" fill="#1B5E20" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Explore All",
    sublabel: "View Services",
    to: "/service",
    icon: (
      <svg viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5E9" />
        <path
          d="M24 22h16v4H24zM22 30h20v4H22zM26 38h12v4H26z"
          fill="#2E7D32"
        />
        <path
          d="M38 42l6 6"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const QuickLinkCards = () => {
  const { quickLinks: dynamicQuickLinks } = useHomePageData();

  // Merge dynamic text/links with the hardcoded SVGs
  const finalQuickLinks = dynamicQuickLinks ? quickLinks.map((link, idx) => ({
    ...link,
    label: dynamicQuickLinks[idx]?.label || link.label,
    sublabel: dynamicQuickLinks[idx]?.sublabel || link.sublabel,
    to: dynamicQuickLinks[idx]?.to || link.to,
  })) : quickLinks;

  return (
  <section className="py-8 md:py-12 bg-white relative">
    <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#E8F5E9]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
    <div className="container-custom relative z-10">
      <div className="text-center mb-8 md:mb-10">
        <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">
          Quick Access
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
          Explore Our Specializations
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {finalQuickLinks.map((link, idx) => (
          <Link 
            key={idx} 
            to={link.to}
            className="group relative flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-1 hover:border-[#2E7D32]/20 transition-all duration-300"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              {link.icon}
            </div>
            <div className="flex-grow flex flex-col justify-center">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{link.label}</h3>
              <p className="text-xs text-gray-500 font-medium">{link.sublabel}</p>
            </div>
            <div className="mt-4 text-[#2E7D32] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F5E9]">
              <FaArrowRight className="text-sm" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
  )
};

const ExpertiseSection = () => {
  const { cards: homeExpertiseCards } = useHomeExpertiseCards()
  return (
  <section className="py-12 md:py-16 bg-gray-50/50 border-y border-gray-100">
    <div className="container-custom">
      <div className="flex flex-col items-center text-center mb-10 md:mb-12">
        <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">
          Our Diet Clinic Chain
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
          Your Trusted <br className="hidden md:block" /> Medical Nutrition Clinic
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
          Our medical diet clinic in India specializes in medical nutrition science that heals from the root. We focus on personalized diet plans using real Indian food and millet based diets, never shortcuts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {homeExpertiseCards.map((card, index) => (
          <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
            <div className="relative h-40 md:h-48 overflow-hidden">
              <div className="absolute top-3 left-3 bg-white text-[#2E7D32] w-8 h-8 rounded-full flex items-center justify-center font-black text-xs z-10 shadow-md">
                0{index + 1}
              </div>
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow bg-white">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                {card.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {card.description}
              </p>
              <div className="mt-auto flex items-center text-[#2E7D32] text-xs font-bold group-hover:gap-2 transition-all">
                Learn More <FaArrowRight className="ml-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
};

const ClientSpotlight = () => {
  const { settings } = useSiteSettings();
  
  const defaultSpotlightStats = [
    { number: "1,00,000+", label: "Lives Transformed" },
    { number: "35,000+", label: "Weight Loss Journeys" },
    { number: "Chandigarh", label: "Based in India" },
  ];
  
  const spotlightStats = settings.spotlightStats || defaultSpotlightStats;
  
  const testimonial = settings.spotlightTestimonial || {
    name: "Simran K.",
    review: "“Lost 18 kg in 4 months with FitJeeva's personalized plan. The diet was entirely home-cooked Indian food. No supplements, no shortcuts!”"
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2E7D32]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4CAF50]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div>
            <span className="inline-block bg-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 border border-white/20 backdrop-blur-sm">
              Client Spotlight
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              Our Weight Loss<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#F48FB1]">
                Success Stories
              </span>
            </h2>
            
            <div className="flex flex-col gap-3 border-l-2 border-[#2E7D32]/50 pl-5">
              {spotlightStats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black text-white">{stat.number}</span>
                  <span className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:pl-6">
            <div className="relative mb-8">
              <FaQuoteLeft className="absolute -top-3 -left-3 text-4xl text-white/5" />
              <p className="text-sm md:text-base text-gray-300 leading-relaxed relative z-10 font-medium">
                Real people. Real transformations. Every personalized diet plan we design at our medical diet clinic in India is rooted in everyday Indian food and medical nutrition science. Whether you need a PCOD diet plan, diabetes management, or a millet based diet plan, our mindful coaching ensures your results don't just come—they stay.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                  {testimonial.name ? testimonial.name.charAt(0) : "S"}
                </div>
                <div>
                  <span className="block font-bold text-base text-white">{testimonial.name}</span>
                  <div className="flex gap-1 text-yellow-400 text-xs mt-0.5">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed text-xs md:text-sm">
                {testimonial.review}
              </p>
            </div>
            
            <div>
              <Button to="/service" icon={<FaArrowRight />} variant="white" className="text-sm py-2.5 px-6">
                View All Success Stories
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const defaultMediaLogos = ["The Times of India", "Hindustan Times", "Health Magazine", "Wellness Daily"];

const MediaSpotlight = () => {
  const { mediaLogos } = useMediaData();
  const logos = mediaLogos.length > 0 ? mediaLogos : defaultMediaLogos;

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[#E8F5E9]/30 opacity-50"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-8">
          <SectionHeading label="Media Spotlight" title="" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug max-w-3xl mx-auto -mt-3">
            Featured in leading publications for outstanding contributions to clinical nutrition and wellness education.
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((media, i) => (
            <div key={i} className="flex items-center justify-center p-3 border border-gray-200 rounded-xl w-full h-20 hover:border-[#2E7D32]/30 hover:bg-[#E8F5E9] transition-all duration-300 cursor-default">
              <span className="font-black text-gray-400 uppercase tracking-widest text-[10px] md:text-xs text-center">
                {media.name || media}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const pageRef = useScrollReveal();

  useDocumentMeta({
    title: 'Best Dietitian & Medical Nutrition Clinic in Chandigarh',
    description: 'FitJeeva – India\'s trusted Medical Nutrition Clinic in Chandigarh. Expert diet plans for PCOD, thyroid, diabetes & weight loss. Personalized clinical nutrition using Indian food. Book your free consultation today!',
    canonical: '/',
  });

  return (
    <div ref={pageRef} className="flex flex-col bg-white overflow-hidden">
      <HomeHero />
      <StatsCounter />
      <QuickLinkCards />
      <ExpertiseSection />
      <ClientSpotlight />
      <ConsultationForm />
      
      <MediaSpotlight />

      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
      <ClinicLocations />
    </div>
  );
};

export default HomePage;
