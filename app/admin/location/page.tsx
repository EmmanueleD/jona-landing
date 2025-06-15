'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllLandingPageData } from '@/lib/api';
import { updateLocation } from '@/lib/api';
import { Location } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function LocationAdminPage() {
  return (
    <AdminProtected>
      <LocationAdminContent />
    </AdminProtected>
  );
}

function LocationAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    address: '',
    google_maps_url: '',
    additional_info: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.location) {
          setLocationData(data.location);
          setFormData({
            address: data.location.address || '',
            google_maps_url: data.location.google_maps_url || '',
            additional_info: data.location.additional_info || '',
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
      if (!locationData?.id) {
        throw new Error('No se encontró el ID de la ubicación');
      }

      await updateLocation({
        id: locationData.id,
        ...formData,
      } as Location);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
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
    <AdminLayout title="Editar Ubicación">
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
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="google_maps_url" className="block text-gray-700 font-medium mb-2">
              URL de Google Maps (iframe embed)
            </label>
            <input
              type="text"
              id="google_maps_url"
              name="google_maps_url"
              value={formData.google_maps_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Pega aquí la URL completa del iframe de Google Maps. Para obtenerla, ve a Google Maps, busca tu ubicación,
              haz clic en "Compartir", selecciona "Insertar un mapa" y copia la URL del iframe (src="...").
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="additional_info" className="block text-gray-700 font-medium mb-2">
              Información adicional (opcional)
            </label>
            <textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
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

        {/* Vista previa del mapa */}
        {formData.google_maps_url && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Vista previa del mapa</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src={formData.google_maps_url}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
