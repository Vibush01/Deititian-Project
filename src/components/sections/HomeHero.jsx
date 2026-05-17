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
            <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] overflow-hidden">
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              
              {/* Text Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom w-full">
                  <div className="max-w-xl lg:max-w-2xl">
                    <span className="inline-block bg-primary/90 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                      {banner.subtitle}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                      {banner.title}
                    </h1>
                    <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-lg drop-shadow">
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/contact-us"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                      >
                        Book Consultation
                      </a>
                      <a
                        href="/service"
                        className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
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
