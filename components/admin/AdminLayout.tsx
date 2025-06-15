'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../auth/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center text-gray-700 hover:text-blue-500 mr-4">
              <FaArrowLeft className="mr-2" />
              <span>Volver</span>
            </Link>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
