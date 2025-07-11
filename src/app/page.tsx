export default function HomePage() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a AutoTrack AI</h1>
      <p className="text-lg mb-6">Control inteligente de entradas y salidas vehiculares</p>
      <a
        href="/login"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </a>
    </section>
  );
}
