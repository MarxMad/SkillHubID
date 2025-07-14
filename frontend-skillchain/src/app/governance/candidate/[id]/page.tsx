"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { User, Star, ArrowLeft } from "lucide-react";

const hardcodedCandidates = [
  {
    id: "1",
    name: "Alex Smith",
    skill: "React Developer",
    progress: 85,
    level: 3,
    votes: 12,
    upvotes: 9,
    downvotes: 3,
    likes: 3,
    comments: ["Great portfolio!", "Needs more evidence."],
    // Ejemplo de campos extendidos:
    area: "Desarrollo Web",
    descripcion: "Apasionado por el frontend y la experiencia de usuario.",
    motivacion: "Quiero contribuir a proyectos open source.",
    experiencia: "3 años en startups tech.",
    habilidades: "React, Next.js, TypeScript",
    habilidadesBlandas: "Trabajo en equipo, comunicación",
    proyectos: "https://github.com/alexsmith/react-portfolio",
    github: "https://github.com/alexsmith",
    linkedin: "https://linkedin.com/in/alexsmith",
    twitter: "https://twitter.com/alexsmith",
    website: "https://alexsmith.dev",
    evidenciaLink: "https://drive.google.com/evidencia-alex",
    referencias: "María Pérez (ex-jefa)",
    disponibilidad: "Tardes y fines de semana"
  },
  // ...agrega aquí los otros candidatos con campos extendidos si lo deseas
];

export default function CandidateDetails() {
  const params = useParams();
  const router = useRouter();
  const candidate = useMemo(() => hardcodedCandidates.find(c => c.id === params.id), [params.id]);

  if (!candidate) {
    return (
      <main className="flex flex-col min-h-screen w-full font-sans items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-white text-xl">Candidato no encontrado</div>
        <button className="mt-4 text-white/70 underline hover:text-white text-sm" onClick={() => router.push('/governance')}>Volver</button>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-sans items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 w-full max-w-xl flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <button className="self-start flex items-center gap-2 text-white/70 hover:text-white mb-2" onClick={() => router.push('/governance')}>
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
        <div className="flex flex-col sm:flex-row w-full gap-8 items-center">
          <div className="flex flex-col items-center w-40">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <User className="w-16 h-16 text-purple-400" />
            </div>
            <span className="font-bold text-white text-xl text-center">{candidate.name}</span>
            <span className="text-xs text-white/60 text-center">{candidate.skill}</span>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(candidate.level)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-300" />
              ))}
            </div>
            <span className="text-xs text-white/60 mt-2">Área: {candidate.area}</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Motivación:</span>
                <div className="text-white/80">{candidate.motivacion}</div>
              </div>
              <div>
                <span className="font-semibold">Disponibilidad:</span>
                <div className="text-white/80">{candidate.disponibilidad}</div>
              </div>
              <div>
                <span className="font-semibold">Descripción:</span>
                <div className="text-white/80">{candidate.descripcion}</div>
              </div>
              <div>
                <span className="font-semibold">Experiencia:</span>
                <div className="text-white/80">{candidate.experiencia}</div>
              </div>
              <div>
                <span className="font-semibold">Habilidades técnicas:</span>
                <div className="text-white/80">{candidate.habilidades}</div>
              </div>
              <div>
                <span className="font-semibold">Habilidades blandas:</span>
                <div className="text-white/80">{candidate.habilidadesBlandas}</div>
              </div>
              <div>
                <span className="font-semibold">Proyectos:</span>
                <a href={candidate.proyectos} target="_blank" className="text-blue-400 underline break-all">{candidate.proyectos}</a>
              </div>
              <div>
                <span className="font-semibold">Referencias:</span>
                <div className="text-white/80">{candidate.referencias}</div>
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-4 flex-wrap">
              {candidate.github && <a href={candidate.github} target="_blank" className="text-blue-400 underline">GitHub</a>}
              {candidate.linkedin && <a href={candidate.linkedin} target="_blank" className="text-blue-400 underline">LinkedIn</a>}
              {candidate.twitter && <a href={candidate.twitter} target="_blank" className="text-blue-400 underline">Twitter/X</a>}
              {candidate.website && <a href={candidate.website} target="_blank" className="text-blue-400 underline">Sitio web</a>}
              {candidate.evidenciaLink && <a href={candidate.evidenciaLink} target="_blank" className="text-blue-400 underline">Evidencia</a>}
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <span className="font-semibold text-white">Comentarios de la comunidad:</span>
          <div className="flex flex-col gap-2 mt-2">
            {candidate.comments && candidate.comments.length > 0 ? candidate.comments.map((cmt, i) => (
              <div key={i} className="text-xs text-white/80 bg-white/10 rounded px-2 py-1 w-fit max-w-full break-words">{cmt}</div>
            )) : <div className="text-white/50 text-sm">Sin comentarios aún.</div>}
          </div>
        </div>
      </div>
    </main>
  );
} 