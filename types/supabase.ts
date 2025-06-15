export type Hero = {
  id: number;
  title: string;
  subtitle?: string;
  button_text: string;
  image_path: string; // Usato anche come background_image
  background_image?: string; // Alias per image_path per compatibilità
  created_at?: string;
  updated_at?: string;
};

export type AboutMe = {
  id: number;
  title: string;
  content: string;
  image_path?: string;
  profile_image?: string; // Alias per image_path per compatibilità
  created_at?: string;
  updated_at?: string;
};

export type Service = {
  id: number;
  title: string;
  description: string;
  icon_path?: string;
  image_path?: string;
  price: number;
  created_at?: string;
  updated_at?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  quote: string;
  image_path?: string;
  created_at?: string;
  updated_at?: string;
};

export type GalleryImage = {
  id: number;
  title?: string;
  description?: string;
  image_path: string;
  created_at?: string;
  updated_at?: string;
};

export type Location = {
  id: number;
  address: string;
  google_maps_url: string;
  additional_info?: string;
  created_at?: string;
  updated_at?: string;
};

export type ContactInfo = {
  id: number;
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  legal_text?: string;
  created_at?: string;
  updated_at?: string;
};

// Tipo que agrupa todos los datos de la landing page
export interface LandingPageData {
  hero: Hero | null;
  aboutMe: AboutMe | null;
  services: Service[];
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  location: Location | null;
  contactInfo: ContactInfo | null;
  whatsappNumber: string | null;
}

// types/supabase.ts
export interface Style {
  id: string;
  key: string;
  value: string;
  description?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

// Tipo per la tabella styles (per la gestione degli stili globali)
export interface Styles {
  id: number;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_color: string;
  background_color: string;
  font_family: string;
  heading_font: string;
  border_radius: string;
  box_shadow: string;
  created_at?: string;
  updated_at?: string;
}
