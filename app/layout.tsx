/**
 * Kinesiología Jona - Root Layout Component
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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const styles = await getStyles();
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
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
