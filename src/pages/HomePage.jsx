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
import { homeExpertiseCards } from "../data/servicesData";

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
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path
          d="M32 18c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm-10 14c-3 0-5.5 2.5-5.5 5.5S19 43 22 43s5.5-2.5 5.5-5.5S25 32 22 32zm20 0c-3 0-5.5 2.5-5.5 5.5S39 43 42 43s5.5-2.5 5.5-5.5S45 32 42 32z"
          fill="#E91E63"
        />
      </svg>
    ),
  },
  {
    label: "Thyroid",
    sublabel: "Metabolism Care",
    to: "/service/thyroid",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path
          d="M32 16c-2 0-3 1-3 3v6c-4 1-7 5-7 9 0 6 4 10 10 14 6-4 10-8 10-14 0-4-3-8-7-9v-6c0-2-1-3-3-3z"
          fill="#E91E63"
        />
      </svg>
    ),
  },
  {
    label: "Diabetes",
    sublabel: "Sugar Control",
    to: "/service/diabetes",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path
          d="M32 14l-2 4h-6l2 6-4 4 6 2v6h4v-6l6-2-4-4 2-6h-6l2-4z"
          fill="#E91E63"
        />
        <circle cx="32" cy="36" r="5" fill="#C2185B" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Explore All",
    sublabel: "View Services",
    to: "/service",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path
          d="M24 22h16v4H24zM22 30h20v4H22zM26 38h12v4H26z"
          fill="#E91E63"
        />
        <path
          d="M38 42l6 6"
          stroke="#E91E63"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const QuickLinkCards = () => (
  <section className="py-12 md:py-16 bg-white">
    <div className="container-custom">
      {/* Section micro-heading */}
      <div className="text-center mb-8 md:mb-10 reveal">
        <span className="section-label">Quick Access</span>
        <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">
          Explore Our Specializations
        </h2>
        <div className="section-divider mt-4"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
        {quickLinks.map((link, index) => (
          <Link
            key={link.label}
            to={link.to}
            className="quick-link-card reveal flex flex-col items-center justify-center gap-3 py-8 px-4 md:py-10 md:px-6"
            style={{ "--child-index": index }}
          >
            <div className="quick-link-icon">{link.icon}</div>
            <div className="text-center">
              <span className="block text-sm md:text-base font-bold text-dark">
                {link.label}
              </span>
              <span className="block text-xs text-gray-text mt-0.5">
                {link.sublabel}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              <FaArrowRight className="text-[10px]" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* --- Expertise / "Our Diet Clinic Chain" grid --- */
const ExpertiseSection = () => (
  <section className="section-padding bg-gray-light/50">
    <div className="container-custom">
      <div className="reveal">
        <SectionHeading
          label="Our Diet Clinic Chain"
          title="Dietitian Shreya: India's Top Medical Diet Clinic"
          subtitle="Our medical diet clinic in India specializes in medical nutrition science that heals from the root. We focus on personalized diet plans using real Indian food and millet based diets, never shortcuts."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-14 stagger-children">
        {homeExpertiseCards.map((card, i) => (
          <div
            key={i}
            className="expertise-card reveal"
            style={{ "--child-index": i }}
          >
            {/* Image with number badge */}
            <div className="expertise-card-image">
              <span className="expertise-card-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-56 md:h-64 lg:h-72 object-cover"
              />
            </div>

            {/* Card Body */}
            <div className="expertise-card-body">
              <h3 className="text-lg md:text-xl font-bold text-dark leading-snug mb-2">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-gray-text leading-relaxed">
                {card.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-300">
                Learn More <FaArrowRight className="text-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* --- Client Spotlight / Success Stories --- */
const spotlightStats = [
  { number: "1,00,000+", label: "Lives Transformed" },
  { number: "35,000+", label: "Weight Loss Journeys" },
  { number: "9+", label: "Clinic Locations" },
];

const ClientSpotlight = () => {
  return (
    <section className="section-padding spotlight-gradient">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
          {/* Left: label + heading */}
          <div className="lg:max-w-md flex-shrink-0 reveal-left">
            <span className="section-label">Client Spotlight</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-dark leading-tight mt-2">
              Our Weight Loss
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>

            {/* Stats Cards */}
            <div className="flex flex-col gap-3 mt-8">
              {spotlightStats.map((stat, index) => (
                <div
                  key={index}
                  className="spotlight-stat reveal"
                  style={{ "--child-index": index + 1 }}
                >
                  <span className="spotlight-stat-number">{stat.number}</span>
                  <span className="text-sm text-gray-text font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: description text + quote */}
          <div className="lg:max-w-lg lg:pt-6 reveal-right">
            <div className="relative">
              <FaQuoteLeft className="text-primary/10 text-5xl absolute -top-2 -left-2" />
              <p className="text-base md:text-lg text-gray-text leading-relaxed text-justify relative z-10 pl-6 lg:pl-8">
                Real people. Real transformations. Every personalized diet plan
                we design at our medical diet clinic in India is rooted in
                everyday Indian food and medical nutrition science. Whether you
                need a PCOD diet plan, diabetes management, or a millet based
                diet plan, our mindful coaching ensures your results don&apos;t
                just come—they stay.
              </p>
            </div>

            {/* Testimonial highlight */}
            <div className="mt-8 p-5 bg-white rounded-2xl shadow-sm border border-gray-border/50 reveal">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">S</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-dark">
                    Simran K.
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-400 text-xs"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-text leading-relaxed italic">
                &ldquo;Lost 18 kg in 4 months with Dietitian Shreya&apos;s
                personalized plan. The diet was entirely home-cooked Indian food.
                No supplements, no shortcuts!&rdquo;
              </p>
            </div>

            <div className="mt-6 reveal">
              <Button to="/service" icon={<FaArrowRight />}>
                View All Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Media Spotlight --- */
const mediaPublications = [
  { name: "Hindustan Times", icon: <FaNewspaper /> },
  { name: "Chandigarh Tribune", icon: <FaNewspaper /> },
  { name: "Yugmarg", icon: <FaNewspaper /> },
];

const MediaSpotlight = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <div className="reveal">
        <SectionHeading label="Media Spotlight" title="" />
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-soft leading-snug max-w-4xl mx-auto -mt-4">
          Featured in leading publications for outstanding contributions to
          clinical nutrition and wellness education.
        </h3>
      </div>

      {/* Media Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8 stagger-children">
        {mediaPublications.map((pub, index) => (
          <div
            key={pub.name}
            className="media-badge reveal"
            style={{ "--child-index": index }}
          >
            <span className="media-badge-icon">{pub.icon}</span>
            {pub.name}
          </div>
        ))}
      </div>

      {/* Decorative divider */}
      <div className="section-divider mt-10 reveal"></div>
    </div>
  </section>
);

/* =========================================================
   HomePage — Full Composition
   ========================================================= */
const HomePage = () => {
  const pageRef = useScrollReveal();

  return (
    <div ref={pageRef}>
      {/* 1. Hero Section — Full-width carousel style matching original */}
      <HomeHero />

      {/* 2. Stats Counter */}
      <StatsCounter />

      {/* 3. Quick-link icon cards (PCOD, Thyroid, Diabetes, Explore) */}
      <QuickLinkCards />

      {/* 4. Expertise / Diet Clinic Chain */}
      <ExpertiseSection />

      {/* 5. Client Spotlight */}
      <ClientSpotlight />

      {/* 6. Consultation Form */}
      <ConsultationForm />

      {/* 7. Media Spotlight */}
      <MediaSpotlight />

      {/* 8. Consultation CTA Banner */}
      <ConsultationCTA />

      {/* 9. Instagram Feed */}
      <InstagramFeed />

      {/* 10. Contact CTA */}
      <ContactCTA />

      {/* 11. Clinic Locations */}
      <ClinicLocations />
    </div>
  );
};

export default HomePage;
