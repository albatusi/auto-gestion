"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/" className="font-bold text-blue-600">AutoTrack AI</Link>

        {isLoggedIn && pathname.startsWith("/dashboard") && (
          <>
            <Link href="/dashboard" className="hover:underline">Resumen</Link>
            <Link href="/dashboard/vehicles" className="hover:underline">Vehículos</Link>
            <Link href="/dashboard/movements" className="hover:underline">Movimientos</Link>
          </>
        )}
      </div>

      {isLoggedIn && pathname.startsWith("/dashboard") && (
        <button onClick={logout} className="text-sm text-red-600 hover:underline">
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
