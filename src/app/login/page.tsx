'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('No hay usuarios registrados.');
      return;
    }

    const user = JSON.parse(userData);
    if (form.email === user.email && form.password === user.password) {
      localStorage.setItem('loggedIn', 'true');
      alert('Inicio de sesión exitoso.');
      router.push('/dashboard');
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            icon={<FaEnvelope />}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          <InputField
            icon={<FaLock />}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          ¿No tienes cuenta?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, name, value, onChange, placeholder, type = 'text' }: any) {
  return (
    <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
      <div className="text-blue-500">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-black dark:text-white"
        required
      />
    </div>
  );
}
