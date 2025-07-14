"use client";

import { useWalletKit } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import StellarSdk from "@stellar/stellar-sdk";

function shortenAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function WalletStatus() {
  const { address, kitReady, connectWallet, disconnectWallet } = useWalletKit();
  const [balance, setBalance] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address && kitReady) {
        try {
          const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
          const account = await server.loadAccount(address);
          const nativeBalance = account.balances.find((b: any) => b.asset_type === "native");
          setBalance(nativeBalance ? nativeBalance.balance : "0");
        } catch {
          setBalance(null);
        }
      }
    };
    fetchBalance();
  }, [address, kitReady]);

  if (!address) {
    return (
      <button
        onClick={connectWallet}
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition"
      >
        Conectar Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full font-mono text-white/90 hover:bg-white/20 transition"
        onClick={() => setShowModal(true)}
      >
        <span className="bg-purple-700 rounded-full w-4 h-4 flex items-center justify-center text-xs">🌙</span>
        <span className="text-sm font-semibold">Testnet</span>
        <span className="bg-white/20 px-2 py-1 rounded font-mono">{shortenAddress(address)}</span>
        <span className="text-xs text-white/80">{balance ? `${balance} XLM` : "..."}</span>
      </button>
      {showModal && (
        <div className="absolute right-0 mt-2 bg-gray-900 border border-white/20 rounded-xl shadow-xl p-6 z-50 min-w-[320px]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold text-white mb-2">Wallet conectada</span>
            <span className="font-mono text-purple-200 break-all text-sm">{address}</span>
            <span className="text-white/80 text-sm mt-2">Balance XLM: {balance ? balance : "..."}</span>
            <button
              className="mt-3 px-4 py-2 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copiar address
            </button>
            <button
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              onClick={() => {
                disconnectWallet();
                setShowModal(false);
              }}
            >
              Desconectar wallet
            </button>
            <button
              className="mt-2 text-white/60 text-xs underline"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 