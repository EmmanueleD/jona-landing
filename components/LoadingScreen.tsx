"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if fonts are loaded
    const checkFontsLoaded = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Wait a bit for images to start loading
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Match the fade-out duration
      }, 100);
    };

    checkFontsLoaded();
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--backgroundColor, white)"
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Single logo with bounce animation */}
        <div className="relative w-12 h-12 animate-bounce">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
