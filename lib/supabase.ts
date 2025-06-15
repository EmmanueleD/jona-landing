import { createClient } from '@supabase/supabase-js';

// Estos valores deben estar en variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para obtener URL de imagen desde Supabase Storage
export const getImageUrl = (bucket: string, path: string) => {
  if (!path) return null;
  
  // Verificar si el path ya es una URL completa
  if (path.startsWith('http')) {
    return path;
  }
  
  // Eliminar cualquier prefijo duplicado del bucket
  const cleanPath = path.includes(`${bucket}/`) 
    ? path.substring(path.indexOf(`${bucket}/`) + bucket.length + 1) 
    : path;
    
  const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
  return data?.publicUrl;
};

// Función para subir una imagen a Supabase Storage
export const uploadImage = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};
