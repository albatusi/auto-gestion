'use client';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => void;
}

export interface Vehicle {
  id: number;
  name: string;
  plate: string;
  type: string;
}

export default function VehicleModal({ isOpen, onClose, onSave }: Props) {
  const [form, setForm] = useState<Partial<Vehicle>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.plate && form.type) {
      onSave({ id: Date.now(), ...(form as Vehicle) });
      setForm({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Registrar Vehículo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Nombre del dueño"
            value={form.name || ''}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="plate"
            type="text"
            placeholder="Placa"
            value={form.plate || ''}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="type"
            value={form.type || ''}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Tipo de vehículo</option>
            <option value="Carro">Carro</option>
            <option value="Moto">Moto</option>
            <option value="Bicicleta">Bicicleta</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
