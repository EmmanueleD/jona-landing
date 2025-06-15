'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaSpinner, FaImage } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { getAllLandingPageData } from '@/lib/api';
import { updateHero } from '@/lib/api';
import { Hero } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function HeroAdminPage() {
  return (
    <AdminProtected>
      <HeroAdminContent />
    </AdminProtected>
  );
}

function HeroAdminContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<Hero | null>(null);
  const [formData, setFormData] = useState<Partial<Hero>>({
    title: '',
    subtitle: '',
    button_text: '',
    image_path: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.hero) {
          setHeroData(data.hero);
          setFormData({
            title: data.hero.title || '',
            subtitle: data.hero.subtitle || '',
            button_text: data.hero.button_text || '',
            image_path: data.hero.image_path || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (!heroData?.id) {
        throw new Error('No se encontró el ID de la sección Hero');
      }

      await updateHero({
        id: heroData.id,
        ...formData,
      } as Hero);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (filePath: string) => {
    setFormData((prev) => ({ ...prev, image_path: filePath }));
  };

  if (isLoading) {
    return (
      <AdminLayout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Editar Sección Hero">
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p>¡Cambios guardados correctamente!</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Título Principal
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subtitle" className="block text-gray-700 font-medium mb-2">
              Subtítulo
            </label>
            <textarea
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="button_text" className="block text-gray-700 font-medium mb-2">
              Texto del Botón
            </label>
            <input
              type="text"
              id="button_text"
              name="button_text"
              value={formData.button_text}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Imagen de Fondo
            </label>
            
            {formData.image_path && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                <div className="relative h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/hero/${formData.image_path}`}
                    alt="Hero background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-2">Subir nueva imagen:</p>
              <ImageUploader
                bucket="hero"
                path="images"
                onSuccess={handleImageUpload}
                onError={(err) => setError(err.message)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
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
