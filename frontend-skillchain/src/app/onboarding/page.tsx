"use client";
import { useState, useRef } from "react";
import { Cpu, Users, Palette, BarChart2, BookOpen, Award, FolderOpen, UserCheck, Briefcase, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import StellarSdk from "@stellar/stellar-sdk";
import { SorobanRpc, nativeToScVal, TransactionBuilder, BASE_FEE, Operation, Transaction } from "@stellar/stellar-sdk";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
import { useWalletKit } from "@/context/WalletContext";
import * as SkillHub from "@/packages/skillhub/dist/index.js";

const SKILLHUB_CONTRACT_ID = "CBD5QYDRAFFB2SP2TTPANVX44EHLNHXZOKUIOFMTITQKRVC3N54WP2NK";
const SOROBAN_RPC = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

const steps = [
  {
    title: "What skills do you want to certify?",
    options: [
      { key: "technical", label: "Technical Skills", icon: <Cpu className="w-8 h-8" /> },
      { key: "soft", label: "Soft Skills", icon: <Users className="w-8 h-8" /> },
      { key: "creative", label: "Creative Skills", icon: <Palette className="w-8 h-8" /> },
    ],
  },
  {
    title: "What is your experience level?",
    options: [
      { key: "beginner", label: "Beginner", icon: <Star className="w-8 h-8" /> },
      { key: "intermediate", label: "Intermediate", icon: <BarChart2 className="w-8 h-8" /> },
      { key: "advanced", label: "Advanced", icon: <Award className="w-8 h-8" /> },
    ],
  },
  {
    title: "What evidence can you provide?",
    options: [
      { key: "portfolio", label: "Portfolio", icon: <FolderOpen className="w-8 h-8" /> },
      { key: "microprojects", label: "Microprojects", icon: <BookOpen className="w-8 h-8" /> },
      { key: "peerreview", label: "Peer Review", icon: <UserCheck className="w-8 h-8" /> },
    ],
  },
  {
    title: "What is your main goal?",
    options: [
      { key: "job", label: "Get a Job", icon: <Briefcase className="w-8 h-8" /> },
      { key: "recognition", label: "Recognition", icon: <Award className="w-8 h-8" /> },
      { key: "learning", label: "Learning", icon: <BookOpen className="w-8 h-8" /> },
      { key: "other", label: "Other", icon: <Users className="w-8 h-8" /> },
    ],
  },
];

const roleCategories = [
  {
    label: "User",
    description: "Certify your skills, upload evidence, and build your reputation.",
    roles: [
      { key: "user", label: "User", desc: "Get certifications and showcase your talent." },
      { key: "student", label: "Student", desc: "Learn and validate your knowledge." },
      { key: "learner", label: "Learner", desc: "Develop new skills and grow professionally." },
      { key: "talent", label: "Talent", desc: "Stand out with your skills in the community." },
    ],
  },
  {
    label: "Validator",
    description: "Validate and certify others' skills, boost trust in the network.",
    roles: [
      { key: "validator", label: "Validator", desc: "Review and validate other users' skills." },
      { key: "reviewer", label: "Reviewer", desc: "Evaluate evidence and contribute to quality." },
      { key: "certifier", label: "Certifier", desc: "Grant official certifications." },
      { key: "expert", label: "Expert", desc: "Share your expertise and mentorship." },
    ],
  },
];

async function registerUserRoleWithKit(kit: StellarWalletsKit, address: string, role: string) {
  try {
    // 1. Prepara los argumentos serializados
    const args = [
      nativeToScVal(address, { type: "address" }),
      nativeToScVal(role, { type: "symbol" })
    ];
    // 2. Prepara la transacción
    const server = new SorobanRpc.Server(SOROBAN_RPC, { allowHttp: true });
    const sourceAccount = await server.getAccount(address);
    const tx = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(Operation.invokeContractFunction({
        contract: SKILLHUB_CONTRACT_ID,
        function: "register_user",
        args,
      }))
      .setTimeout(60)
      .build();
    // 3. Simula la transacción
    await server.simulateTransaction(tx);
    // 4. Firma la transacción con la wallet conectada
    const { signedTxXdr } = await kit.signTransaction(tx.toXDR(), {
      address,
      networkPassphrase: NETWORK_PASSPHRASE,
    });
    // 5. Reconstruye la transacción desde el XDR firmado
    const signedTx = new Transaction(signedTxXdr, NETWORK_PASSPHRASE);
    // 6. Envía la transacción a la red
    const response = await server.sendTransaction(signedTx);
    console.log("Registro exitoso:", response);
    return response;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(steps.length).fill(null));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [registering, setRegistering] = useState(false);
  const { kit, address, kitReady } = useWalletKit();
  const router = useRouter();

  const current = steps[step];
  const selected = answers[step];

  const handleSelect = (key: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[step] = key;
      return copy;
    });
  };

  const handleNext = async () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else if (step === steps.length) {
      // Paso de roles
      if (!kitReady || !address || !kit) {
        alert("Conecta tu wallet para continuar");
        return;
      }
      setRegistering(true);
      try {
        for (const role of selectedRoles) {
          await registerUserRoleWithKit(kit, address, role);
        }
        router.push("/home");
      } catch (err) {
        alert("Error registrando roles: " + err);
      }
      setRegistering(false);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans px-2 sm:px-0" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-6 sm:p-8 w-full max-w-md flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        {step < steps.length && (
          <>
            {/* Header y progreso */}
            <div className="w-full flex items-center justify-between mb-4">
              <button onClick={handleBack} disabled={step === 0} className={`text-xl ${step === 0 ? "text-white/20" : "text-white/60 hover:text-white"}`}>←</button>
              <span className="text-sm text-white/60">{step + 1}/{steps.length}</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded mb-6">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            {/* Título */}
            <h2 className="text-lg sm:text-xl font-bold mb-6 text-center text-white">{current.title}</h2>
            {/* Opciones */}
            <div className={`grid gap-4 w-full mb-8 ${current.options.length > 3 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
              {current.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 sm:p-6 transition-all h-28 sm:h-32 w-full shadow-lg
                    ${selected === opt.key ? "border-purple-500 bg-gradient-to-br from-purple-700 to-blue-700 text-white scale-105" : "border-white/20 bg-white/10 text-white/80 hover:border-purple-400 hover:scale-105"}`}
                >
                  <span className="mb-2">{opt.icon}</span>
                  <span className={`font-semibold text-sm sm:text-base ${selected === opt.key ? "text-white" : "text-white/80"}`}>{opt.label}</span>
                  {selected === opt.key && (
                    <span className="mt-2 text-purple-200 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            {/* Botones */}
            <div className="flex w-full gap-4">
              <button onClick={handleSkip} className="flex-1 bg-white/10 text-white/70 py-3 rounded-lg font-semibold hover:bg-white/20 transition text-sm sm:text-base">Skip</button>
              <button
                onClick={handleNext}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${selected ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600" : "bg-white/10 text-white/40 cursor-not-allowed"}`}
                disabled={!selected}
              >
                {step === steps.length - 1 ? "Next" : "Next"}
              </button>
            </div>
          </>
        )}
        {step === steps.length && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center text-white">How do you want to participate in SkillChain?</h2>
            <p className="text-white/70 text-center mb-6">You can choose one or more roles from a single category according to your profile and interests.</p>
            {/* Ya no mostramos botón de conectar wallet, solo la wallet conectada */}
            {kitReady && address && (
              <div className="w-full mb-4 bg-white/20 rounded p-3 text-center">
                <span className="text-white/80 text-sm">Wallet conectada:</span>
                <div className="font-mono text-purple-200 break-all">{address}</div>
              </div>
            )}
            <div className="w-full mb-6 flex gap-4 justify-center">
              {roleCategories.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setSelectedCategory(cat.label);
                    setSelectedRoles([]);
                  }}
                  className={`px-6 py-2 rounded-full border-2 font-bold text-lg transition-all ${selectedCategory === cat.label ? "border-purple-500 bg-gradient-to-br from-purple-700 to-blue-700 text-white scale-105" : "border-white/20 bg-white/10 text-white/80 hover:border-purple-400 hover:scale-105"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {selectedCategory && (
              <div className="w-full mb-6">
                {roleCategories.filter(cat => cat.label === selectedCategory).map(cat => (
                  <div key={cat.label} className="mb-6">
                    <div className="text-white/50 text-sm mb-2">{cat.description}</div>
                    <div className="flex flex-wrap gap-2">
                      {cat.roles.map(role => (
                        <button
                          key={role.key}
                          onClick={() => setSelectedRoles(prev => prev.includes(role.key) ? prev.filter(r => r !== role.key) : [...prev, role.key])}
                          className={`px-4 py-2 rounded-full border-2 font-semibold transition-all relative group ${selectedRoles.includes(role.key) ? "border-purple-500 bg-gradient-to-br from-purple-700 to-blue-700 text-white scale-105" : "border-white/20 bg-white/10 text-white/80 hover:border-purple-400 hover:scale-105"}`}
                        >
                          {role.label}
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] w-max bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-all">
                            {role.desc}
                          </span>
                          {selectedRoles.includes(role.key) && (
                            <span className="ml-2 text-purple-200 font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleNext}
              className={`w-full py-3 rounded-lg font-semibold transition-all text-base ${(selectedRoles.length > 0 && selectedCategory && kitReady) ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600" : "bg-white/10 text-white/40 cursor-not-allowed"}`}
              disabled={registering || !selectedCategory || selectedRoles.length === 0 || !kitReady}
            >
              {registering ? "Registrando..." : "Finalizar"}
            </button>
          </>
        )}
      </div>
    </main>
  );
} 