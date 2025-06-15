# Estructura de Tablas en Supabase para Kinesiología Jona

Este documento describe la estructura de tablas necesarias en Supabase para gestionar el contenido de la landing page de Kinesiología Jona.

## Tablas

### 1. hero

Almacena la información para la sección principal (hero) de la landing page.

```sql
CREATE TABLE hero (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT NOT NULL,
  image_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. about_me

Información para la sección "Sobre Mí".

```sql
CREATE TABLE about_me (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. services

Lista de servicios ofrecidos.

```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_path TEXT,
  image_path TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. testimonials

Testimonios de clientes.

```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. gallery

Imágenes para la galería.

```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. location

Información de ubicación.

```sql
CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  google_maps_url TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7. contact_info

Información de contacto y redes sociales.

```sql
CREATE TABLE contact_info (
  id SERIAL PRIMARY KEY,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  instagram TEXT,
  facebook TEXT,
  linkedin TEXT,
  legal_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. styles

Configuración de estilos para personalizar la apariencia del sitio.

```sql
CREATE TABLE styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Buckets de Storage

Además de las tablas, necesitamos crear los siguientes buckets en Supabase Storage:

1. `hero` - Para imágenes de la sección Hero
2. `about` - Para imágenes de la sección Sobre Mí
3. `services` - Para imágenes de servicios
4. `icons` - Para iconos de servicios
5. `testimonials` - Para fotos de testimonios
6. `gallery` - Para imágenes de la galería

## Políticas de Seguridad

Para cada tabla y bucket, configurar:

1. Políticas de lectura pública (para que cualquier visitante pueda ver el contenido)
2. Políticas de escritura restringidas (solo para usuarios autenticados con rol específico)

## Triggers para actualización

Para mantener el campo `updated_at` actualizado:

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a cada tabla
CREATE TRIGGER update_hero_timestamp
BEFORE UPDATE ON hero
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Repetir para las demás tablas
```
