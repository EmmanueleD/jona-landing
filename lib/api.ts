/**
 * Kinesiología Jona - API Module
 * 
 * @author Emmanuele Durante <https://emmanueledurante.com>
 * @copyright 2025 Emmanuele Durante
 */

import { supabase } from "./supabase";
import {
  Hero,
  AboutMe,
  Service,
  Testimonial,
  GalleryImage,
  Location,
  ContactInfo,
  Styles
} from "@/types/supabase";

// Función para obtener datos del Hero
export async function getHeroData(): Promise<Hero | null> {
  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }

  // Return the hero data
  return data;
}

// Función para obtener datos de Sobre Mí
export async function getAboutMeData(): Promise<AboutMe | null> {
  const { data, error } = await supabase
    .from("about_me")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching about me data:", error);
    return null;
  }

  return data;
}

// Función para obtener servicios
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data || [];
}

// Función para obtener testimonios
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }

  return data || [];
}

// Función para obtener imágenes de la galería
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }

  return data || [];
}

// Función para obtener datos de ubicación
export async function getLocationData(): Promise<Location | null> {
  const { data, error } = await supabase
    .from("location")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching location data:", error);
    return null;
  }

  return data;
}

// Función para obtener información de contacto
export async function getContactInfo(): Promise<ContactInfo | null> {
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }

  return data;
}

// lib/api.ts
export const getStyles = async (): Promise<Record<string, string>> => {
  // Assicurati che tutte le proprietà necessarie siano presenti
  const defaultStyles = {
    // General styles
    primary_color: '#000000',
    secondary_color: '#000000',
    accent_color: '#000000',
    text_color: '#000000',
    background_color: '#ffffff',
    font_family: "'Roboto', sans-serif",
    heading_font: "'Montserrat', sans-serif",
    border_radius: '0.25rem',
    box_shadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    logo_type: 'text',
    logo_text: 'Quiropraxia',
    logo_image_url: '',
    
    // Hero section styles
    hero_background_color: 'rgba(0, 0, 0, 0.4)', // Overlay color
    hero_text_color: '#ffffff',
    hero_title_size: '3rem',
    hero_subtitle_size: '1.5rem',
    hero_button_color: '#f59e0b',
    hero_button_text_color: '#ffffff',
    hero_height: '100vh',
    
    // Navigation styles
    nav_background_color: '#ffffff',
    nav_text_color: '#1f2937',
    nav_hover_color: '#3b82f6',
    nav_active_color: '#1e40af',
    nav_button_color: '#3b82f6',
    nav_button_text_color: '#ffffff',
    nav_transparent: 'true',
    nav_scrolled_background: '#ffffff',
    nav_scrolled_shadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const { data, error } = await supabase.from("styles").select("*");

  if (error) {
    console.error("Error fetching styles:", error);
    return defaultStyles;
  }

  // Converte l'array di stili in un oggetto key-value
  const stylesObject = data.reduce((acc, style) => {
    acc[style.key] = style.value;
    return acc;
  }, {} as Record<string, string>);
  
  // Unisci i valori predefiniti con quelli recuperati dal database
  return { ...defaultStyles, ...stylesObject };
};

// Función para obtener todos los datos necesarios para la landing page
export async function getAllLandingPageData() {
  const [
    hero,
    aboutMe,
    services,
    testimonials,
    gallery,
    location,
    contactInfo,
    styles
  ] = await Promise.all([
    getHeroData(),
    getAboutMeData(),
    getServices(),
    getTestimonials(),
    getGalleryImages(),
    getLocationData(),
    getContactInfo(),
    getStyles()
  ]);

  // Obtener el número de WhatsApp de la información de contacto
  const whatsappNumber =
    contactInfo?.whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null;

  return {
    hero,
    aboutMe,
    services,
    testimonials,
    gallery,
    location,
    contactInfo,
    whatsappNumber,
    styles
  };
}

// ============================================================================
// FUNCIONES PARA ACTUALIZAR DATOS (ADMIN PANEL)
// ============================================================================

// Hero Section
export async function updateHero(hero: Hero): Promise<Hero | null> {
  // Update hero with the provided data
  const { data, error } = await supabase
    .from("hero")
    .update({
      title: hero.title,
      subtitle: hero.subtitle,
      button_text: hero.button_text,
      image_path: hero.image_path
    })
    .eq("id", hero.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating hero data:", error);
    throw error;
  }

  return data;
}

// About Me Section
export async function updateAboutMe(aboutMe: AboutMe): Promise<AboutMe | null> {
  const { data, error } = await supabase
    .from("about_me")
    .update({
      title: aboutMe.title,
      content: aboutMe.content,
      image_path: aboutMe.image_path
    })
    .eq("id", aboutMe.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating about me data:", error);
    throw error;
  }

  return data;
}

// Services Section
export async function createService(service: Omit<Service, "id">): Promise<Service> {
  const { data, error } = await supabase
    .from("services")
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error("Error creating service:", error);
    throw error;
  }

  return data;
}

export async function updateService(service: Service): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .update({
      title: service.title,
      description: service.description,
      price: service.price,
      image_path: service.image_path
    })
    .eq("id", service.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating service:", error);
    throw error;
  }

  return data;
}

export async function deleteService(id: number): Promise<void> {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

// Testimonials Section
export async function createTestimonial(testimonial: Omit<Testimonial, "id">): Promise<Testimonial> {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }

  return data;
}

export async function updateTestimonial(testimonial: Testimonial): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from("testimonials")
    .update({
      name: testimonial.name,
      quote: testimonial.quote,
      image_path: testimonial.image_path
    })
    .eq("id", testimonial.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }

  return data;
}

export async function deleteTestimonial(id: number): Promise<void> {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}

// Gallery Section
export async function createGalleryImage(image: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const { data, error } = await supabase
    .from("gallery")
    .insert([image])
    .select()
    .single();

  if (error) {
    console.error("Error creating gallery image:", error);
    throw error;
  }

  return data;
}

export async function updateGalleryImage(image: GalleryImage): Promise<GalleryImage | null> {
  const { data, error } = await supabase
    .from("gallery")
    .update({
      title: image.title,
      description: image.description,
      image_path: image.image_path
    })
    .eq("id", image.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating gallery image:", error);
    throw error;
  }

  return data;
}

export async function deleteGalleryImage(id: number): Promise<void> {
  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting gallery image:", error);
    throw error;
  }
}

// Location Section
export async function updateLocation(location: Location): Promise<Location | null> {
  const { data, error } = await supabase
    .from("location")
    .update({
      address: location.address,
      google_maps_url: location.google_maps_url,
      additional_info: location.additional_info
    })
    .eq("id", location.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating location data:", error);
    throw error;
  }

  return data;
}

// Contact Info Section
export async function updateContactInfo(contactInfo: ContactInfo): Promise<ContactInfo | null> {
  const { data, error } = await supabase
    .from("contact_info")
    .update({
      email: contactInfo.email,
      phone: contactInfo.phone,
      whatsapp: contactInfo.whatsapp,
      instagram: contactInfo.instagram,
      facebook: contactInfo.facebook,
      linkedin: contactInfo.linkedin,
      tiktok: contactInfo.tiktok,
      youtube: contactInfo.youtube,
      legal_text: contactInfo.legal_text
    })
    .eq("id", contactInfo.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating contact info:", error);
    throw error;
  }

  return data;
}

// Styles Section
export async function updateStyles(styles: Record<string, string>): Promise<boolean> {
  // Elimina eventuali proprietà id che potrebbero essere state passate
  const { id, ...styleValues } = styles;
  
  // Crea un array di operazioni di upsert per ogni coppia chiave-valore
  const upsertPromises = Object.entries(styleValues).map(async ([key, value]) => {
    const { error } = await supabase
      .from("styles")
      .upsert({
        key,
        value,
        category: getCategoryForKey(key) // Funzione helper per determinare la categoria
      }, {
        onConflict: 'key' // In caso di conflitto sulla chiave, aggiorna il record esistente
      });

    if (error) {
      console.error(`Error updating style ${key}:`, error);
      throw error;
    }
    
    return true;
  });

  try {
    // Esegui tutte le operazioni di upsert
    await Promise.all(upsertPromises);
    return true;
  } catch (error) {
    console.error("Error updating styles:", error);
    throw error;
  }
}

// Helper per determinare la categoria di uno stile in base alla chiave
function getCategoryForKey(key: string): string {
  if (key.includes('color')) return 'colors';
  if (key.includes('font')) return 'typography';
  if (key.includes('radius') || key.includes('shadow')) return 'layout';
  return 'other';
}
