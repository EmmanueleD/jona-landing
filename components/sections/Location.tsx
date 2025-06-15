"use client";

import { Location as LocationType } from "@/types/supabase";
import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";

// Funzione per gestire l'URL della mappa
const getEmbedUrl = (url: string): string => {
  // Se l'URL è vuoto o non definito, restituisci un URL di incorporamento generico per Valencia
  if (!url) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49432.07586693724!2d-0.4015233!3d39.4699075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cf0efb06f%3A0xb4a351011f7f1d39!2sValencia%2C%20Spagna!5e0!3m2!1sit!2sit!4v1718370264806!5m2!1sit!2sit";
  }

  // Se è già un URL di incorporamento, restituiscilo così com'è
  if (url.includes("google.com/maps/embed")) {
    return url;
  }

  // NOTA: Per utilizzare correttamente Google Maps in produzione, è necessario:
  // 1. Ottenere un URL di incorporamento direttamente da Google Maps
  // 2. Salvarlo nel database Supabase nella tabella location
  // 3. L'URL di incorporamento si ottiene da Google Maps cliccando su "Condividi" e poi "Incorpora una mappa"

  // Messaggio per l'amministratore da mostrare nella console
  console.log(
    "NOTA PER ADMIN: Per visualizzare correttamente la mappa, inserire un URL di incorporamento di Google Maps nel database Supabase."
  );
  console.log(
    'Ottieni l\'URL di incorporamento da Google Maps cliccando su "Condividi" e poi "Incorpora una mappa"'
  );

  // Restituisci un URL di incorporamento generico per Valencia
  return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49432.07586693724!2d-0.4015233!3d39.4699075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f4cf0efb06f%3A0xb4a351011f7f1d39!2sValencia%2C%20Spagna!5e0!3m2!1sit!2sit!4v1718370264806!5m2!1sit!2sit";
};

interface LocationProps {
  data: LocationType;
}

const Location = ({ data }: LocationProps) => {
  return (
    <section
      id="ubicacion"
      style={{
        padding: "var(--sectionPadding) 0",
        backgroundColor: "var(--lightBackgroundColor)"
      }}
    >
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
            Ubicación
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--textColor)" }}
          >
            Visítanos en nuestro consultorio
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Información de ubicación */}
          <div className="w-full lg:w-1/3">
            <div
              className="p-8 h-full"
              style={{
                backgroundColor: "var(--backgroundColor)",
                borderRadius: "var(--borderRadius)",
                boxShadow: "var(--boxShadow)"
              }}
            >
              <div className="flex items-start mb-6">
                <FaMapMarkerAlt
                  className="text-2xl mr-4 mt-1"
                  style={{ color: "var(--primaryColor)" }}
                />
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: "var(--textColor)",
                      fontFamily: "var(--headingFont)"
                    }}
                  >
                    Dirección
                  </h3>
                  <strong style={{ color: "var(--textColor)" }}>
                    {data.address}
                  </strong>

                  {data.additional_info && (
                    <p className="mt-2" style={{ color: "var(--textColor)" }}>
                      {data.additional_info}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mapa de Google */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-auto">
            <div
              className="h-full overflow-hidden"
              style={{
                borderRadius: "var(--borderRadius)",
                boxShadow: "var(--boxShadow)"
              }}
            >
              <iframe
                src={getEmbedUrl(data.google_maps_url)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Kinesiología Jona"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
