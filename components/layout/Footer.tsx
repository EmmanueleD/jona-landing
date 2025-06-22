"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTiktok,
  FaYoutube
} from "react-icons/fa";
import { ContactInfo } from "@/types/supabase";

interface FooterProps {
  contactInfo: ContactInfo;
}

const Footer = ({ contactInfo }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const whatsappLink = contactInfo?.whatsapp
    ? `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`
    : "#";

  return (
    <footer
      id="contacto"
      className="text-white pt-12 pb-6"
      style={{ backgroundColor: "var(--darkBackgroundColor)" }}
    >
      <div
        className="container mx-auto px-4"
        style={{ maxWidth: "var(--containerMaxWidth)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--headingFont)" }}
            >
              Quiropraxia
            </h3>
            <p className="mb-4" style={{ color: "var(--lightTextColor)" }}>
              Cuidando de tu salud y bienestar a través de tratamientos
              kinesiológicos personalizados.
            </p>
            <div className="flex space-x-4">
              {contactInfo?.instagram && (
                <a
                  href={`https://instagram.com/${contactInfo.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <FaInstagram size={24} />
                </a>
              )}
              {contactInfo?.facebook && (
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <FaFacebook size={24} />
                </a>
              )}
              {contactInfo?.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {contactInfo?.tiktok && (
                <a
                  href={contactInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <FaTiktok size={24} />
                </a>
              )}
              {contactInfo?.youtube && (
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80"
                  style={{ transition: "all 0.3s ease" }}
                >
                  <FaYoutube size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--headingFont)" }}
            >
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#sobre-mi"
                  className="hover:text-white"
                  style={{ color: "var(--lightTextColor)" }}
                >
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicios"
                  className="hover:text-white"
                  style={{ color: "var(--lightTextColor)" }}
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonios"
                  className="hover:text-white"
                  style={{ color: "var(--lightTextColor)" }}
                >
                  Testimonios
                </Link>
              </li>
              <li>
                <Link
                  href="/#galeria"
                  className="hover:text-white"
                  style={{ color: "var(--lightTextColor)" }}
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/#ubicacion"
                  className="text-gray-300 hover:text-white"
                >
                  Ubicación
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--headingFont)" }}
            >
              Contacto
            </h3>
            <ul className="space-y-3">
              {contactInfo?.phone && (
                <li className="flex items-center">
                  <FaPhone className="mr-2" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-white"
                    style={{ color: "var(--lightTextColor)" }}
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo?.whatsapp && (
                <li className="flex items-center">
                  <FaWhatsapp className="mr-2" />
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                    style={{ color: "var(--lightTextColor)" }}
                  >
                    {contactInfo.whatsapp}
                  </a>
                </li>
              )}
              {contactInfo?.email && (
                <li className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white"
                    style={{ color: "var(--lightTextColor)" }}
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <Link
                  href="/#ubicacion"
                  className="text-gray-300 hover:text-white"
                >
                  Ver ubicación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div
          className="border-t my-8"
          style={{ borderColor: "var(--borderColor)" }}
        ></div>

        {/* Copyright y texto legal */}
        <div className="text-center">
          <p className="text-sm" style={{ color: "var(--lightTextColor)" }}>
            &copy; {currentYear} Kinesiología Jona. Todos los derechos
            reservados.
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "var(--lightTextColor)" }}
          >
            Developed by{" "}
            <a
              href="https://emmanueledurante.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Emmanuele Durante
            </a>{" "}
            © 2025
          </p>
          {contactInfo?.legal_text && (
            <p
              className="text-xs mt-2"
              style={{ color: "var(--lightTextColor)" }}
            >
              {contactInfo.legal_text}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
