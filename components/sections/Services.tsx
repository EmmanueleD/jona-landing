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
        id="services-container"
        className="container mx-auto px-4"
        style={{ maxWidth: "var(--containerMaxWidth)" }}
      >
        <div id="services-header" className="text-center mb-12">
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

        <div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const imageUrl = service.image_path
              ? getImageUrl("services", service.image_path)
              : service.icon_path
              ? getImageUrl("icons", service.icon_path)
              : null;

            return (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 h-full flex flex-col"
                style={{
                  borderRadius: "var(--borderRadius)",
                  boxShadow: "var(--boxShadow)"
                }}
              >
                <div
                  className="h-64 md:h-96 relative"
                  style={imageUrl ? undefined : { display: "none" }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div
                  id={`service-content-${service.id}`}
                  className="p-6 flex-1 flex flex-col"
                >
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: "var(--textColor)",
                      fontFamily: "var(--headingFont)"
                    }}
                  >
                    {service.title}
                  </h3>
                  <div
                    id={`service-description-${service.id}`}
                    className="mb-4 prose prose-sm max-w-none tiptap-content"
                    style={{ color: "var(--textColor)" }}
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <style jsx global>{`
                    .tiptap-content p {
                      margin-bottom: 0.75rem;
                    }
                    .tiptap-content p:last-child {
                      margin-bottom: 0;
                    }
                    .tiptap-content ul,
                    .tiptap-content ol {
                      margin-left: 1.25rem;
                      margin-bottom: 0.75rem;
                    }
                    .tiptap-content ul {
                      list-style-type: disc;
                    }
                    .tiptap-content ol {
                      list-style-type: decimal;
                    }
                    .tiptap-content li {
                      margin-bottom: 0.25rem;
                    }
                    .tiptap-content a {
                      color: var(--primaryColor);
                      text-decoration: underline;
                    }
                  `}</style>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--primaryColor)" }}
                    >
                      {service.price ? `$${service.price.toFixed(2)}` : ""}
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
