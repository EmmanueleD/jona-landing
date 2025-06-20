/**
 * Kinesiología Jona - Home Page
 * 
 * @author Emmanuele Durante <https://emmanueledurante.com>
 * @copyright 2025 Emmanuele Durante
 */

import Image from "next/image";
import { getAllLandingPageData } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/sections/Location';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const revalidate = 3600; // Revalidar cada hora

export default async function Home() {
  // Obtener todos los datos necesarios para la landing page
  const {
    hero,
    aboutMe,
    services,
    testimonials,
    gallery,
    location,
    contactInfo,
    styles
  } = await getAllLandingPageData();

  // Número de WhatsApp para los botones de contacto
  const whatsappNumber = contactInfo?.whatsapp || '';

  return (
    <>
      <Navbar initialNavTransparent={styles?.nav_transparent || 'true'} />
      <main>
        {hero && <Hero data={hero} whatsappNumber={whatsappNumber} />}
        {aboutMe && <AboutMe data={aboutMe} />}
        {services && services.length > 0 && <Services services={services} whatsappNumber={whatsappNumber} />}
        {testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        {gallery && gallery.length > 0 && <Gallery images={gallery} />}
        {location && <Location data={location} />}
      </main>
      {contactInfo && <Footer contactInfo={contactInfo} />}
      {whatsappNumber && <WhatsAppButton phoneNumber={whatsappNumber} />}
    </>
  );
}
