import { useState, useEffect } from 'react';
import './Banner.css';

const bannerData = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    cta: 'Shop Now',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Check out our latest collection',
    cta: 'Explore',
    bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: 'Free Shipping',
    subtitle: 'On orders above ₹999',
    cta: 'Learn More',
    bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

const Banner = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="banner">
      <div className="banner-slider">
        {bannerData.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: slide.bgColor }}
          >
            <div className="banner-content">
              <h1 className="banner-title">{slide.title}</h1>
              <p className="banner-subtitle">{slide.subtitle}</p>
              <button className="banner-cta btn btn-lg" onClick={onShopNow}>
                {slide.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="banner-dots">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="banner-arrow prev"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="banner-arrow next"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerData.length)}
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
};

export default Banner;