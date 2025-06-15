'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types/supabase';
import { getImageUrl } from '@/lib/supabase';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section 
      id="galeria" 
      style={{ padding: 'var(--sectionPadding) 0' }}
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
            Galería
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--textColor)' }}
          >
            Conoce nuestro consultorio y equipamiento
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => {
            const imageUrl = image.image_path 
              ? getImageUrl('gallery', image.image_path)
              : null;
              
            if (!imageUrl) return null;
            
            return (
              <div 
                key={image.id}
                className="aspect-square relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
                style={{ borderRadius: 'var(--borderRadius)' }}
                onClick={() => setSelectedImage(image)}
              >
                <Image 
                  src={imageUrl} 
                  alt={image.title || 'Imagen de galería'} 
                  fill
                  className="object-cover"
                />
                {image.title && (
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-end"
                       style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                  >
                    <div className="p-4" style={{ color: 'white' }}>
                      <h3 
                        className="font-bold"
                        style={{ fontFamily: 'var(--headingFont)' }}
                      >
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-sm">{image.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Modal para ver imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute -top-12 right-0 p-2"
              style={{ color: 'white' }}
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative w-full" style={{ height: '70vh' }}>
              <Image 
                src={getImageUrl('gallery', selectedImage.image_path) || ''} 
                alt={selectedImage.title || 'Imagen ampliada'} 
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
                className="object-contain"
              />
            </div>
            
            {(selectedImage.title || selectedImage.description) && (
              <div 
                className="p-4 mt-2"
                style={{ backgroundColor: 'var(--backgroundColor)' }}
              >
                {selectedImage.title && (
                  <h3 
                    className="font-bold text-lg"
                    style={{ 
                      color: 'var(--textColor)',
                      fontFamily: 'var(--headingFont)'
                    }}
                  >
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p style={{ color: 'var(--textColor)' }}>
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
