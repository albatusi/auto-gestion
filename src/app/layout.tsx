// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AutoTrack AI',
  description: 'Sistema inteligente de gestión vehicular',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
