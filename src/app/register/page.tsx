'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaUserTag } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    document: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(form));
    alert('Registro exitoso. Ahora inicia sesión.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={<FaUser />} name="name" value={form.name} onChange={handleChange} placeholder="Nombre completo" />
          <InputField icon={<FaIdCard />} name="document" value={form.document} onChange={handleChange} placeholder="Número de documento" />
          
          <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <FaUserTag className="text-blue-500" />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-black dark:text-white"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>

          <InputField icon={<FaEnvelope />} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" />
          <InputField icon={<FaLock />} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
          <InputField icon={<FaLock />} name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          ¿Ya tienes cuenta?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Inicia sesión
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
