'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center px-6 relative overflow-hidden">

      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white flex-col space-y-6 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            onClick={() => setShowSplash(false)} // Toca para continuar
          >
            {/* LOGO CON ANIMACIÓN DE ROTACIÓN + PULSACIÓN */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],  // Heartbeat efecto
                opacity: 1,
                rotate: [0, 360],     // Gira 360 grados
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 3,  // Tiempo del ciclo completo (3s)
                ease: 'easeInOut',
              }}
            >
              <Image src="/logo.svg" alt="Logo" width={120} height={120} priority />
            </motion.div>

            <motion.p
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Sena Security Mobile
            </motion.p>
            <p className="text-sm">(Toca para continuar)</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Content */}
      {!showSplash && (
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-blue-700">SenaSecurityMobile</h1>
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
        </motion.div>
      )}
    </div>
  );
}
