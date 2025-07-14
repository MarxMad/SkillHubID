"use client";
import { usePathname } from "next/navigation";
import { User, Layers, BarChart2, Users, CheckCircle, Edit2, Star, Award } from "lucide-react";
import React from "react";
import { supabase } from "@/lib/supabaseClient";
import FreighterApi from "@stellar/freighter-api";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

function useUserCertificates(owner: string) {
  const [certs, setCerts] = useState<any[]>([]);
  useEffect(() => {
    if (!owner) return;
    supabase
      .from("certificates")
      .select("*")
      .eq("owner", owner)
      .then(({ data }) => setCerts(data || []));
  }, [owner]);
  return certs;
}

export default function Profile() {
  const pathname = usePathname();
  const [owner, setOwner] = useState("");
  useEffect(() => {
    FreighterApi.isConnected().then(async (ok) => {
      if (ok) {
        const { address } = await FreighterApi.getAddress();
        setOwner(address);
      }
    });
  }, []);
  const certs = useUserCertificates(owner);
  return (
    <main className="flex flex-col min-h-screen w-full font-sans" style={{ background: 'var(--background)' }}>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="rounded-none sm:rounded-2xl p-4 sm:p-8 w-full min-h-[80vh] flex flex-col items-center justify-between pb-28 sm:pb-32 shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
          {/* Header Dashboard */}
          <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-2 border-4 border-purple-500">
              {/* Aquí iría la imagen subida */}
              <User className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Taylor Smith</h1>
            <span className="text-white/70 text-base mb-2">Full Stack Developer</span>
            <div className="flex gap-2 mb-2">
              <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Blockchain</span>
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">Web3</span>
              <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">React</span>
            </div>
            <div className="w-full max-w-xs bg-white/20 rounded h-3 mt-2">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded" style={{ width: '80%' }} />
            </div>
            <span className="text-xs text-white/60 mt-1 mb-2">80% perfil completo</span>
            <a href="/profile/edit" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition text-sm mt-2"><Edit2 className="w-4 h-4" /> Editar perfil</a>
          </div>
          {/* Secciones Dashboard */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 rounded-xl p-4 text-white/80 flex flex-col">
              <h2 className="font-bold text-lg mb-2 text-white flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" />Certificaciones</h2>
              {certs.map(cert => (
                <div key={cert.token_id} className="bg-white/10 rounded-xl p-4 mb-2 text-white/80">
                  <h3 className="font-bold text-lg text-white">{cert.json_data.skill}</h3>
                  <p>{cert.json_data.name} - {cert.json_data.date}</p>
                  <p>Issuer: {cert.json_data.issuer}</p>
                  <p>Token ID: {cert.token_id}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-white/80 flex flex-col">
              <h2 className="font-bold text-lg mb-2 text-white flex items-center gap-2"><Star className="w-5 h-5 text-yellow-300" />Skills</h2>
              <ul className="list-disc list-inside">
                <li>Solidity, Soroban, React</li>
                <li>Smart Contracts</li>
                <li>Desarrollo Full Stack</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
} 