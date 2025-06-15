'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { FaSpinner } from 'react-icons/fa';

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está cargando y no está autenticado, redirigir al login
    if (!isLoading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [isLoading, isAuthenticated, router]);

  // Mostrar spinner mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (la redirección se hará en el useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
}
