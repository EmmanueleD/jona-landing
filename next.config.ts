import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'supabase.co', 'supabase.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configuración para optimizar el rendimiento
  reactStrictMode: true,
  // Configuración para permitir importaciones absolutas
  webpack(config) {
    return config;
  },
}

export default nextConfig;
