'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const t = useTranslations('sidebar');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t('home'), path: `/${locale}/dashboard` },
    { name: t('summary'), path: `/${locale}/dashboard/summary` },
    { name: t('vehicles'), path: `/${locale}/dashboard/vehicles` },
    { name: t('movements'), path: `/${locale}/dashboard/movements` },
    { name: t('profile'), path: `/${locale}/profile` },
    { name: t('settings'), path: `/${locale}/configuration` }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        ☰
      </button>

      <div className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 p-6 space-y-6 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded hover:bg-blue-600 transition ${pathname === item.path ? 'bg-blue-600' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
