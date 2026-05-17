import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import fitjeevaBanner from '../../assets/images/fitjeeva-banner.jpg';
import fitjeevaClinical from '../../assets/images/fitjeeva-clinical.jpg';
import fitjeevaDietitian from '../../assets/images/fitjeeva-dietitian.jpg';
import fitjeevaHomevisit from '../../assets/images/fitjeeva-homevisit.jpg';
import fitjeevaMillet from '../../assets/images/fitjeeva-millet.jpg';

/**
 * FitJeeva Home Hero slider.
 * Uses Swiper to cycle through branded hero banners.
 */

const banners = [
  {
    image: fitjeevaBanner,
    alt: 'FitJeeva — Your Trusted Nutrition Partner',
    title: 'Transform Your Health',
    subtitle: 'With Expert Nutrition Guidance',
    description: 'India\'s most trusted clinical nutrition practice — helping 1,00,000+ people achieve their health goals through personalized diet plans.',
  },
  {
    image: fitjeevaClinical,
    alt: 'FitJeeva Clinical Nutrition',
    title: 'Clinical Nutrition',
    subtitle: 'Evidence-Based Approach',
    description: 'Expert diet plans for PCOD, Thyroid, Diabetes management and sustainable weight loss backed by science.',
  },
  {
    image: fitjeevaDietitian,
    alt: 'FitJeeva Online Consultation',
    title: 'Online Consultation',
    subtitle: 'From Anywhere, Anytime',
    description: 'Connect with our expert dietitians from the comfort of your home. Personalized plans delivered digitally.',
  },
  {
    image: fitjeevaHomevisit,
    alt: 'FitJeeva Home Visit Service',
    title: 'Home Visit Service',
    subtitle: 'Nutrition at Your Doorstep',
    description: 'Our dietitians come to you — personalized in-home consultations for the entire family.',
  },
];

const HomeHero = () => {
  return (
    <section className="w-full relative z-0">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[540px] lg:h-[600px] overflow-hidden">
              {/* Background Image — positioned to show non-text area of image */}
              <img
                src={banner.image}
                alt={banner.alt}
                className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              {/* Gradient Overlay — bottom-up on mobile, left-right on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/45 sm:to-transparent" />
              
              {/* Text Content — bottom-aligned on mobile, center-aligned on desktop */}
              <div className="absolute inset-0 flex items-end sm:items-center pb-10 sm:pb-0">
                <div className="container-custom w-full px-5 sm:px-6">
                  <div className="max-w-xl lg:max-w-2xl">
                    <span className="inline-block bg-primary/90 text-white text-[10px] sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 tracking-wider uppercase">
                      {banner.subtitle}
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2 sm:mb-4 drop-shadow-lg">
                      {banner.title}
                    </h1>
                    <p className="hidden sm:block text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-lg drop-shadow">
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <a
                        href="/contact-us"
                        className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-xs sm:text-base"
                      >
                        Book Consultation
                      </a>
                      <a
                        href="/service"
                        className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 text-xs sm:text-base"
                      >
                        Our Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.25);
          padding: 28px 18px;
          border-radius: 8px;
          transition: background 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.45);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 22px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2E7D32 !important;
          width: 28px;
          border-radius: 5px;
        }
        @media (max-width: 767px) {
          .swiper-button-next,
          .swiper-button-prev {
            padding: 20px 14px;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px !important;
          }
        }
      `}} />
    </section>
  );
};

export default HomeHero;
