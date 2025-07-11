'use client';
import { useEffect, useState } from 'react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', plate: '', type: 'carro' });

  useEffect(() => {
    const saved = localStorage.getItem('vehicles');
    if (saved) {
      setVehicles(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      ...form,
    };
    const updated = [newVehicle, ...vehicles];
    setVehicles(updated);
    localStorage.setItem('vehicles', JSON.stringify(updated));
    setForm({ name: '', plate: '', type: 'carro' });
  };

  return (
    <div className="space-y-10">
      {/* Título */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🚘 Registrar Vehículo</h2>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4 max-w-lg"
      >
        <input
          type="text"
          placeholder="Nombre del propietario"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          placeholder="Placa"
          value={form.plate}
          onChange={(e) => setForm({ ...form, plate: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
          <option value="bicicleta">Bicicleta</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Registrar
        </button>
      </form>

      {/* Lista de vehículos */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🧾 Vehículos Registrados</h3>
        {vehicles.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No hay vehículos aún.</p>
        ) : (
          <ul className="space-y-4">
            {vehicles.map((v) => (
              <li
                key={v.id}
                className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-between items-center"
              >
                <div>
                  <span className="block font-medium text-lg text-gray-800 dark:text-white">{v.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {v.plate} • {v.type}
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
