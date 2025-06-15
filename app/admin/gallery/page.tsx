'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaPlus, FaTrash, FaEdit, FaImage } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { getAllLandingPageData } from '@/lib/api';
import { updateGalleryImage, createGalleryImage, deleteGalleryImage } from '@/lib/api';
import { GalleryImage } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function GalleryAdminPage() {
  return (
    <AdminProtected>
      <GalleryAdminContent />
    </AdminProtected>
  );
}

function GalleryAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<Partial<GalleryImage> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.gallery) {
          setGalleryImages(data.gallery);
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
    setEditingImage((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage || !editingImage.image_path) {
      setError('La imagen es obligatoria');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditing && editingImage.id) {
        // Actualizar imagen existente
        await updateGalleryImage(editingImage as GalleryImage);
        
        // Actualizar la lista local
        setGalleryImages(galleryImages.map(image => 
          image.id === editingImage.id ? { ...image, ...editingImage } : image
        ));
      } else {
        // Crear nueva imagen
        const newImage = await createGalleryImage(editingImage as GalleryImage);
        
        // Añadir a la lista local
        setGalleryImages([...galleryImages, newImage]);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Resetear el formulario
      setEditingImage(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    try {
      await deleteGalleryImage(id);
      setGalleryImages(galleryImages.filter(image => image.id !== id));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al eliminar:', err);
      setError('Error al eliminar la imagen. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage({ ...image });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingImage({
      title: '',
      description: '',
      image_path: '',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingImage(null);
  };

  const handleImageUpload = (filePath: string) => {
    setEditingImage((prev) => prev ? { ...prev, image_path: filePath } : null);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-pink-500 text-4xl" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Administrar Galería">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Imágenes de la Galería ({galleryImages.length})</h2>
        {!editingImage && (
          <button
            onClick={handleNew}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Nueva Imagen
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          <p>¡Operación completada correctamente!</p>
        </div>
      )}

      {/* Formulario de edición */}
      {editingImage && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? 'Editar Imagen' : 'Nueva Imagen'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Título (opcional)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editingImage.title || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Descripción (opcional)
              </label>
              <textarea
                id="description"
                name="description"
                value={editingImage.description || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Imagen <span className="text-red-500">*</span>
              </label>
              
              {editingImage.image_path && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                  <div className="relative h-60 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${editingImage.image_path}`}
                      alt={editingImage.title || 'Imagen de galería'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Subir nueva imagen:</p>
                <ImageUploader
                  bucket="gallery"
                  path="images"
                  onSuccess={handleImageUpload}
                  onError={(err) => setError(err.message)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving || !editingImage.image_path}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Galería de imágenes */}
      {galleryImages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No hay imágenes en la galería. Añade una nueva para comenzar.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <img
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${image.image_path}`}
                  alt={image.title || 'Imagen de galería'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                {image.title && (
                  <h3 className="font-medium text-gray-900 truncate">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{image.description}</p>
                )}
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    <FaEdit className="inline mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    <FaTrash className="inline mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
