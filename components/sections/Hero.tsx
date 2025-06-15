'use client';

import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { Hero as HeroType } from '@/types/supabase';
import { getImageUrl } from '@/lib/supabase';

interface HeroProps {
  data: HeroType;
  whatsappNumber?: string;
}

const Hero = ({ data, whatsappNumber }: HeroProps) => {
  const imageUrl = getImageUrl('hero', data.image_path);
  
  const handleWhatsAppClick = () => {
    if (!whatsappNumber) return;
    
    const message = encodeURIComponent('Hola, me gustaría consultar sobre tus servicios de kinesiología.');
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section 
      className="relative flex items-center" 
      style={{ height: 'var(--heroHeight, 100vh)' }}
    >
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt="Kinesiología Jona" 
            fill 
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--lightBackgroundColor)' }}></div>
        )}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'var(--heroBackgroundColor, rgba(0, 0, 0, 0.4))' }}
        ></div>
      </div>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-10" style={{ maxWidth: 'var(--containerMaxWidth)' }}>
        <div className="max-w-2xl" style={{ color: 'var(--heroTextColor, white)' }}>
          <h1 
            className="font-bold mb-4"
            style={{ 
              fontFamily: 'var(--headingFont)', 
              fontSize: 'var(--heroTitleSize, 3rem)'
            }}
          >
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="mb-8" style={{ fontSize: 'var(--heroSubtitleSize, 1.5rem)' }}>
              {data.subtitle}
            </p>
          )}
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center font-bold py-3 px-6 transition-colors duration-300"
            style={{ 
              backgroundColor: 'var(--heroButtonColor, var(--accentColor))', 
              color: 'var(--heroButtonTextColor, white)',
              borderRadius: 'var(--borderRadius)',
              boxShadow: 'var(--boxShadow)'
            }}
          >
            <FaWhatsapp className="mr-2 text-xl" />
            {data.button_text || "Contactar por WhatsApp"}
          </button>
        </div>
      </div>
      
      {/* Flecha de scroll down */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#sobre-mi" className="text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
