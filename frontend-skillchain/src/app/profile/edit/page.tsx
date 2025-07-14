"use client";
import { useRouter, usePathname } from "next/navigation";
import { User, Upload, Plus, Layers, BarChart2, Users } from "lucide-react";
import React, { useRef } from "react";

export default function EditProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Aquí guardarías los datos (localStorage, backend, etc.)
    router.push("/profile");
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-sans" style={{ background: 'var(--background)' }}>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="rounded-none sm:rounded-2xl p-4 sm:p-8 w-full min-h-[80vh] flex flex-col items-center justify-between pb-28 sm:pb-32 shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Completa tu perfil</h1>
            {/* Foto de perfil */}
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-2 border-4 border-purple-500">
              {/* Aquí iría la imagen subida */}
              <User className="w-16 h-16 text-purple-400" />
              <button type="button" className="absolute bottom-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white" title="Subir foto" onClick={() => fileInputRef.current?.click()}>
                <Plus className="w-4 h-4 text-purple-600" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
            </div>
            <span className="text-white/70 text-base mb-4">Agrega una foto de perfil</span>
            {/* Formulario */}
            <form className="w-full max-w-xl flex flex-col gap-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Nombre completo" className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Años de experiencia" className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" placeholder="Ciudad actual" className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="email" placeholder="Correo de contacto" className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="tel" placeholder="Teléfono móvil" className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-500" />
              {/* Subir documentos de respaldo */}
              <div className="flex flex-col items-center bg-white/10 rounded-xl p-4 mt-2">
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-white/80 mb-2">Sube documentos de respaldo (PDF, imágenes, etc.)</span>
                  <input type="file" multiple className="hidden" />
                </label>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition mt-2 text-base">Guardar perfil</button>
            </form>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-center items-end z-20">
        <div className="w-full max-w-5xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md border-t border-white/20 px-4 sm:px-8 py-2 sm:py-3 rounded-t-2xl shadow-2xl">
          <a href="/home" className="flex flex-col items-center text-white/80 hover:text-white transition">
            <Layers className="w-6 h-6 mb-1" />
          </a>
          <a href="#" className="flex flex-col items-center text-white/80 hover:text-white transition">
            <BarChart2 className="w-6 h-6 mb-1" />
          </a>
          <a href="#" className="flex flex-col items-center text-white/80 hover:text-white transition">
            <Users className="w-6 h-6 mb-1" />
          </a>
          <a href="/profile" className={`flex flex-col items-center transition ${pathname === "/profile" ? "text-white font-bold" : "text-white/80 hover:text-white"}`}>
            <User className="w-6 h-6 mb-1" />
          </a>
        </div>
      </nav>
    </main>
  );
} 