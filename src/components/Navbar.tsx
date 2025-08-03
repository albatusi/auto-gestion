'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  return (
    <header className="flex justify-end items-center bg-white dark:bg-gray-800 shadow px-6 py-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Cerrar Sesión
      </button>
    </header>
  );
}
