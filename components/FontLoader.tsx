'use client';

import { useEffect } from 'react';

// Map of font family CSS values to Google Fonts API names
const fontNameMapping: Record<string, string> = {
  "'Roboto', sans-serif": 'Roboto:wght@400;500;700',
  "'Open Sans', sans-serif": 'Open+Sans:wght@400;600;700',
  "'Lato', sans-serif": 'Lato:wght@400;700',
  "'Montserrat', sans-serif": 'Montserrat:wght@400;500;700',
  "'Poppins', sans-serif": 'Poppins:wght@400;500;600;700',
  "'Raleway', sans-serif": 'Raleway:wght@400;500;600;700',
  "'Playfair Display', serif": 'Playfair+Display:wght@400;500;600;700',
  "'Merriweather', serif": 'Merriweather:wght@400;700',
};

interface FontLoaderProps {
  fontFamily?: string;
  headingFont?: string;
}

export default function FontLoader({ fontFamily, headingFont }: FontLoaderProps) {
  useEffect(() => {
    // Remove any existing font links to prevent duplicates
    document.querySelectorAll('link[data-font-loader="true"]').forEach(el => el.remove());
    
    const fontsToLoad = new Set<string>();
    
    // Add main font if specified and valid
    if (fontFamily && fontNameMapping[fontFamily]) {
      fontsToLoad.add(fontNameMapping[fontFamily]);
    }
    
    // Add heading font if specified, different from main font, and valid
    if (headingFont && headingFont !== fontFamily && fontNameMapping[headingFont]) {
      fontsToLoad.add(fontNameMapping[headingFont]);
    }
    
    // If we have fonts to load, create a link element
    if (fontsToLoad.size > 0) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?${Array.from(fontsToLoad).map(font => `family=${font}`).join('&')}&display=swap`;
      link.setAttribute('data-font-loader', 'true');
      document.head.appendChild(link);
      
      // Fonts loaded successfully
    }
    
    return () => {
      // Clean up on unmount
      document.querySelectorAll('link[data-font-loader="true"]').forEach(el => el.remove());
    };
  }, [fontFamily, headingFont]);
  
  // This component doesn't render anything visible
  return null;
}
