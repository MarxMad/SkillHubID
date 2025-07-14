import Link from "next/link";
import { WalletStatus } from "./WalletStatus";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg z-30">
      <div className="flex items-center gap-4">
        <img src="/Logo.png" alt="SkillsHubID Logo" className="w-8 h-8 rounded" />
        <span className="font-bold text-white text-xl">SkillsHubID</span>
        <Link href="/home" className="text-white/80 hover:text-white px-2">Home</Link>
        <Link href="/certifications/mint" className="text-white/80 hover:text-white px-2">Certificaciones</Link>
        <Link href="/governance" className="text-white/80 hover:text-white px-2">Gobernanza</Link>
        <Link href="/profile" className="text-white/80 hover:text-white px-2">Perfil</Link>
      </div>
      <WalletStatus />
    </nav>
  );
} 