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
import LoadingScreen from "@/components/LoadingScreen";

// Ya no necesitamos la instancia de Inter

export const metadata: Metadata = {
  title: "Dr Jona Cracks",
  description:
    "Servicios de quiropraxia profesional para mejorar tu calidad de vida. Tratamientos personalizados y atención de calidad.",
  keywords:
    "quiropraxia, fisioterapia, rehabilitación, tratamiento, salud, bienestar"
};

// Helper function to get Google Fonts URL
function getFontsUrl(fontFamily?: string, headingFont?: string): string | null {
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

  const fontsToLoad = new Set<string>();
  
  if (fontFamily && fontNameMapping[fontFamily]) {
    fontsToLoad.add(fontNameMapping[fontFamily]);
  }
  
  if (headingFont && headingFont !== fontFamily && fontNameMapping[headingFont]) {
    fontsToLoad.add(fontNameMapping[headingFont]);
  }
  
  if (fontsToLoad.size > 0) {
    return `https://fonts.googleapis.com/css2?${Array.from(fontsToLoad).map(font => `family=${font}`).join('&')}&display=swap`;
  }
  
  return null;
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const styles = await getStyles();
  const fontsUrl = getFontsUrl(styles?.font_family, styles?.heading_font);
  
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload fonts to prevent FOUT */}
        {fontsUrl && (
          <link rel="stylesheet" href={fontsUrl} />
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
          <LoadingScreen />
          {children}
        </StyleProvider>
      </body>
    </html>
  );
}
