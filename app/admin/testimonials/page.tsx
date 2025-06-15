'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaPlus, FaTrash, FaEdit, FaQuoteLeft } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import { getAllLandingPageData } from '@/lib/api';
import { updateTestimonial, createTestimonial, deleteTestimonial } from '@/lib/api';
import { Testimonial } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function TestimonialsAdminPage() {
  return (
    <AdminProtected>
      <TestimonialsAdminContent />
    </AdminProtected>
  );
}

function TestimonialsAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.testimonials) {
          setTestimonials(data.testimonials);
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
    setEditingTestimonial((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditing && editingTestimonial.id) {
        // Actualizar testimonio existente
        await updateTestimonial(editingTestimonial as Testimonial);
        
        // Actualizar la lista local
        setTestimonials(testimonials.map(testimonial => 
          testimonial.id === editingTestimonial.id ? { ...testimonial, ...editingTestimonial } : testimonial
        ));
      } else {
        // Crear nuevo testimonio
        const newTestimonial = await createTestimonial(editingTestimonial as Testimonial);
        
        // Añadir a la lista local
        setTestimonials([...testimonials, newTestimonial]);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Resetear el formulario
      setEditingTestimonial(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este testimonio?')) {
      return;
    }

    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al eliminar:', err);
      setError('Error al eliminar el testimonio. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingTestimonial({
      name: '',
      quote: '',
      image_path: '',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingTestimonial(null);
  };

  const handleImageUpload = (filePath: string) => {
    setEditingTestimonial((prev) => prev ? { ...prev, image_path: filePath } : null);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-yellow-500 text-4xl" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Administrar Testimonios">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Testimonios ({testimonials.length})</h2>
        {!editingTestimonial && (
          <button
            onClick={handleNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Nuevo Testimonio
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
      {editingTestimonial && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? 'Editar Testimonio' : 'Nuevo Testimonio'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingTestimonial.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quote" className="block text-gray-700 font-medium mb-2">
                Testimonio
              </label>
              <textarea
                id="quote"
                name="quote"
                value={editingTestimonial.quote || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={4}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Foto (opcional)
              </label>
              
              {editingTestimonial.image_path && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                  <div className="relative h-24 w-24 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/testimonials/${editingTestimonial.image_path}`}
                      alt="Foto del cliente"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Subir nueva foto:</p>
                <ImageUploader
                  bucket="testimonials"
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
                disabled={isSaving}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
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

      {/* Lista de testimonios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay testimonios disponibles. Crea uno nuevo para comenzar.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4 relative">
                <FaQuoteLeft className="text-yellow-200 text-4xl absolute top-2 left-2 opacity-50" />
                <div className="flex items-start mb-4 relative z-10">
                  {testimonial.image_path ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/testimonials/${testimonial.image_path}`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                      <span className="text-yellow-500 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{testimonial.quote}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaEdit className="inline mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="inline mr-1" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
