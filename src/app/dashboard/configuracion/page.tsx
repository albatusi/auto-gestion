'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ConfiguracionPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const [modoOscuro, setModoOscuro] = useState(false);
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  useEffect(() => {
    const darkPreference = localStorage.getItem('darkMode') === 'true';
    setModoOscuro(darkPreference);
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

  const cambiarIdioma = (lang: string) => {
    router.replace(`/${lang}/dashboard/configuracion`);
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
      <h1 className="text-3xl font-bold">{t('config.title')}</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <div className="flex items-center justify-between">
          <span>{t('config.darkMode')}</span>
          <button
            onClick={toggleModoOscuro}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {modoOscuro ? t('config.deactivate') : t('config.activate')}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span>{t('config.language')}</span>
          <select
            value={locale}
            onChange={(e) => cambiarIdioma(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">{t('config.changePassword')}</h2>
        <input
          type="password"
          placeholder={t('config.newPassword')}
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="password"
          placeholder={t('config.confirmPassword')}
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={cambiarPassword}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {t('config.change')}
        </button>
      </div>
    </div>
  );
}
