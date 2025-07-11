'use client';
import { useEffect, useState } from 'react';

type Movimiento = {
  id: string;
  tipo: 'Entrada' | 'Salida';
  placa: string;
  hora: string;
  createdAt: string;
};

export default function MovementsPage() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [placa, setPlaca] = useState('');
  const [horaActual, setHoraActual] = useState(new Date());

  const API_URL = 'https://6870b1767ca4d06b34b7971d.mockapi.io/movimientos';

  useEffect(() => {
    fetchMovimientos();
    const interval = setInterval(fetchMovimientos, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setHoraActual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchMovimientos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const ordenados = data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setMovimientos(ordenados);
  };

  const registrar = async (tipo: 'Entrada' | 'Salida') => {
    if (!placa.trim()) return alert('Ingresa una placa válida');

    const nuevo = {
      tipo,
      placa: placa.toUpperCase(),
      hora: horaActual.toLocaleTimeString(),
      createdAt: new Date().toISOString(),
    };

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });

    setPlaca('');
    fetchMovimientos();
  };

  return (
    <div className="space-y-10">
      {/* Encabezado */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          🚗 Registro de Movimientos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {horaActual.toLocaleDateString()} — {horaActual.toLocaleTimeString()}
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <input
            type="text"
            placeholder="Placa del vehículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <div className="flex gap-3">
            <button
              onClick={() => registrar('Entrada')}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              + Entrada
            </button>
            <button
              onClick={() => registrar('Salida')}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              + Salida
            </button>
          </div>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          🧾 Historial Reciente
        </h3>
        {movimientos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No hay movimientos registrados aún.
          </p>
        ) : (
          <ul className="space-y-4">
            {movimientos.map((m) => (
              <li
                key={m.id}
                className={`p-4 rounded-lg flex justify-between items-center border-l-4 ${
                  m.tipo === 'Entrada'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div>
                  <span className="block font-medium text-lg text-gray-800 dark:text-white">
                    {m.placa}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {m.tipo} — {m.hora}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
