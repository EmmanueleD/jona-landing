'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaPalette, FaFont, FaBorderStyle, FaImage, FaBars } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllLandingPageData } from '@/lib/api';
import { updateStyles } from '@/lib/api';
import { Styles } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function StylesAdminPage() {
  return (
    <AdminProtected>
      <StylesAdminContent />
    </AdminProtected>
  );
}

function StylesAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stylesData, setStylesData] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({
    // General styles
    primary_color: '#000000',
    secondary_color: '#000000',
    accent_color: '#000000',
    text_color: '#000000',
    background_color: '#ffffff',
    font_family: '',
    heading_font: '',
    border_radius: '',
    box_shadow: '',
    
    // Hero section styles
    hero_background_color: 'rgba(0, 0, 0, 0.4)',
    hero_text_color: '#ffffff',
    hero_title_size: '3rem',
    hero_subtitle_size: '1.5rem',
    hero_button_color: '#f59e0b',
    hero_button_text_color: '#ffffff',
    hero_height: '100vh',
    
    // Navigation styles
    nav_background_color: '#ffffff',
    nav_text_color: '#1f2937',
    nav_hover_color: '#3b82f6',
    nav_active_color: '#1e40af',
    nav_button_color: '#3b82f6',
    nav_button_text_color: '#ffffff',
    nav_transparent: 'true',
    nav_scrolled_background: '#ffffff',
    nav_scrolled_shadow: '0 2px 4px rgba(0,0,0,0.1)',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.styles) {
          // Salva i dati degli stili come sono
          setStylesData(data.styles);
          
          // Imposta i valori del form in base agli stili recuperati
          setFormData({
            // General styles
            primary_color: data.styles.primary_color || '#000000',
            secondary_color: data.styles.secondary_color || '#000000',
            accent_color: data.styles.accent_color || '#000000',
            text_color: data.styles.text_color || '#000000',
            background_color: data.styles.background_color || '#ffffff',
            font_family: data.styles.font_family || '',
            heading_font: data.styles.heading_font || '',
            border_radius: data.styles.border_radius || '',
            box_shadow: data.styles.box_shadow || '',
            
            // Hero section styles
            hero_background_color: data.styles.hero_background_color || 'rgba(0, 0, 0, 0.4)',
            hero_text_color: data.styles.hero_text_color || '#ffffff',
            hero_title_size: data.styles.hero_title_size || '3rem',
            hero_subtitle_size: data.styles.hero_subtitle_size || '1.5rem',
            hero_button_color: data.styles.hero_button_color || '#f59e0b',
            hero_button_text_color: data.styles.hero_button_text_color || '#ffffff',
            hero_height: data.styles.hero_height || '100vh',
            
            // Navigation styles
            nav_background_color: data.styles.nav_background_color || '#ffffff',
            nav_text_color: data.styles.nav_text_color || '#1f2937',
            nav_hover_color: data.styles.nav_hover_color || '#3b82f6',
            nav_active_color: data.styles.nav_active_color || '#1e40af',
            nav_button_color: data.styles.nav_button_color || '#3b82f6',
            nav_button_text_color: data.styles.nav_button_text_color || '#ffffff',
            nav_transparent: data.styles.nav_transparent || 'true',
            nav_scrolled_background: data.styles.nav_scrolled_background || '#ffffff',
            nav_scrolled_shadow: data.styles.nav_scrolled_shadow || '0 2px 4px rgba(0,0,0,0.1)',
          });
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los datos. Por favor, inténtalo de nuevo.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Passa direttamente i dati del form alla funzione updateStyles
      // Non è più necessario l'ID degli stili
      await updateStyles(formData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  // Lista de fuentes disponibles
  const fontOptions = [
    { value: "'Roboto', sans-serif", label: "Roboto" },
    { value: "'Open Sans', sans-serif", label: "Open Sans" },
    { value: "'Lato', sans-serif", label: "Lato" },
    { value: "'Montserrat', sans-serif", label: "Montserrat" },
    { value: "'Poppins', sans-serif", label: "Poppins" },
    { value: "'Raleway', sans-serif", label: "Raleway" },
    { value: "'Playfair Display', serif", label: "Playfair Display" },
    { value: "'Merriweather', serif", label: "Merriweather" },
  ];

  // Opciones para border-radius
  const borderRadiusOptions = [
    { value: "0", label: "Sin bordes redondeados" },
    { value: "0.25rem", label: "Pequeño (0.25rem)" },
    { value: "0.5rem", label: "Medio (0.5rem)" },
    { value: "0.75rem", label: "Grande (0.75rem)" },
    { value: "1rem", label: "Extra grande (1rem)" },
  ];

  // Opciones para box-shadow
  const boxShadowOptions = [
    { value: "none", label: "Sin sombra" },
    { value: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", label: "Sutil" },
    { value: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", label: "Media" },
    { value: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)", label: "Pronunciada" },
    { value: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)", label: "Fuerte" },
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-purple-500 text-4xl" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Personalizar Estilos">
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p>¡Cambios guardados correctamente! Actualiza la página para ver los cambios.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaPalette className="mr-2" /> Colores Generales
              </h3>
              
              <div className="mb-4">
                <label htmlFor="primary_color" className="block text-gray-700 font-medium mb-2">
                  Color Primario
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleChange}
                    className="h-10 w-10 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.primary_color}
                    onChange={handleChange}
                    name="primary_color"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="secondary_color" className="block text-gray-700 font-medium mb-2">
                  Color Secundario
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="secondary_color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleChange}
                    className="h-10 w-10 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.secondary_color}
                    onChange={handleChange}
                    name="secondary_color"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="accent_color" className="block text-gray-700 font-medium mb-2">
                  Color de Acento
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="accent_color"
                    name="accent_color"
                    value={formData.accent_color}
                    onChange={handleChange}
                    className="h-10 w-10 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.accent_color}
                    onChange={handleChange}
                    name="accent_color"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="text_color" className="block text-gray-700 font-medium mb-2">
                  Color de Texto
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="text_color"
                    name="text_color"
                    value={formData.text_color}
                    onChange={handleChange}
                    className="h-10 w-10 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.text_color}
                    onChange={handleChange}
                    name="text_color"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="background_color" className="block text-gray-700 font-medium mb-2">
                  Color de Fondo
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="background_color"
                    name="background_color"
                    value={formData.background_color}
                    onChange={handleChange}
                    className="h-10 w-10 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.background_color}
                    onChange={handleChange}
                    name="background_color"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaFont className="mr-2" /> Tipografía y Estilos
              </h3>
              
              <div className="mb-4">
                <label htmlFor="font_family" className="block text-gray-700 font-medium mb-2">
                  Fuente Principal
                </label>
                <select
                  id="font_family"
                  name="font_family"
                  value={formData.font_family}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona una fuente</option>
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="heading_font" className="block text-gray-700 font-medium mb-2">
                  Fuente para Títulos
                </label>
                <select
                  id="heading_font"
                  name="heading_font"
                  value={formData.heading_font}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona una fuente</option>
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="border_radius" className="block text-gray-700 font-medium mb-2">
                  Bordes Redondeados
                </label>
                <select
                  id="border_radius"
                  name="border_radius"
                  value={formData.border_radius}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona un estilo</option>
                  {borderRadiusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="box_shadow" className="block text-gray-700 font-medium mb-2">
                  Sombras
                </label>
                <select
                  id="box_shadow"
                  name="box_shadow"
                  value={formData.box_shadow}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Selecciona un estilo</option>
                  {boxShadowOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Hero Section Styles */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaImage className="mr-2" /> Sección Hero
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label htmlFor="hero_background_color" className="block text-gray-700 font-medium mb-2">
                    Color de Fondo del Overlay
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="hero_background_color"
                      name="hero_background_color"
                      value={formData.hero_background_color.includes('rgba') ? '#000000' : formData.hero_background_color}
                      onChange={(e) => {
                        // Convert hex to rgba with opacity
                        const hex = e.target.value;
                        setFormData(prev => ({ ...prev, hero_background_color: `rgba(0, 0, 0, 0.4)` }));
                      }}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.hero_background_color}
                      onChange={handleChange}
                      name="hero_background_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="rgba(0, 0, 0, 0.4)"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Usa formato rgba para controlar la opacidad (ej: rgba(0,0,0,0.4))</p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hero_text_color" className="block text-gray-700 font-medium mb-2">
                    Color de Texto
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="hero_text_color"
                      name="hero_text_color"
                      value={formData.hero_text_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.hero_text_color}
                      onChange={handleChange}
                      name="hero_text_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hero_button_color" className="block text-gray-700 font-medium mb-2">
                    Color del Botón
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="hero_button_color"
                      name="hero_button_color"
                      value={formData.hero_button_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.hero_button_color}
                      onChange={handleChange}
                      name="hero_button_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label htmlFor="hero_title_size" className="block text-gray-700 font-medium mb-2">
                    Tamaño del Título
                  </label>
                  <input
                    type="text"
                    id="hero_title_size"
                    name="hero_title_size"
                    value={formData.hero_title_size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="3rem"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hero_subtitle_size" className="block text-gray-700 font-medium mb-2">
                    Tamaño del Subtítulo
                  </label>
                  <input
                    type="text"
                    id="hero_subtitle_size"
                    name="hero_subtitle_size"
                    value={formData.hero_subtitle_size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="1.5rem"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hero_button_text_color" className="block text-gray-700 font-medium mb-2">
                    Color de Texto del Botón
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="hero_button_text_color"
                      name="hero_button_text_color"
                      value={formData.hero_button_text_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.hero_button_text_color}
                      onChange={handleChange}
                      name="hero_button_text_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hero_height" className="block text-gray-700 font-medium mb-2">
                    Altura del Hero
                  </label>
                  <input
                    type="text"
                    id="hero_height"
                    name="hero_height"
                    value={formData.hero_height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="100vh"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Styles */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaBars className="mr-2" /> Barra de Navegación
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label htmlFor="nav_transparent" className="block text-gray-700 font-medium mb-2">
                    Navegación Transparente
                  </label>
                  <select
                    id="nav_transparent"
                    name="nav_transparent"
                    value={formData.nav_transparent}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="true">Sí, transparente al inicio</option>
                    <option value="false">No, siempre con fondo</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_background_color" className="block text-gray-700 font-medium mb-2">
                    Color de Fondo
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_background_color"
                      name="nav_background_color"
                      value={formData.nav_background_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_background_color}
                      onChange={handleChange}
                      name="nav_background_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_text_color" className="block text-gray-700 font-medium mb-2">
                    Color de Texto
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_text_color"
                      name="nav_text_color"
                      value={formData.nav_text_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_text_color}
                      onChange={handleChange}
                      name="nav_text_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_hover_color" className="block text-gray-700 font-medium mb-2">
                    Color al Pasar el Cursor
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_hover_color"
                      name="nav_hover_color"
                      value={formData.nav_hover_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_hover_color}
                      onChange={handleChange}
                      name="nav_hover_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label htmlFor="nav_scrolled_background" className="block text-gray-700 font-medium mb-2">
                    Color de Fondo al Hacer Scroll
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_scrolled_background"
                      name="nav_scrolled_background"
                      value={formData.nav_scrolled_background}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_scrolled_background}
                      onChange={handleChange}
                      name="nav_scrolled_background"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_button_color" className="block text-gray-700 font-medium mb-2">
                    Color del Botón
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_button_color"
                      name="nav_button_color"
                      value={formData.nav_button_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_button_color}
                      onChange={handleChange}
                      name="nav_button_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_button_text_color" className="block text-gray-700 font-medium mb-2">
                    Color de Texto del Botón
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="nav_button_text_color"
                      name="nav_button_text_color"
                      value={formData.nav_button_text_color}
                      onChange={handleChange}
                      className="h-10 w-10 rounded mr-2"
                    />
                    <input
                      type="text"
                      value={formData.nav_button_text_color}
                      onChange={handleChange}
                      name="nav_button_text_color"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="nav_scrolled_shadow" className="block text-gray-700 font-medium mb-2">
                    Sombra al Hacer Scroll
                  </label>
                  <input
                    type="text"
                    id="nav_scrolled_shadow"
                    name="nav_scrolled_shadow"
                    value={formData.nav_scrolled_shadow}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0 2px 4px rgba(0,0,0,0.1)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Vista previa</h3>
            <div 
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: formData.background_color,
                color: formData.text_color,
                fontFamily: formData.font_family,
                borderRadius: formData.border_radius,
                boxShadow: formData.box_shadow
              }}
            >
              <h2 
                className="text-2xl mb-4"
                style={{
                  fontFamily: formData.heading_font || formData.font_family,
                  color: formData.primary_color
                }}
              >
                Título de ejemplo
              </h2>
              <p className="mb-4">Este es un párrafo de ejemplo para mostrar cómo se verán los textos con la fuente seleccionada.</p>
              <button
                style={{
                  backgroundColor: formData.primary_color,
                  color: '#ffffff',
                  borderRadius: formData.border_radius,
                  padding: '0.5rem 1rem',
                }}
              >
                Botón primario
              </button>
              <button
                style={{
                  backgroundColor: formData.secondary_color,
                  color: '#ffffff',
                  borderRadius: formData.border_radius,
                  padding: '0.5rem 1rem',
                  marginLeft: '0.5rem',
                }}
              >
                Botón secundario
              </button>
              <button
                style={{
                  backgroundColor: formData.accent_color,
                  color: '#ffffff',
                  borderRadius: formData.border_radius,
                  padding: '0.5rem 1rem',
                  marginLeft: '0.5rem',
                }}
              >
                Botón acento
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
            >
              {isSaving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
