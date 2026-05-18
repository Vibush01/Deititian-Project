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
 * FitJeeva Home Hero — Simple image carousel slider.
 * No overlay text, just clean image cycling.
 */

const banners = [
  { image: fitjeevaBanner, alt: 'FitJeeva — Your Trusted Nutrition Partner' },
  { image: fitjeevaClinical, alt: 'FitJeeva Clinical Nutrition' },
  { image: fitjeevaDietitian, alt: 'FitJeeva Online Consultation' },
  { image: fitjeevaHomevisit, alt: 'FitJeeva Home Visit Service' },
  { image: fitjeevaMillet, alt: 'FitJeeva Millet Based Diets' },
];

const HomeHero = () => {
  return (
    <section className="w-full relative z-0">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full hero-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] max-h-[750px] bg-gray-100">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.3);
          padding: 28px 18px;
          border-radius: 8px;
          transition: background 0.3s ease;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        .hero-swiper .swiper-button-next::after,
        .hero-swiper .swiper-button-prev::after {
          font-size: 22px !important;
          font-weight: bold;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2E7D32 !important;
          width: 28px;
          border-radius: 5px;
        }
        @media (max-width: 767px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            padding: 18px 12px;
          }
          .hero-swiper .swiper-button-next::after,
          .hero-swiper .swiper-button-prev::after {
            font-size: 16px !important;
          }
        }
      `}} />
    </section>
  );
};

export default HomeHero;
