'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaSpinner } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { getAllLandingPageData, createService, updateService, deleteService } from '@/lib/api';
import { Service } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function ServicesAdminPage() {
  return (
    <AdminProtected>
      <ServicesAdminContent />
    </AdminProtected>
  );
}

function ServicesAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.services) {
          setServices(data.services);
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
    setEditingService((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setEditingService((prev) => prev ? { ...prev, price: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditing && editingService.id) {
        // Actualizar servicio existente
        await updateService(editingService as Service);
        
        // Actualizar la lista local
        setServices(services.map(service => 
          service.id === editingService.id ? { ...service, ...editingService } : service
        ));
      } else {
        // Crear nuevo servicio
        const newService = await createService(editingService as Service);
        
        // Añadir a la lista local
        setServices([...services, newService]);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Resetear el formulario
      setEditingService(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      return;
    }

    try {
      await deleteService(id);
      setServices(services.filter(service => service.id !== id));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al eliminar:', err);
      setError('Error al eliminar el servicio. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingService({
      title: '',
      description: '',
      price: 0,
      image_path: '',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingService(null);
  };

  const handleImageUpload = (filePath: string) => {
    setEditingService((prev) => prev ? { ...prev, image_path: filePath } : null);
  };

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
    <AdminLayout title="Administrar Servicios">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Servicios ({services.length})</h2>
        {!editingService && (
          <button
            onClick={handleNew}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Nuevo Servicio
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
      {editingService && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editingService.title || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Descripción
              </label>
              <RichTextEditor
                value={editingService.description || ''}
                onChange={(value) => setEditingService((prev) => prev ? { ...prev, description: value } : null)}
                placeholder="Escribe la descripción aquí..."
                height="200px"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Precio (€)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={editingService.price || 0}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Imagen
              </label>
              
              {editingService.image_path && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
                  <div className="relative h-40 w-40 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/services/${editingService.image_path}`}
                      alt="Imagen del servicio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Subir nueva imagen:</p>
                <ImageUploader
                  bucket="services"
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
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de servicios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {services.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay servicios disponibles. Crea uno nuevo para comenzar.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {service.image_path && (
                        <div className="flex-shrink-0 h-10 w-10 mr-4">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/services/${service.image_path}`}
                            alt=""
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{service.title}</div>
                        <div className="text-gray-500 truncate max-w-xs">
                          {service.description.length > 50
                            ? `${service.description.substring(0, 50)}...`
                            : service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">
                      {service.price.toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FaEdit className="inline" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
