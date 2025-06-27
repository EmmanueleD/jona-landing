# Quiropraxia Jona - Complete Documentation

This documentation provides a comprehensive guide for implementing, configuring, and using the Quiropraxia Jona website, a professional landing page for chiropractic services.

**Author:** Emmanuele Durante ([emmanueledurante.com](https://emmanueledurante.com))  
**Copyright:** © 2025 Emmanuele Durante

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Development Environment Setup](#development-environment-setup)
4. [Backend: Supabase](#backend-supabase)
5. [Frontend: Next.js](#frontend-nextjs)
6. [Admin Panel](#admin-panel)
7. [Deployment](#deployment)
8. [Maintenance and Updates](#maintenance-and-updates)

## Project Overview

Quiropraxia Jona is a professional website for a chiropractor, designed to showcase services, provide information about the professional, display client testimonials, and facilitate contact. The site includes:

- Responsive landing page with modern design
- Configurable sections (Hero, About Me, Services, Testimonials, Gallery, Location)
- Admin panel to manage all content
- Customizable styles (colors, fonts, logo)
- WhatsApp integration for direct contact

## Technology Stack

### Frontend

- **Next.js 14+**: React framework with server-side rendering
- **React 19+**: UI library
- **TypeScript**: Static typing
- **TailwindCSS**: Utility-first CSS framework
- **React Icons**: SVG icons

### Backend

- **Supabase**: PostgreSQL database, authentication, and storage
- **API Routes**: Next.js serverless API

### Development Tools

- **Node.js**: JavaScript runtime environment
- **npm/yarn**: Package management
- **Git**: Version control

## Development Environment Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account
- Code editor (recommended: VS Code)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourUsername/kinesiologia-jona.git
   cd kinesiologia-jona
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the project root with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-public-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Backend: Supabase

### Creating a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the URL and public anonymous key to your environment variables

### Database Schema

The database consists of the following tables:

#### `hero` Table

```sql
CREATE TABLE hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  background_image TEXT,
  cta_text TEXT,
  cta_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `about_me` Table

```sql
CREATE TABLE about_me (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `services` Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `testimonials` Table

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `gallery` Table

```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `location` Table

```sql
CREATE TABLE location (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  country TEXT,
  map_url TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `contact_info` Table

```sql
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  instagram TEXT,
  facebook TEXT,
  twitter TEXT,
  legal_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `styles` Table

```sql
CREATE TABLE styles (
  key TEXT PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns for configurable logo
ALTER TABLE styles
ADD COLUMN logo_type TEXT,
ADD COLUMN logo_text TEXT,
ADD COLUMN logo_image_url TEXT;
```

### Security Policies (RLS)

Configure Row Level Security (RLS) policies to protect data:

```sql
-- RLS policies for hero table
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read
CREATE POLICY "Allow everyone to read hero" ON hero
  FOR SELECT USING (true);

-- Allow authenticated users to insert, update, and delete
CREATE POLICY "Allow authenticated users to insert hero" ON hero
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update hero" ON hero
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete hero" ON hero
  FOR DELETE USING (auth.role() = 'authenticated');
```

Repeat these policies for all other tables (`about_me`, `services`, `testimonials`, `gallery`, `location`, `contact_info`, `styles`).

### Storage Buckets

Create the following storage buckets for images:

1. **`images` Bucket**

   - Used for general site images
   - Access policies: public for reading, authenticated for writing

2. **`logos` Bucket**
   - Used for logo images
   - Access policies: public for reading, authenticated for writing

```sql
-- Create the 'logos' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow everyone to read from the 'logos' bucket
CREATE POLICY "Allow everyone to read logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'logos');

-- Policy to allow authenticated users to upload to the 'logos' bucket
CREATE POLICY "Allow authenticated users to upload logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Policy to allow authenticated users to update in the 'logos' bucket
CREATE POLICY "Allow authenticated users to update logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'logos');

-- Policy to allow authenticated users to delete from the 'logos' bucket
CREATE POLICY "Allow authenticated users to delete logos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'logos');
```

## Frontend: Next.js

### Project Structure

```
kinesiologia-jona/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin panel
│   │   ├── about/          # About Me section management
│   │   ├── contact/        # Contact information management
│   │   ├── gallery/        # Gallery management
│   │   ├── hero/           # Hero section management
│   │   ├── location/       # Location information management
│   │   ├── services/       # Services management
│   │   ├── styles/         # Styles and logo management
│   │   ├── testimonials/   # Testimonials management
│   │   └── layout.tsx      # Admin panel layout
│   ├── api/                # API Routes
│   ├── layout.tsx          # Main layout
│   └── page.tsx            # Homepage
├── components/             # React components
│   ├── admin/              # Admin panel components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── sections/           # Landing page sections
│   └── ui/                 # Reusable UI components
├── lib/                    # Utility functions
│   ├── api.ts              # Functions to interact with Supabase
│   └── supabase.ts         # Supabase client
├── public/                 # Static files
└── types/                  # TypeScript definitions
    └── supabase.ts         # Types for Supabase tables
```

### Data Flow

1. **Initialization**:

   - `app/layout.tsx` loads global styles
   - `app/page.tsx` calls `getAllLandingPageData()` to get all data

2. **API**:

   - `lib/api.ts` contains functions to interact with Supabase
   - `getAllLandingPageData()` retrieves data from all tables
   - Specific functions for each section (e.g., `getHero()`, `getServices()`)

3. **Components**:
   - Data is passed to section components
   - Each component displays the data appropriately

### Main Components

#### Navbar

The `Navbar` component supports:

- Configurable logo (text or image)
- Transparent or background navigation
- Responsive mobile menu

#### Footer

The `Footer` component includes:

- Contact information
- Social media links
- Legal text in a modal dialog

#### Sections

Each landing page section is a separate component:

- `Hero`: Main banner with CTA
- `AboutMe`: Information about the professional
- `Services`: List of offered services
- `Testimonials`: Client testimonials
- `Gallery`: Image gallery
- `Location`: Map and contact information

## Admin Panel

### Access

The admin panel is accessible at the URL `/admin`. It requires authentication through Supabase.

### Features

#### Hero Management

- Edit title and subtitle
- Upload background image
- Configure CTA button text and URL

#### About Me Management

- Edit title and content
- Upload professional's image

#### Services Management

- Add, edit, and delete services
- Upload images for each service
- Reorder services

#### Testimonials Management

- Add, edit, and delete testimonials
- Upload client images
- Set ratings
- Reorder testimonials

#### Gallery Management

- Upload and organize images
- Add alt text for accessibility

#### Location Management

- Configure address and contact details
- Set map URL

#### Contact Management

- Configure email, phone, WhatsApp
- Manage social media links
- Edit legal text

#### Styles Management

- Customize primary, secondary, and accent colors
- Configure fonts for text and headings
- Manage logo (text or image)
- Customize navigation appearance

### Logo Management

The admin panel allows configuring the logo in two ways:

1. **Text Logo**:

   - Select "Text" logo type
   - Enter desired text
   - Text color will be the configured primary color

2. **Image Logo**:
   - Select "Image" logo type
   - Upload an image using the uploader
   - The image will be saved in the Supabase `logos` bucket
   - View a preview of the uploaded logo

## Deployment

### Deploying to Vercel

1. **Preparation**:

   - Ensure the repository is on GitHub, GitLab, or Bitbucket
   - Verify all environment variables are configured in the `.env.local` file

2. **Deploy**:

   - Go to [vercel.com](https://vercel.com)
   - Import the repository
   - Configure environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-public-key
     ```
   - Click "Deploy"

3. **Domain Configuration**:
   - In Vercel, go to "Settings" > "Domains"
   - Add your custom domain
   - Follow instructions to configure DNS records

### Alternative Deployment

#### Traditional Hosting

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Upload the files from the `.next` folder to your hosting

## Maintenance and Updates

### Updating Dependencies

Periodically update the project dependencies:

```bash
npm update
# or
yarn upgrade
```

### Database Backup

Regularly backup the Supabase database:

1. Go to the Supabase dashboard
2. Select your project
3. Go to "Settings" > "Database"
4. Click on "Backup"

### Monitoring

Use Vercel's monitoring tools to check application performance and errors.

---

## Conclusion

This documentation provides a comprehensive guide for implementing, configuring, and using the Quiropraxia Jona website. By following these instructions, you can create and manage a professional website for chiropractic services with a complete admin panel.

For assistance or questions, contact the author:

- **Emmanuele Durante**: [emmanueledurante.com](https://emmanueledurante.com)

---

© 2025 Emmanuele Durante. All rights reserved.
