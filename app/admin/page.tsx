"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaLock,
  FaEdit,
  FaImages,
  FaUser,
  FaComments,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner
} from "react-icons/fa";
import { getAllLandingPageData } from "@/lib/api";
import { LandingPageData } from "@/types/supabase";
import { useAuth } from "@/components/auth/AuthContext";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LandingPageData | null>(null);
  const router = useRouter();
  const {
    signIn,
    isAuthenticated,
    isLoading: authLoading,
    signOut
  } = useAuth();

  // Iniciar sesión con Supabase Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error, success } = await signIn(email, password);

      if (error) {
        setError(
          "Error de autenticación: " +
            (error.message || "Credenciales incorrectas")
        );
      } else if (success) {
        // La redirección se maneja automáticamente por el cambio en isAuthenticated
      }
    } catch (err: any) {
      setError("Error inesperado: " + (err.message || "Inténtalo de nuevo"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cargar datos si está autenticado
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const pageData = await getAllLandingPageData();
          setData(pageData);
        } catch (err) {
          console.error("Error al cargar datos:", err);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <FaLock className="mx-auto text-blue-500 text-4xl mb-4" />
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-gray-600">Kinesiología Jona</p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sección Hero */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaEdit className="text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold">Sección Hero</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Edita el título principal, subtítulo e imagen de portada.
            </p>
            <button
              onClick={() => router.push("/admin/hero")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Sobre Mí */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaUser className="text-green-500" />
              </div>
              <h2 className="text-xl font-semibold">Sobre Mí</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Actualiza tu biografía, foto y descripción profesional.
            </p>
            <button
              onClick={() => router.push("/admin/about")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Servicios */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaEdit className="text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold">Servicios</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Gestiona tus servicios, precios y descripciones.
            </p>
            <button
              onClick={() => router.push("/admin/services")}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Testimonios */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaComments className="text-yellow-500" />
              </div>
              <h2 className="text-xl font-semibold">Testimonios</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Administra los testimonios de tus clientes.
            </p>
            <button
              onClick={() => router.push("/admin/testimonials")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Galería */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaImages className="text-red-500" />
              </div>
              <h2 className="text-xl font-semibold">Galería</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Sube y organiza las imágenes de tu galería.
            </p>
            <button
              onClick={() => router.push("/admin/gallery")}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Ubicación */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-indigo-500" />
              </div>
              <h2 className="text-xl font-semibold">Ubicación</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Actualiza tu dirección y mapa de Google.
            </p>
            <button
              onClick={() => router.push("/admin/location")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <FaPhone className="text-teal-500" />
              </div>
              <h2 className="text-xl font-semibold">Contacto</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Actualiza tus datos de contacto y redes sociales.
            </p>
            <button
              onClick={() => router.push("/admin/contact")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Sección
            </button>
          </div>

          {/* Sección Estilos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-full mr-4">
                <FaEdit className="text-pink-500" />
              </div>
              <h2 className="text-xl font-semibold">Estilos</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Personaliza los colores, fuentes y estilos del sitio.
            </p>
            <button
              onClick={() => router.push("/admin/styles")}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Editar Estilos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
