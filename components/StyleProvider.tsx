// components/StyleProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";

// Helper function to convert snake_case to camelCase
function snakeToCamel(str: string): string {
  return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

interface StyleContextType {
  styles: Record<string, string>;
}

const StyleContext = createContext<StyleContextType>({ styles: {} });

export const useStyles = () => useContext(StyleContext);

export default function StyleProvider({
  children,
  styles
}: {
  children: ReactNode;
  styles: Record<string, string>;
}) {
  // Initialize styles
  
  // Generate CSS variables
  const cssVariables = Object.entries(styles)
    .map(([key, value]) => {
      const camelKey = snakeToCamel(key);
      // Process nav-related variables
      if (key.startsWith('nav_')) {
        // Convert nav variables to CSS custom properties
      }
      return `--${camelKey}: ${value};`
    })
    .join("\n");
  
  // Apply the generated CSS variables
  
  return (
    <>
      <style jsx global>{`
        :root {
          ${cssVariables}
        }
      `}</style>
      <StyleContext.Provider value={{ styles }}>
        {children}
      </StyleContext.Provider>
    </>
  );
}
