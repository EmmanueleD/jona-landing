# Quiropraxia Jona - Documentación

Esta es la documentación para la landing page de Quiropraxia Jona, desarrollada con Next.js, Tailwind CSS y Supabase como CMS.

## Configuración de Variables de Entorno

Para configurar la aplicación, sigue estos pasos:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Copia y pega las siguientes variables, reemplazando los valores con tus propias credenciales:

```
# Supabase - Obtén estas credenciales desde tu proyecto en https://app.supabase.io
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# WhatsApp - Número sin espacios, símbolos ni prefijo '+'
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
```

### Instrucciones para obtener credenciales de Supabase

1. Inicia sesión en [Supabase](https://app.supabase.io)
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a Configuración > API
4. Copia la URL del proyecto y la clave anon/public
5. Pega estos valores en tu archivo `.env.local`

> **Importante**: Nunca compartas tus credenciales de Supabase ni subas el archivo `.env.local` a repositorios públicos. Este archivo ya está incluido en `.gitignore` para evitar esto.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `app/`: Contiene las páginas de la aplicación
- `components/`: Componentes reutilizables
  - `layout/`: Componentes de estructura (Navbar, Footer)
  - `sections/`: Secciones principales de la landing page
  - `ui/`: Componentes de interfaz reutilizables
- `lib/`: Utilidades y configuración
- `types/`: Definiciones de tipos TypeScript
- `public/`: Archivos estáticos

## Guía para Editar Contenido en Supabase

### Acceso a Supabase

1. Accede a [Supabase](https://app.supabase.io) y selecciona el proyecto "Quiropraxia Jona"
2. Ve a la sección "Table Editor" para editar el contenido de las tablas

### Edición de Contenido

#### Hero (Sección Principal)

En la tabla `hero`:

- `title`: Título principal
- `subtitle`: Subtítulo o descripción breve
- `button_text`: Texto del botón de contacto
- `image_path`: Ruta de la imagen de fondo (subida a Storage)

#### Sobre Mí

En la tabla `about_me`:

- `title`: Título de la sección
- `content`: Contenido en formato HTML (puedes incluir etiquetas para formato)
- `image_path`: Ruta de la imagen (subida a Storage)

#### Servicios

En la tabla `services`:

- `title`: Nombre del servicio
- `description`: Descripción del servicio
- `icon_path`: Ruta del icono (opcional)
- `image_path`: Ruta de la imagen (opcional)
- `price`: Precio del servicio

#### Testimonios

En la tabla `testimonials`:

- `name`: Nombre de la persona
- `quote`: Testimonio o frase
- `image_path`: Ruta de la foto (subida a Storage)

#### Galería

En la tabla `gallery`:

- `title`: Título de la imagen (opcional)
- `description`: Descripción de la imagen (opcional)
- `image_path`: Ruta de la imagen (subida a Storage)

#### Ubicación

En la tabla `location`:

- `address`: Dirección completa
- `google_maps_url`: URL de Google Maps (embed)
- `additional_info`: Información adicional (opcional)

#### Información de Contacto

En la tabla `contact_info`:

- `email`: Correo electrónico
- `phone`: Teléfono
- `whatsapp`: Número de WhatsApp
- `instagram`: Usuario de Instagram
- `facebook`: URL de Facebook
- `linkedin`: URL de LinkedIn
- `legal_text`: Texto legal para el footer

### Cómo Subir Imágenes

1. Ve a la sección "Storage" en Supabase
2. Selecciona el bucket correspondiente:
   - `hero`: Para la imagen principal
   - `about`: Para imágenes de la sección "Sobre Mí"
   - `services`: Para imágenes de servicios
   - `icons`: Para iconos de servicios
   - `testimonials`: Para fotos de testimonios
   - `gallery`: Para imágenes de la galería
3. Haz clic en "Upload" y selecciona la imagen
4. Una vez subida, copia la ruta (ejemplo: `carpeta/imagen.jpg`) y guárdala en el campo correspondiente de la tabla

### Recomendaciones para Imágenes

- **Hero**: Usar imágenes de alta calidad, preferiblemente 1920x1080px o superior
- **Servicios**: Imágenes cuadradas de 600x600px
- **Testimonios**: Fotos cuadradas de 300x300px
- **Galería**: Imágenes de alta calidad, preferiblemente en formato 16:9 o 4:3

## Mantenimiento

La página se actualiza automáticamente cada hora. Si necesitas actualizar el contenido inmediatamente, puedes reiniciar la aplicación o forzar una reconstrucción en el proveedor de hosting.
