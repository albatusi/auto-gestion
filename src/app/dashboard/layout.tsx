'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/dashboard' },
    { name: 'Resumen', path: '/dashboard/summary' },
    { name: 'Vehículos', path: '/dashboard/vehicles' },
    { name: 'Movimientos', path: '/dashboard/movements' },
    { name: 'Perfil', path: '/dashboard/profile' },
    { name: 'Configuracion', path: '/dashboard/configuracion' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bg-blue-700 text-white w-64 h-full p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50`}>
        <h2 className="text-2xl font-bold mb-6">AutoTrack AI</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded hover:bg-blue-600 transition ${pathname === item.path ? 'bg-blue-600' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 ml-0">
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4 z-10">
          <button onClick={toggleSidebar} className="text-blue-700 dark:text-blue-400 text-2xl">
            ☰
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('loggedIn');
              window.location.href = '/login';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
