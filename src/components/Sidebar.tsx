import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Inicio', path: '/dashboard' },
    { name: 'Resumen', path: '/dashboard/summary' },
    { name: 'Vehículos', path: '/dashboard/vehicles' },
    { name: 'Movimientos', path: '/dashboard/movements' },
    { name: 'Perfil', path: '/dashboard/profile' },
  ];

  return (
    <div className="bg-blue-700 text-white w-64 p-6 space-y-6">
      <h2 className="text-2xl font-bold">AutoTrack AI</h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-3 py-2 rounded hover:bg-blue-600 transition ${pathname === item.path ? 'bg-blue-600' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
