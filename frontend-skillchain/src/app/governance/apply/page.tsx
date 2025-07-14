"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AREAS = [
  "Desarrollo Web",
  "Blockchain",
  "Data Science",
  "DevOps"
];

export default function ApplyCertification() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    area: "",
    descripcion: "",
    experiencia: "",
    habilidades: "",
    habilidadesBlandas: "",
    proyectos: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    evidencia: null as File | null,
    evidenciaLink: "",
    motivacion: "",
    metas: "",
    disponibilidad: "",
    referencias: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.area || !form.descripcion || !form.motivacion) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => router.push("/governance"), 2000);
  };

  return (
    <main className="flex flex-col min-h-screen w-full font-sans items-center justify-center pb-32" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 w-full max-w-2xl flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Postulación para Certificación</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="nombre" placeholder="Nombre completo*" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.nombre} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico*" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.email} onChange={handleChange} required />
            <select name="area" className="rounded-lg px-3 py-2 bg-white/20 text-white outline-none" value={form.area} onChange={handleChange} required>
              <option value="">Selecciona un área*</option>
              {AREAS.map((area) => (<option key={area} value={area}>{area}</option>))}
            </select>
            <input type="text" name="disponibilidad" placeholder="Disponibilidad horaria (ej: tardes, fines de semana)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.disponibilidad} onChange={handleChange} />
            <input type="text" name="github" placeholder="GitHub (enlace)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.github} onChange={handleChange} />
            <input type="text" name="linkedin" placeholder="LinkedIn (enlace)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.linkedin} onChange={handleChange} />
            <input type="text" name="twitter" placeholder="Twitter/X (enlace)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.twitter} onChange={handleChange} />
            <input type="text" name="website" placeholder="Sitio web/portafolio" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.website} onChange={handleChange} />
          </div>
          <textarea name="descripcion" placeholder="¿Por qué quieres certificarte en esta área?*" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[60px]" value={form.descripcion} onChange={handleChange} required />
          <textarea name="motivacion" placeholder="¿Qué te motiva a seguir aprendiendo y creciendo en esta área?*" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[60px]" value={form.motivacion} onChange={handleChange} required />
          <textarea name="metas" placeholder="¿Cuáles son tus metas profesionales a corto y largo plazo?" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[60px]" value={form.metas} onChange={handleChange} />
          <textarea name="experiencia" placeholder="Describe tu experiencia relevante (proyectos, trabajos, voluntariado, etc.)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[60px]" value={form.experiencia} onChange={handleChange} />
          <textarea name="proyectos" placeholder="Proyectos destacados (describe y/o enlaza)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[60px]" value={form.proyectos} onChange={handleChange} />
          <textarea name="habilidades" placeholder="Habilidades técnicas principales (separadas por coma)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[40px]" value={form.habilidades} onChange={handleChange} />
          <textarea name="habilidadesBlandas" placeholder="Habilidades blandas (comunicación, liderazgo, trabajo en equipo, etc.)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[40px]" value={form.habilidadesBlandas} onChange={handleChange} />
          <input type="text" name="evidenciaLink" placeholder="Enlace a evidencia (Google Drive, Notion, etc.)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none" value={form.evidenciaLink} onChange={handleChange} />
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm">Sube un archivo de evidencia (PDF, imagen, ZIP, etc.)</label>
            <input type="file" name="evidencia" accept=".pdf,.jpg,.jpeg,.png,.zip,.rar,.doc,.docx" className="rounded-lg px-3 py-2 bg-white/20 text-white outline-none" onChange={handleChange} />
          </div>
          <textarea name="referencias" placeholder="Referencias o contactos profesionales (opcional)" className="rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none min-h-[40px]" value={form.referencias} onChange={handleChange} />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {success && <div className="text-green-400 text-sm">¡Postulación enviada! Redirigiendo...</div>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition mt-2">Enviar postulación</button>
        </form>
        <button className="mt-4 text-white/70 underline hover:text-white text-sm" onClick={() => router.push("/governance")}>Volver a la lista de candidatos</button>
      </div>
    </main>
  );
} 