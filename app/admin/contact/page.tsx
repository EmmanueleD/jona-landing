'use client';

import { useState, useEffect } from 'react';
import { FaSave, FaSpinner, FaPhone, FaWhatsapp, FaEnvelope, FaInstagram, FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllLandingPageData } from '@/lib/api';
import { updateContactInfo } from '@/lib/api';
import { ContactInfo } from '@/types/supabase';
import AdminProtected from '@/components/auth/AdminProtected';

export default function ContactAdminPage() {
  return (
    <AdminProtected>
      <ContactAdminContent />
    </AdminProtected>
  );
}

function ContactAdminContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState<Partial<ContactInfo>>({
    email: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    legal_text: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLandingPageData();
        if (data.contactInfo) {
          setContactData(data.contactInfo);
          setFormData({
            email: data.contactInfo.email || '',
            phone: data.contactInfo.phone || '',
            whatsapp: data.contactInfo.whatsapp || '',
            instagram: data.contactInfo.instagram || '',
            facebook: data.contactInfo.facebook || '',
            linkedin: data.contactInfo.linkedin || '',
            tiktok: data.contactInfo.tiktok || '',
            youtube: data.contactInfo.youtube || '',
            legal_text: data.contactInfo.legal_text || '',
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
      if (!contactData?.id) {
        throw new Error('No se encontró el ID de la información de contacto');
      }

      await updateContactInfo({
        id: contactData.id,
        ...formData,
      } as ContactInfo);

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
    <AdminLayout title="Editar Información de Contacto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
              
              <div className="mb-4">
                <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaPhone className="mr-2" /> Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="whatsapp" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Número con formato internacional (ej: +34612345678)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
              
              <div className="mb-4">
                <label htmlFor="instagram" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaInstagram className="mr-2" /> Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@usuario"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="facebook" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaFacebook className="mr-2" /> Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="linkedin" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaLinkedin className="mr-2" /> LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="tiktok" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaTiktok className="mr-2" /> TikTok
                </label>
                <input
                  type="url"
                  id="tiktok"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  placeholder="https://tiktok.com/@..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="youtube" className="flex items-center text-gray-700 font-medium mb-2">
                  <FaYoutube className="mr-2" /> YouTube
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/c/..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="legal_text" className="block text-gray-700 font-medium mb-2">
              Texto Legal (pie de página)
            </label>
            <textarea
              id="legal_text"
              name="legal_text"
              value={formData.legal_text}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              Texto legal que aparecerá en el pie de página (derechos de autor, política de privacidad, etc.)
            </p>
          </div>

          <div className="flex justify-end mt-6">
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
