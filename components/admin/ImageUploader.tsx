'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/supabase';
import { FaUpload, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

interface ImageUploaderProps {
  bucket: string;
  path: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

const ImageUploader = ({ bucket, path, onSuccess, onError }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // Generar un nombre de archivo único basado en la fecha y el nombre original
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      // Subir la imagen a Supabase Storage
      const data = await uploadImage(bucket, filePath, file);
      
      setSuccess(true);
      if (onSuccess) onSuccess(filePath);
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      setError((err as Error).message);
      if (onError) onError(err as Error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
        {isUploading ? (
          <div className="flex items-center space-x-2">
            <FaSpinner className="animate-spin text-blue-500" size={24} />
            <span>Subiendo imagen...</span>
          </div>
        ) : success ? (
          <div className="flex items-center space-x-2 text-green-500">
            <FaCheck size={24} />
            <span>¡Imagen subida con éxito!</span>
          </div>
        ) : (
          <>
            <FaUpload className="text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-500 mb-4">
              Haz clic para seleccionar una imagen o arrastra y suelta aquí
            </p>
            <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
              Seleccionar Imagen
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </>
        )}

        {error && (
          <div className="mt-4 text-red-500 flex items-center space-x-2">
            <FaTimes />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
