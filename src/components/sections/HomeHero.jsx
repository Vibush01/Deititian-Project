import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMediaData } from '../../hooks/usePageData';

import fitjeevaBanner1 from '../../assets/images/fitjeeva-banner-1.webp';
import fitjeevaBanner2 from '../../assets/images/fitjeeva-banner-2.webp';
import fitjeevaBanner3 from '../../assets/images/fitjeeva-banner-3.webp';
import fitjeevaBanner4 from '../../assets/images/fitjeeva-banner-4.webp';
import fitjeevaBanner5 from '../../assets/images/fitjeeva-banner-5.webp';

/**
 * FitJeeva Home Hero — Simple image carousel slider.
 * No overlay text, just clean image cycling.
 */

const staticBanners = [
  { image: fitjeevaBanner1, alt: 'FitJeeva — Your Trusted Nutrition Partner' },
  { image: fitjeevaBanner2, alt: 'FitJeeva Clinical Nutrition' },
  { image: fitjeevaBanner3, alt: 'FitJeeva Online Consultation' },
  { image: fitjeevaBanner4, alt: 'FitJeeva Home Visit Service' },
  { image: fitjeevaBanner5, alt: 'FitJeeva Millet Based Diets' },
];

const HomeHero = () => {
  const { heroBanners } = useMediaData();

  const banners = heroBanners.length > 0
    ? heroBanners.map(img => ({ image: img, alt: 'FitJeeva Hero Banner' }))
    : staticBanners;

  return (
    <section className="w-full relative bg-white">
      <Swiper
        className="hero-swiper w-full"
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="w-full">
              <img
                src={banner.image}
                alt={banner.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                className="w-full h-auto block"
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
