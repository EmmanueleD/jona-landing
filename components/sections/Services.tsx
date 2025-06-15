"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { Service } from "@/types/supabase";
import { getImageUrl } from "@/lib/supabase";

interface ServicesProps {
  services: Service[];
  whatsappNumber?: string;
}

const Services = ({ services, whatsappNumber }: ServicesProps) => {
  const handleContactClick = (serviceTitle: string) => {
    if (!whatsappNumber) return;

    const message = encodeURIComponent(
      `Hola, me gustaría consultar sobre el servicio de ${serviceTitle}.`
    );
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <section id="servicios" style={{ padding: "var(--sectionPadding) 0" }}>
      <div
        className="container mx-auto px-4"
        style={{ maxWidth: "var(--containerMaxWidth)" }}
      >
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              color: "var(--textColor)",
              fontFamily: "var(--headingFont)"
            }}
          >
            Nuestros Servicios
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--textColor)" }}
          >
            Ofrecemos tratamientos personalizados para mejorar tu calidad de
            vida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const imageUrl = service.image_path
              ? getImageUrl("services", service.image_path)
              : service.icon_path
              ? getImageUrl("icons", service.icon_path)
              : null;

            return (
              <div
                key={service.id}
                className="overflow-hidden transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--backgroundColor)",
                  borderRadius: "var(--borderRadius)",
                  boxShadow: "var(--boxShadow)"
                }}
              >
                <div className="h-64 relative">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--lightBackgroundColor)" }}
                    >
                      <span style={{ color: "var(--primaryColor)" }}>
                        Imagen no disponible
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: "var(--textColor)",
                      fontFamily: "var(--headingFont)"
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="mb-4" style={{ color: "var(--textColor)" }}>
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--primaryColor)" }}
                    >
                      ${service.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleContactClick(service.title)}
                      className="text-white px-4 py-2 flex items-center text-sm transition-colors"
                      style={{
                        backgroundColor: "var(--accentColor)",
                        borderRadius: "var(--borderRadius)"
                      }}
                    >
                      <FaWhatsapp className="mr-2" />
                      Consultar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
