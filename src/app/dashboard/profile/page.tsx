'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  if (!user) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="max-w-md mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold">Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
