/**
 * Quiropraxia Jona - Root Layout Component
 *
 * @author Emmanuele Durante <https://emmanueledurante.com>
 * @copyright 2025 Emmanuele Durante
 */

import type { Metadata } from "next";
// Eliminamos la importación de Inter ya que usamos fuentes dinámicas
import "./globals.css";
import StyleProvider from "@/components/StyleProvider";
import { getStyles } from "@/lib/api";
import FontLoader from "@/components/FontLoader";

// Ya no necesitamos la instancia de Inter

export const metadata: Metadata = {
  title: "Dr Jona Cracks",
  description:
    "Servicios de quiropraxia profesional para mejorar tu calidad de vida. Tratamientos personalizados y atención de calidad.",
  keywords:
    "quiropraxia, fisioterapia, rehabilitación, tratamiento, salud, bienestar"
};

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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const styles = await getStyles();
  
  // Prepare fonts to preload
  const fontsToLoad = new Set<string>();
  if (styles?.font_family && fontNameMapping[styles.font_family]) {
    fontsToLoad.add(fontNameMapping[styles.font_family]);
  }
  if (styles?.heading_font && styles.heading_font !== styles.font_family && fontNameMapping[styles.heading_font]) {
    fontsToLoad.add(fontNameMapping[styles.heading_font]);
  }
  
  const fontUrl = fontsToLoad.size > 0 
    ? `https://fonts.googleapis.com/css2?${Array.from(fontsToLoad).map(font => `family=${font}`).join('&')}&display=swap`
    : null;
  
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload fonts to prevent FOUT */}
        {fontUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={fontUrl} />
          </>
        )}
        
        {/* Agregar estilos para react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <StyleProvider styles={styles}>
          <FontLoader
            fontFamily={styles?.font_family}
            headingFont={styles?.heading_font}
          />
          {children}
        </StyleProvider>
      </body>
    </html>
  );
}
