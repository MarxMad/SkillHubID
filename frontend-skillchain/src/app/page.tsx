"use client";
import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";
import StellarSdk from "@stellar/stellar-sdk";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";
import { useWalletKit } from "@/context/WalletContext";

export default function Welcome() {
  const { address, kit, kitReady, connectWallet } = useWalletKit();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address && kitReady) {
        setLoading(true);
        try {
          const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
          const account = await server.loadAccount(address);
          const nativeBalance = account.balances.find((b: any) => b.asset_type === "native");
          setBalance(nativeBalance ? nativeBalance.balance : "0");
        } catch (err) {
          setBalance(null);
        }
        setLoading(false);
      }
    };
    fetchBalance();
  }, [address, kitReady]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans px-2 sm:px-0" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-6 sm:p-10 flex flex-col items-center w-full max-w-md shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <div className="flex flex-col items-center gap-3 mb-6">
          <img src="/Logo.png" alt="SkillsHubID Logo" className="w-24 h-24 rounded" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-center drop-shadow-lg" style={{ color: 'var(--color-accent-secondary)' }}>Empower Your Skills</h1>
        <h2 className="text-base sm:text-lg font-medium mb-8 text-center" style={{ color: 'var(--foreground)' }}>Certifica tu talento y hazlo visible al mundo con SkillsHubID</h2>
        {!address ? (
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition mb-2 w-full"
            disabled={loading}
          >
            {loading ? "Conectando..." : "Conectar Wallet Stellar"}
          </button>
        ) : (
          <>
            <div className="bg-white/20 rounded p-4 mb-4 w-full text-center">
              <p className="text-white/80 text-sm">Wallet conectada:</p>
              <p className="font-mono text-purple-200 break-all">{address}</p>
              <p className="text-white/80 text-sm mt-2">Balance XLM: {loading ? "Cargando..." : balance + " XLM"}</p>
            </div>
            <a
              href="/onboarding"
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition w-full text-center block"
            >
              Continuar
            </a>
          </>
        )}
      </div>
    </main>
  );
}
