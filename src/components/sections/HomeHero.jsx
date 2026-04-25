import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

/**
 * Exact replica of the Dietitian Shreya Home Hero slider.
 * Uses Swiper to cycle through the image banners.
 */

const banners = [
  {
    desktop: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-1-scaled.webp',
    mobile: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-1MV-scaled.webp',
    alt: 'Dietitian Shreya banner 1',
  },
  {
    desktop: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-2-scaled.webp',
    mobile: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-2MV-scaled.webp',
    alt: 'Dietitian Shreya banner 2',
  },
  {
    desktop: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-3-scaled.webp',
    mobile: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-3MV-scaled.webp',
    alt: 'Dietitian Shreya banner 3',
  },
  {
    desktop: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-4-scaled.webp',
    mobile: 'https://dietitianshreya.com/wp-content/uploads/2026/02/Dietitian-shreya-banner-4MV-scaled.webp',
    alt: 'Dietitian Shreya banner 4',
  },
];

const HomeHero = () => {
  return (
    <section className="w-full relative mt-[80px] md:mt-[96px] z-0">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <picture className="w-full block">
              {/* Show mobile image on small screens */}
              <source media="(max-width: 767px)" srcSet={banner.mobile} />
              {/* Default to desktop image */}
              <img
                src={banner.desktop}
                alt={banner.alt}
                className="w-full h-auto object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.2);
          padding: 30px 20px;
          border-radius: 4px;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px !important;
          font-weight: bold;
        }
        @media (max-width: 767px) {
          .swiper-button-next,
          .swiper-button-prev {
            padding: 20px 15px;
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
