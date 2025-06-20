# Kinesiología Jona

![Kinesiología Jona Logo](public/logo.png)

## Project Information

Professional website for "Kinesiología Jona", a kinesiology service offering personalized treatments to improve patients' health and well-being.

### Main Features

- Modern and responsive design
- Customizable sections (Hero, About Me, Services, Testimonials, Gallery)
- Social media integration
- Admin panel for content management
- SEO optimization
- WhatsApp integration for direct contact

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Hosting**: Vercel

## Author

**Emmanuele Durante**
- Website: [emmanueledurante.com](https://emmanueledurante.com)
- Copyright: © 2025 Emmanuele Durante

## Getting Started

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/app                  # Next.js pages structure
  /admin              # Admin panel
  /api                # API routes
/components           # Reusable React components
  /layout             # Layout components (Navbar, Footer)
  /sections           # Main landing page sections
  /ui                 # Generic UI components
/lib                  # Utility functions and API client
/public               # Static files
/types                # TypeScript definitions
```

## Deployment

This project is configured to be easily deployed on [Vercel](https://vercel.com).

```bash
vercel
```
