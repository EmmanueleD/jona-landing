/**
 * Mock data for the design-system showcase route.
 *
 * IMPORTANT: dangerouslySetInnerHTML fields (content, description) use ONLY
 * plain sanitized structural HTML — <p>, <strong>, <ul>, <li> tags only.
 * No <script>, <iframe>, or event handler attributes are permitted here.
 * This is a dev-only file; production guard is enforced in app/design-system/page.tsx.
 */

import type {
  Hero,
  AboutMe,
  Service,
  Testimonial,
  GalleryImage,
  Location,
  ContactInfo,
} from "@/types/supabase";

// image_path is intentionally empty — getImageUrl() returns null and components
// render their built-in placeholders without any Supabase read.

export const MOCK_HERO: Hero = {
  id: 1,
  title: "Quiropraxia para tu bienestar",
  subtitle: "Tratamientos personalizados para aliviar el dolor y mejorar tu calidad de vida",
  button_text: "Contactar por WhatsApp",
  image_path: "",
};

export const MOCK_ABOUT_ME: AboutMe = {
  id: 1,
  title: "Sobre Mí",
  // Sanitized structural HTML — no scripts, no iframes, no event handlers
  content:
    "<p>Soy <strong>Jonatan</strong>, quiropráctico certificado con más de 10 años de experiencia.</p>" +
    "<p>Me especializo en el tratamiento del dolor de espalda, cervical y lumbar, " +
    "ayudando a mis pacientes a recuperar su movilidad y bienestar.</p>" +
    "<ul><li>Técnicas de ajuste vertebral</li><li>Terapia manual</li><li>Rehabilitación postural</li></ul>",
  image_path: "",
};

export const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    title: "Ajuste Vertebral",
    // Sanitized structural HTML
    description:
      "<p>Técnica de <strong>ajuste preciso</strong> para alinear la columna vertebral y aliviar la presión sobre los nervios.</p>" +
      "<ul><li>Mejora la movilidad</li><li>Reduce el dolor</li></ul>",
    price: 60,
    image_path: "",
    icon_path: "",
  },
  {
    id: 2,
    title: "Terapia Manual",
    description:
      "<p>Tratamiento mediante <strong>manipulación de tejidos blandos</strong> para reducir tensión muscular y mejorar la circulación.</p>",
    price: 50,
    image_path: "",
    icon_path: "",
  },
  {
    id: 3,
    title: "Rehabilitación Postural",
    description:
      "<p>Programa personalizado de <strong>ejercicios posturales</strong> para corregir desequilibrios y prevenir lesiones.</p>",
    price: 45,
    image_path: "",
    icon_path: "",
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    quote:
      "Después de años con dolor de espalda, finalmente encontré alivio gracias a los tratamientos de Jonatan. ¡Totalmente recomendado!",
    image_path: "",
  },
  {
    id: 2,
    name: "Carlos López",
    quote:
      "Profesional, amable y muy efectivo. Mi cervical mejoró notablemente después de tan solo tres sesiones.",
    image_path: "",
  },
  {
    id: 3,
    name: "Ana Martínez",
    quote:
      "El mejor quiropráctico que he visitado. Explica todo con claridad y los resultados hablan por sí solos.",
    image_path: "",
  },
];

export const MOCK_GALLERY: GalleryImage[] = [
  { id: 1, title: "Consulta", description: "Sala de tratamiento principal", image_path: "" },
  { id: 2, title: "Equipamiento", description: "Equipo de última tecnología", image_path: "" },
  { id: 3, title: "Camilla", description: "Camilla de ajuste vertebral", image_path: "" },
  { id: 4, title: "Recepción", description: "Área de recepción", image_path: "" },
];

export const MOCK_LOCATION: Location = {
  id: 1,
  address: "Calle Mayor 42, 46001 Valencia, España",
  // Empty URL triggers the existing Valencia fallback in Location component — safe
  google_maps_url: "",
  additional_info: "Lunes a Viernes 9:00–20:00 · Sábados 9:00–14:00",
};

export const MOCK_CONTACT_INFO: ContactInfo = {
  id: 1,
  email: "hola@quiropraxiajona.es",
  phone: "+34 600 000 000",
  whatsapp: "+34600000000",
  instagram: "@quiropraxiajona",
  facebook: "",
  linkedin: "",
  tiktok: "",
  youtube: "",
  legal_text: "Aviso legal de ejemplo para la visualización del diálogo en el showcase.",
};
