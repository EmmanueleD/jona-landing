'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { Testimonial } from '@/types/supabase';
import { getImageUrl } from '@/lib/supabase';

// Importar los estilos de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: testimonials.length > 1, // Solo activar infinite si hay más de un testimonio
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: testimonials.length > 1, // Solo activar autoplay si hay más de un testimonio
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <section 
      id="testimonios" 
      style={{ 
        padding: 'var(--sectionPadding) 0',
        backgroundColor: 'var(--lightBackgroundColor)'
      }}
    >
      <div 
        className="container mx-auto px-4"
        style={{ maxWidth: 'var(--containerMaxWidth)' }}
      >
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              color: 'var(--textColor)',
              fontFamily: 'var(--headingFont)'
            }}
          >
            Lo que dicen nuestros pacientes
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--textColor)' }}
          >
            Testimonios de personas que han mejorado su calidad de vida
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial) => {
                const imageUrl = testimonial.image_path 
                  ? getImageUrl('testimonials', testimonial.image_path)
                  : null;
                  
                return (
                  <div key={testimonial.id} className="px-4">
                    <div 
                      style={{ 
                        backgroundColor: 'var(--backgroundColor)',
                        borderRadius: 'var(--borderRadius)',
                        boxShadow: 'var(--boxShadow)',
                        padding: '2rem'
                      }}
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
                          {imageUrl ? (
                            <Image 
                              src={imageUrl} 
                              alt={testimonial.name} 
                              fill
                              className="object-cover rounded-full"
                            />
                          ) : (
                            <div 
                              className="w-full h-full rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'var(--lightBackgroundColor)' }}
                            >
                              <span 
                                className="text-xl font-bold"
                                style={{ color: 'var(--primaryColor)' }}
                              >
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <FaQuoteLeft 
                            className="text-3xl mb-4 mx-auto md:mx-0" 
                            style={{ color: 'var(--primaryColor)' }}
                          />
                          <p 
                            className="text-lg mb-6 italic"
                            style={{ color: 'var(--textColor)' }}
                          >
                            "{testimonial.quote}"
                          </p>
                          <div>
                            <h4 
                              className="text-xl font-bold"
                              style={{ 
                                color: 'var(--textColor)',
                                fontFamily: 'var(--headingFont)'
                              }}
                            >
                              {testimonial.name}
                            </h4>
                          </div>  
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
            
            {/* Controles personalizados */}
            <div className="hidden md:block">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-md hover:bg-blue-50 transition-colors"
                aria-label="Anterior testimonio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => sliderRef.current?.slickNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-md hover:bg-blue-50 transition-colors"
                aria-label="Siguiente testimonio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
