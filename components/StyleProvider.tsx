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
  // Debug logs for styles
  console.log('StyleProvider received styles:', styles);
  
  // Debug specific nav_transparent value
  console.log('nav_transparent value:', styles.nav_transparent);
  
  // Generate CSS variables
  const cssVariables = Object.entries(styles)
    .map(([key, value]) => {
      const camelKey = snakeToCamel(key);
      // Log nav-related variables
      if (key.startsWith('nav_')) {
        console.log(`Converting ${key} -> --${camelKey}: ${value}`);
      }
      return `--${camelKey}: ${value};`
    })
    .join("\n");
  
  // Log the generated CSS
  console.log('Generated CSS variables for :root:', cssVariables);
  
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
