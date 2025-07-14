"use client";
import { Award, BarChart2, Users, User, Layers, BookOpen, Star, Clock, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import BottomNav from "../components/BottomNav";

const topCerts = [
  {
    title: "Blockchain Expert",
    user: "Alex",
    rating: 4.8,
    time: "2h 15m",
    price: "$30",
    image: "/cert1.jpg",
  },
  {
    title: "Data Analyst",
    user: "Jamie",
    rating: 4.7,
    time: "45m",
    price: "$25",
    image: "/cert2.jpg",
  },
];

const skillAreas = [
  { label: "Technology", icon: <Layers className="w-6 h-6" /> },
  { label: "Marketing", icon: <BarChart2 className="w-6 h-6" /> },
  { label: "Design", icon: <BookOpen className="w-6 h-6" /> },
  { label: "Digital", icon: <Award className="w-6 h-6" /> },
];

const myCerts = [
  {
    title: "Certified Web Developer",
    user: "Taylor Smith",
    progress: 85,
    image: "/cert3.jpg",
  },
];

export default function Home() {
  const pathname = usePathname();
  return (
    <main className="flex flex-col min-h-screen w-full font-sans" style={{ background: 'var(--background)' }}>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="rounded-none sm:rounded-2xl p-4 sm:p-8 w-full min-h-[80vh] flex flex-col items-center justify-between pb-28 sm:pb-32 shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 w-full max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </span>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-wide">SkillChain</span>
          </div>
          {/* Top Certifications */}
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 w-full max-w-5xl mx-auto">Top Certifications</h2>
          <div className="flex gap-4 w-full max-w-5xl mx-auto overflow-x-auto pb-2 mb-6">
            {topCerts.map((cert, i) => (
              <div key={i} className="min-w-[180px] sm:min-w-[220px] bg-white/20 rounded-xl shadow-lg p-2 sm:p-3 flex flex-col flex-1">
                <div className="h-20 sm:h-24 w-full rounded-lg bg-gray-200 mb-2 overflow-hidden flex items-center justify-center">
                  {/* Imagen de certificación */}
                  <span className="text-gray-400 text-xs">[Image]</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-purple-300" />
                  <span className="text-xs text-white/80 font-semibold">{cert.user}</span>
                </div>
                <span className="font-bold text-white text-xs sm:text-sm mb-1">{cert.title}</span>
                <div className="flex items-center gap-2 text-xs text-white/70 mb-1">
                  <Clock className="w-4 h-4" /> {cert.time}
                  <Star className="w-4 h-4 text-yellow-300 ml-2" /> {cert.rating}/5
                </div>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded font-bold w-fit">{cert.price}</span>
              </div>
            ))}
          </div>
          {/* Skill Areas */}
          <h2 className="text-base sm:text-lg font-bold text-white mb-3 w-full max-w-5xl mx-auto">Skill Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 w-full max-w-5xl mx-auto mb-6">
            {skillAreas.map((area, i) => (
              <div key={i} className="flex flex-col items-center bg-white/10 rounded-lg p-2 sm:p-3 text-white/80 hover:bg-purple-700 hover:text-white transition cursor-pointer w-full">
                {area.icon}
                <span className="text-xs mt-1 font-semibold">{area.label}</span>
              </div>
            ))}
          </div>
          {/* My Certifications */}
          <h2 className="text-base sm:text-lg font-bold text-white mb-3 w-full max-w-5xl mx-auto">My Certifications</h2>
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-5xl mx-auto mb-4">
            {myCerts.map((cert, i) => (
              <div key={i} className="flex items-center bg-white/20 rounded-xl p-2 sm:p-3 shadow-lg w-full">
                <div className="h-12 sm:h-16 w-12 sm:w-16 rounded-lg bg-gray-200 mr-2 sm:mr-3 flex items-center justify-center overflow-hidden">
                  {/* Imagen de certificación */}
                  <span className="text-gray-400 text-xs">[Image]</span>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-white text-xs sm:text-sm block mb-1">{cert.title}</span>
                  <span className="text-xs text-white/70 block mb-1">{cert.user}</span>
                  <div className="w-full h-2 bg-white/20 rounded">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded" style={{ width: `${cert.progress}%` }} />
                  </div>
                  <span className="text-xs text-white/60">{cert.progress}% complete</span>
                </div>
                <Bookmark className="w-5 h-5 text-white/60 ml-2" />
              </div>
            ))}
          </div>
          <button className="w-full max-w-5xl mx-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition mt-2 text-sm sm:text-base">View all</button>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
} 