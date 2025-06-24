'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaUser } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { getAllLandingPageData } from '@/lib/api';
import { updateAboutMe } from '@/lib/api';
import { AboutMe } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function AboutMeAdminPage() {
  return (
    <AdminProtected>
      <AboutMeAdminContent />
    </AdminProtected>
  );
}

function AboutMeAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aboutMeData, setAboutMeData] = useState<AboutMe | null>(null);
  const [formData, setFormData] = useState<Partial<AboutMe>>({
    title: '',
    content: '',
    image_path: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.aboutMe) {
          setAboutMeData(data.aboutMe);
          setFormData({
            title: data.aboutMe.title || '',
            content: data.aboutMe.content || '',
            image_path: data.aboutMe.image_path || '',
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
      if (!aboutMeData?.id) {
        throw new Error('No se encontró el ID de la sección Sobre Mí');
      }

      await updateAboutMe({
        id: aboutMeData.id,
        ...formData,
      } as AboutMe);

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
          <FaSpinner className="animate-spin text-green-500 text-4xl" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Editar Sección Sobre Mí">
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
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Contenido
            </label>
            <RichTextEditor
              value={formData.content || ''}
              onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
              placeholder="Escribe el contenido aquí..."
              height="300px"
            />
            <p className="text-sm text-gray-500 mt-1">
              Usa el editor para dar formato al texto.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Foto
            </label>
            
            {formData.image_path && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                <div className="relative h-40 w-40 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/about/${formData.image_path}`}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-2">Subir nueva foto:</p>
              <ImageUploader
                bucket="about"
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
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
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
