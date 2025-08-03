// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-blue-700">AutoTrack AI</h1>
        <p className="text-gray-600">Gestiona y monitorea tus vehículos de manera inteligente.</p>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
          
          <button
            onClick={() => router.push('/register')}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl text-lg font-semibold hover:bg-gray-300 transition"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
