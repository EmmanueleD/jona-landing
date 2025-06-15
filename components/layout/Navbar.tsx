'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  initialNavTransparent?: string;
}

const Navbar = ({ initialNavTransparent = 'true' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Inicializar con el valor proporcionado por props para evitar el flash de estilo
  const [formattedNavTransparent, setFormattedNavTransparent] = useState(initialNavTransparent);
  
  // Use useEffect to read CSS variables after component mount and DOM updates
  // but only if they differ from initialNavTransparent
  useEffect(() => {
    // Function to read nav_transparent value
    const readNavTransparentValue = () => {
      if (typeof window === 'undefined') return;
      
      // Log all CSS variables starting with --nav to debug
      const styles = getComputedStyle(document.documentElement);
      const cssVars: Record<string, string> = {};
      for (let i = 0; i < styles.length; i++) {
        const prop = styles[i];
        if (prop.startsWith('--nav')) {
          cssVars[prop] = styles.getPropertyValue(prop);
        }
      }
      console.log('All nav CSS variables (after mount):', cssVars);
      
      // Get the CSS variable value or default to initialNavTransparent
      // This ensures we keep the initial value if CSS variables aren't loaded yet
      const navTransparent = styles.getPropertyValue('--navTransparent')?.trim() || initialNavTransparent;
      console.log('Nav transparent value (after mount):', navTransparent);
      
      // Only update state if the value is different from what we already have
      if (navTransparent !== formattedNavTransparent) {
        setFormattedNavTransparent(navTransparent);
      }
    };
    
    // Read after a small delay to ensure styles are applied
    const timeoutId = setTimeout(readNavTransparentValue, 50);
    
    return () => clearTimeout(timeoutId);
  }, [initialNavTransparent, formattedNavTransparent]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        backgroundColor: isScrolled 
          ? 'var(--navScrolledBackground, white)' 
          : formattedNavTransparent.toLowerCase() === 'true' 
            ? 'transparent' 
            : 'var(--navBackgroundColor, white)',
        boxShadow: isScrolled ? 'var(--navScrolledShadow, 0 2px 4px rgba(0,0,0,0.1))' : 'none'
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span 
            className="text-xl font-bold" 
            style={{ color: 'var(--navTextColor, #1f2937)' }}
          >
            Kinesiología Jona
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link 
            href="/#sobre-mi" 
            className="transition-colors hover:text-[var(--navHoverColor,#3b82f6)]"
            style={{ color: 'var(--navTextColor, #1f2937)' }}
          >
            Sobre Mí
          </Link>
          <Link 
            href="/#servicios" 
            className="transition-colors hover:text-[var(--navHoverColor,#3b82f6)]"
            style={{ color: 'var(--navTextColor, #1f2937)' }}
          >
            Servicios
          </Link>
          <Link 
            href="/#testimonios" 
            className="transition-colors hover:text-[var(--navHoverColor,#3b82f6)]"
            style={{ color: 'var(--navTextColor, #1f2937)' }}
          >
            Testimonios
          </Link>
          <Link 
            href="/#galeria" 
            className="transition-colors hover:text-[var(--navHoverColor,#3b82f6)]"
            style={{ color: 'var(--navTextColor, #1f2937)' }}
          >
            Galería
          </Link>
          <Link href="/#ubicacion" className="transition-colors hover:text-[var(--navHoverColor,#3b82f6)]" style={{ color: 'var(--navTextColor, #1f2937)' }}>
            Ubicación
          </Link>
          <Link 
            href="/#contacto" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              href="/#sobre-mi" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre Mí
            </Link>
            <Link 
              href="/#servicios" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link 
              href="/#testimonios" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonios
            </Link>
            <Link 
              href="/#galeria" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Galería
            </Link>
            <Link 
              href="/#ubicacion" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ubicación
            </Link>
            <Link 
              href="/#contacto" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
