import type { ReactNode } from "react";

// Section components (data-coupled)
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";

// Layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Client wrappers for stateful / sandboxed components
import DialogWrapper from "@/lib/showcase/wrappers/DialogWrapper";
import RichTextEditorWrapper from "@/lib/showcase/wrappers/RichTextEditorWrapper";
import ImageUploaderWrapper from "@/lib/showcase/wrappers/ImageUploaderWrapper";

// Mock data
import {
  MOCK_HERO,
  MOCK_ABOUT_ME,
  MOCK_SERVICES,
  MOCK_TESTIMONIALS,
  MOCK_GALLERY,
  MOCK_LOCATION,
  MOCK_CONTACT_INFO,
} from "@/lib/showcase/mocks";

export type ShowcaseCategory = "sections" | "layout" | "ui" | "admin";

export type ShowcaseEntry = {
  /** Stable identifier — used as React key */
  id: string;
  /** Display name shown in the catalog card header */
  name: string;
  /** Short description of the component's role */
  description: string;
  category: ShowcaseCategory;
  /** The rendered component instance with mock props */
  element: ReactNode;
  /**
   * Optional note surfaced as a warning badge in the catalog.
   * Use for: "sandboxed", "fixed-position — bounded container", etc.
   */
  note?: string;
};

/**
 * Hand-maintained showcase registry.
 *
 * Single source of truth for the design-system catalog.
 * When a new component is added to the project, add an entry here.
 *
 * PR checklist: "Did you add a registry entry in lib/showcase/registry.tsx?"
 */
export const registry: ShowcaseEntry[] = [
  // ── Sections ──────────────────────────────────────────────────────────────
  {
    id: "hero",
    name: "Hero",
    description: "Full-height hero section with background image, title, subtitle, and WhatsApp CTA.",
    category: "sections",
    element: <Hero data={MOCK_HERO} whatsappNumber="+34600000000" />,
  },
  {
    id: "about-me",
    name: "AboutMe",
    description: "Profile image + rich-text content block. Uses dangerouslySetInnerHTML.",
    category: "sections",
    element: <AboutMe data={MOCK_ABOUT_ME} />,
  },
  {
    id: "services",
    name: "Services",
    description: "Grid of service cards with title, description (HTML), price, and WhatsApp CTA.",
    category: "sections",
    element: <Services services={MOCK_SERVICES} whatsappNumber="+34600000000" />,
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "react-slick carousel. Requires 2+ items to activate autoplay/infinite mode.",
    category: "sections",
    element: <Testimonials testimonials={MOCK_TESTIMONIALS} />,
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Image grid with built-in lightbox modal. Images are placeholders (empty image_path).",
    category: "sections",
    element: <Gallery images={MOCK_GALLERY} />,
  },
  {
    id: "location",
    name: "Location",
    description: "Address card + Google Maps iframe. Empty google_maps_url triggers the Valencia fallback.",
    category: "sections",
    element: <Location data={MOCK_LOCATION} />,
  },

  // ── Layout ────────────────────────────────────────────────────────────────
  {
    id: "navbar",
    name: "Navbar",
    description: "Fixed navigation bar with scroll-aware background and mobile menu.",
    category: "layout",
    note: "fixed-position — rendered inside a bounded container",
    element: (
      <div
        className="relative overflow-hidden"
        style={{ height: "80px" }}
      >
        <Navbar
          initialNavTransparent="false"
          logoType="text"
          logoText="Quiropraxia"
        />
      </div>
    ),
  },
  {
    id: "footer",
    name: "Footer",
    description: "Site footer with social icons, quick links, contact details, and legal dialog.",
    category: "layout",
    element: <Footer contactInfo={MOCK_CONTACT_INFO} />,
  },

  // ── UI ────────────────────────────────────────────────────────────────────
  {
    id: "dialog",
    name: "Dialog",
    description: "Modal dialog with click-outside and Escape key dismiss. Uses local isOpen state.",
    category: "ui",
    element: <DialogWrapper />,
  },
  {
    id: "whatsapp-button",
    name: "WhatsAppButton",
    description: "Floating WhatsApp button. position:fixed + gated behind scrollY > 300.",
    category: "ui",
    note: "live component — floats bottom-right, scroll down to reveal it",
    element: (
      <p className="text-sm text-gray-500">
        The real <code className="text-gray-700">WhatsAppButton</code> is mounted
        on this page (bottom-right corner). Because it is{" "}
        <code className="text-gray-700">position: fixed</code> and only appears
        after scrolling past 300px, scroll down anywhere on this page to see the
        actual component animate in — no replica is used.
      </p>
    ),
  },

  // ── Admin ─────────────────────────────────────────────────────────────────
  {
    id: "rich-text-editor",
    name: "RichTextEditor",
    description: "Tiptap-based WYSIWYG editor (bold, italic, underline, lists, links).",
    category: "admin",
    element: <RichTextEditorWrapper />,
  },
  {
    id: "image-uploader",
    name: "ImageUploader",
    description: "File input that uploads to Supabase Storage.",
    category: "admin",
    note: "sandboxed — no uploads are performed",
    element: <ImageUploaderWrapper />,
  },
];

/** Entries grouped by category for the catalog page layout */
export const registryByCategory: Record<ShowcaseCategory, ShowcaseEntry[]> = {
  sections: registry.filter((e) => e.category === "sections"),
  layout: registry.filter((e) => e.category === "layout"),
  ui: registry.filter((e) => e.category === "ui"),
  admin: registry.filter((e) => e.category === "admin"),
};
