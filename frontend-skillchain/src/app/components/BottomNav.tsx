"use client";
import { usePathname } from "next/navigation";
import { Layers, BarChart2, Users, User } from "lucide-react";

const navItems = [
  { href: "/home", icon: <Layers className="w-6 h-6 mb-1" />, label: "Home" },
  { href: "/governance", icon: <Users className="w-6 h-6 mb-1" />, label: "Governance" },
  { href: "/profile", icon: <User className="w-6 h-6 mb-1" />, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-center items-end z-20">
      <div className="w-full max-w-5xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md border-t border-white/20 px-4 sm:px-8 py-2 sm:py-3 rounded-t-2xl shadow-2xl">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center transition ${pathname === item.href ? "text-white font-bold" : "text-white/80 hover:text-white"}`}
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </nav>
  );
} 