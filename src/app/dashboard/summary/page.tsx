'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Movimiento = {
  id: string;
  tipo: 'Entrada' | 'Salida';
  placa: string;
  hora: string;
  createdAt: string;
};

export default function DashboardHome() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [horaActual, setHoraActual] = useState(new Date());
  const [modoOscuro, setModoOscuro] = useState(false);

  const API_URL = 'https://6870b1767ca4d06b34b7971d.mockapi.io/movimientos';

  // Cargar preferencia de modo oscuro
  useEffect(() => {
    const darkPreference = localStorage.getItem('darkMode') === 'true';
    setModoOscuro(darkPreference);
    if (darkPreference) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Aplicar modo oscuro al cambiar el estado
  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [modoOscuro]);

  // Actualización de la hora en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setHoraActual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cargar movimientos desde la API en tiempo real
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      const ordenados = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMovimientos(ordenados);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const entradasHoy = movimientos.filter(m => m.tipo === 'Entrada' && esHoy(m.createdAt)).length;
  const salidasHoy = movimientos.filter(m => m.tipo === 'Salida' && esHoy(m.createdAt)).length;
  const dataGrafico = generarActividadSemanal(movimientos);

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400">¡Bienvenido, Nicolás!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hoy es {horaActual.toLocaleDateString()} — {horaActual.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={toggleModoOscuro}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {modoOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Entradas hoy" value={entradasHoy} color="bg-green-600" />
        <Card title="Salidas hoy" value={salidasHoy} color="bg-red-600" />
        <Card title="Total movimientos" value={movimientos.length} color="bg-blue-600" />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Actividad semanal</h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataGrafico}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="entradas" fill="#22c55e" />
              <Bar dataKey="salidas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Últimos movimientos</h3>
        {movimientos.length === 0 ? (
          <p className="text-gray-500">No hay movimientos aún.</p>
        ) : (
          <ul className="bg-white dark:bg-gray-800 rounded shadow divide-y divide-gray-200 dark:divide-gray-700">
            {movimientos.slice(0, 5).map((m) => (
              <li key={m.id} className="p-4 flex justify-between">
                <span>
                  <span
                    className={`font-semibold ${m.tipo === 'Entrada' ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {m.tipo}
                  </span>{' '}
                  — {m.placa}
                </span>
                <span className="text-sm text-gray-500">{m.hora}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className={`p-6 rounded text-white shadow-md ${color}`}>
      <p className="text-sm">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}

function esHoy(fechaStr: string): boolean {
  const date = new Date(fechaStr);
  const hoy = new Date();
  return (
    date.getDate() === hoy.getDate() &&
    date.getMonth() === hoy.getMonth() &&
    date.getFullYear() === hoy.getFullYear()
  );
}

function generarActividadSemanal(movimientos: Movimiento[]) {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const resumen = Array(7).fill(0).map((_, i) => ({
    name: dias[i],
    entradas: 0,
    salidas: 0,
  }));

  movimientos.forEach((m) => {
    const dia = new Date(m.createdAt).getDay();
    if (m.tipo === 'Entrada') resumen[dia].entradas += 1;
    if (m.tipo === 'Salida') resumen[dia].salidas += 1;
  });

  return resumen;
}
