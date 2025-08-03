'use client';

import { useState, useEffect } from 'react';

export default function ConfiguracionPage() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [idioma, setIdioma] = useState('es');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  useEffect(() => {
    const darkPreference = localStorage.getItem('darkMode') === 'true';
    setModoOscuro(darkPreference);
    const savedLanguage = localStorage.getItem('language') || 'es';
    setIdioma(savedLanguage);
  }, []);

  const toggleModoOscuro = () => {
    const nuevoEstado = !modoOscuro;
    setModoOscuro(nuevoEstado);
    localStorage.setItem('darkMode', String(nuevoEstado));
    if (nuevoEstado) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const cambiarIdioma = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setIdioma(lang);
    localStorage.setItem('language', lang);
  };

  const cambiarPassword = () => {
    if (nuevaPassword !== confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    alert('Contraseña cambiada exitosamente.');
    setNuevaPassword('');
    setConfirmarPassword('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="flex items-center justify-between">
          <span>Modo Oscuro</span>
          <button
            onClick={toggleModoOscuro}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {modoOscuro ? 'Desactivar' : 'Activar'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>Idioma</span>
          <select
            value={idioma}
            onChange={cambiarIdioma}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Cambiar Contraseña</h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={cambiarPassword}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
}
