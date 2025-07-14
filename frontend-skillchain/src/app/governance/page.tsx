"use client";
import { useState } from "react";
import { User, Star, CheckCircle, XCircle, Heart } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useRouter } from "next/navigation";

const hardcodedCandidates = [
  {
    id: "1",
    name: "Alex Smith",
    skill: "React Developer",
    progress: 85,
    level: 3, // 1: beginner, 2: intermediate, 3: advanced
    votes: 12,
    upvotes: 9,
    downvotes: 3,
    likes: 3,
    comments: ["Great portfolio!", "Needs more evidence."],
  },
  {
    id: "2",
    name: "Sara Lee",
    skill: "Blockchain Expert",
    progress: 60,
    level: 2,
    votes: 5,
    upvotes: 3,
    downvotes: 2,
    likes: 1,
    comments: [],
  },
  {
    id: "3",
    name: "Chris Kim",
    skill: "Data Analyst",
    progress: 95,
    level: 3,
    votes: 20,
    upvotes: 18,
    downvotes: 2,
    likes: 7,
    comments: ["Impressive!"],
  },
  // Nuevo postulante 1
  {
    id: "4",
    name: "Lucía González",
    skill: "UX/UI Designer",
    progress: 75,
    level: 2,
    votes: 8,
    upvotes: 6,
    downvotes: 2,
    likes: 4,
    comments: ["Buen sentido estético.", "Podría mejorar la accesibilidad."],
  },
  // Nuevo postulante 2
  {
    id: "5",
    name: "Miguel Torres",
    skill: "DevOps Engineer",
    progress: 65,
    level: 2,
    votes: 6,
    upvotes: 4,
    downvotes: 2,
    likes: 2,
    comments: ["Experiencia sólida en CI/CD."],
  },
];

export default function Governance() {
  const [candidates, setCandidates] = useState(hardcodedCandidates);
  const [likeState, setLikeState] = useState<{ [id: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [id: string]: string }>({});
  const router = useRouter();

  const handleVote = (id: string, upvote: boolean) => {
    alert(`Vote for candidate ${id}: ${upvote ? "Approve" : "Reject"}`);
  };

  const handleLike = (id: string) => {
    setLikeState((prev) => ({ ...prev, [id]: !prev[id] }));
    setCandidates((prevCandidates) =>
      prevCandidates.map((c) => {
        // Usar el estado actual de likeState para determinar si sumar o restar
        const isLiked = likeState[id] || false;
        return c.id === id
          ? { ...c, likes: isLiked ? c.likes - 1 : c.likes + 1 }
          : c;
      })
    );
  };

  const handleCommentChange = (id: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddComment = (id: string) => {
    const comment = commentInputs[id]?.trim();
    if (!comment) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, comments: [...c.comments, comment] } : c
      )
    );
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <main className="flex flex-col min-h-screen w-full font-sans items-center justify-center pb-32" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 w-full max-w-full flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-7 h-7" /> Governance: Certify Candidates
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            onClick={() => router.push("/governance/apply")}
          >
            Postularme para una certificación
          </button>
        </div>
        <div className="w-full flex flex-col gap-6">
          {/* Tarjeta especial de votación propia */}
          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-lg mb-4">
            <div className="flex flex-col items-center w-32">
              <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-yellow-900" />
              </div>
              <span className="font-bold text-yellow-200 text-lg text-center">¡Felicidades!</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-white text-lg font-semibold">Has sido seleccionado por la comunidad para certificarte como <span className="text-yellow-300 font-bold">Programador de Rust</span>.</span>
              <span className="text-yellow-100 text-sm mb-2">¡Da el siguiente paso y obtén tu certificado oficial!</span>
              <button
                className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition w-fit"
                onClick={() => router.push("/certifications/mint")}
              >
                Obtener Certificado
              </button>
            </div>
          </div>
          {candidates.map((cand) => (
            <div key={cand.id} className="bg-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
              <div className="flex flex-col items-center w-32">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <User className="w-10 h-10 text-purple-400" />
                </div>
                <span className="font-bold text-white text-lg text-center">{cand.name}</span>
                <span className="text-xs text-white/60 text-center">{cand.skill}</span>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(cand.level)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300" />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-1 mt-1">
                  <span className="text-xs text-white/60">Votes:</span>
                  <span className="text-white/80 font-bold">{cand.votes}</span>
                  <span className="text-xs text-green-400">+{cand.upvotes} Approve</span>
                  <span className="text-xs text-red-400">-{cand.downvotes} Reject</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-1 px-2 py-1 rounded-full transition ${likeState[cand.id] ? "bg-pink-600 text-white" : "bg-white/20 text-pink-400 hover:bg-pink-600 hover:text-white"}`}
                    onClick={() => handleLike(cand.id)}
                  >
                    <Heart className={`w-5 h-5 ${likeState[cand.id] ? "fill-current" : ""}`} />
                    <span>{cand.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-semibold transition" onClick={() => handleVote(cand.id, true)}>
                    <CheckCircle className="w-5 h-5" /> Approve
                  </button>
                  <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-semibold transition" onClick={() => handleVote(cand.id, false)}>
                    <XCircle className="w-5 h-5" /> Reject
                  </button>
                  <button className="ml-auto bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg font-semibold transition" onClick={() => router.push(`/governance/candidate/${cand.id}`)}>
                    View Details
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 rounded-lg px-3 py-2 bg-white/20 text-white placeholder-white/60 outline-none"
                      value={commentInputs[cand.id] || ""}
                      onChange={e => handleCommentChange(cand.id, e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleAddComment(cand.id); }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-semibold transition"
                      onClick={() => handleAddComment(cand.id)}
                      type="button"
                    >
                      Comment
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {cand.comments.map((cmt, i) => (
                      <div key={i} className="text-xs text-white/80 bg-white/10 rounded px-2 py-1 w-fit max-w-full break-words">{cmt}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
} 