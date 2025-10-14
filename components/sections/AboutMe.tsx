"use client";

import Image from "next/image";
import { AboutMe as AboutMeType } from "@/types/supabase";
import { getImageUrl } from "@/lib/supabase";

interface AboutMeProps {
  data: AboutMeType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const imageUrl = data.image_path
    ? getImageUrl("about", data.image_path)
    : null;

  return (
    <section
      id="sobre-mi"
      style={{
        padding: "var(--sectionPadding) 0",
        backgroundColor: "var(--lightBackgroundColor)"
      }}
    >
      <div
        id="about-container"
        className="container mx-auto px-4"
        style={{ maxWidth: "var(--containerMaxWidth)" }}
      >
        <div id="about-content-wrapper" className="flex flex-col md:flex-row items-center gap-12">
          {/* Imagen */}
          <div id="about-image-container" className="w-full md:w-1/2 mb-8 md:mb-0">
            <div
              id="about-image-wrapper"
              className="relative h-[400px] md:h-[500px] overflow-hidden"
              style={{
                borderRadius: "var(--borderRadius)",
                boxShadow: "var(--boxShadow)"
              }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--lightBackgroundColor)" }}
                >
                  <span
                    style={{ color: "var(--primaryColor)" }}
                    className="text-lg"
                  >
                    Imagen no disponible
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contenido */}
          <div id="about-text-container" className="w-full md:w-1/2">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                color: "var(--textColor)",
                fontFamily: "var(--headingFont)"
              }}
            >
              {data.title}
            </h2>
            <div
              id="about-rich-content"
              className="prose prose-lg max-w-none tiptap-content"
              style={{ color: "var(--textColor)" }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <style jsx global>{`
              .tiptap-content p {
                min-height: 1.2em;
                margin-bottom: 1rem;
              }
              .tiptap-content p:last-child {
                margin-bottom: 0;
              }
              .tiptap-content ul,
              .tiptap-content ol {
                margin-left: 1.5rem;
                margin-bottom: 1rem;
              }
              .tiptap-content ul {
                list-style-type: disc;
              }
              .tiptap-content ol {
                list-style-type: decimal;
              }
              .tiptap-content li {
                margin-bottom: 0.5rem;
              }
              .tiptap-content a {
                color: var(--primaryColor);
                text-decoration: underline;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
