export default function Notifications() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
        <p className="text-gray-600">Aquí verás las actualizaciones de validación de skills y credenciales.</p>
      </div>
    </main>
  );
} 