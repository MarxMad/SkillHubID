export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <h1 className="text-2xl font-bold mb-4 text-white">¡Estás certificado!</h1>
        <p className="text-gray-600 text-white">Tu credencial ha sido emitida exitosamente en la blockchain.</p>
        <img src="/certificado.jpeg" alt="Certificado" className="mt-6 rounded-xl shadow-lg w-full max-w-xs border border-white/10" />
      </div>
    </main>
  );
} 