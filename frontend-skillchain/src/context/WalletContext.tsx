"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

type WalletContextType = {
  kit: StellarWalletsKit | null;
  address: string | null;
  kitReady: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType>({
  kit: null,
  address: null,
  kitReady: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [kitReady, setKitReady] = useState(false);
  const kitRef = useRef<StellarWalletsKit | null>(null);

  useEffect(() => {
    if (!kitRef.current) {
      kitRef.current = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        modules: allowAllModules(),
      });
    }
    // Restaurar sesión si existe
    const restoreSession = async () => {
      const savedWalletId = typeof window !== "undefined" ? localStorage.getItem("walletId") : null;
      if (savedWalletId && kitRef.current) {
        await kitRef.current.setWallet(savedWalletId);
        const { address } = await kitRef.current.getAddress();
        setAddress(address);
        setKitReady(true);
      }
    };
    restoreSession();
  }, []);

  const connectWallet = async () => {
    if (!kitRef.current) return;
    await kitRef.current.openModal({
      onWalletSelected: async (option) => {
        kitRef.current!.setWallet(option.id);
        localStorage.setItem("walletId", option.id); // Guarda el walletId
        const { address } = await kitRef.current!.getAddress();
        setAddress(address);
        setKitReady(true);
      },
    });
  };

  const disconnectWallet = () => {
    setAddress(null);
    setKitReady(false);
    localStorage.removeItem("walletId");
    // Si el kit soporta método de desconexión, llamarlo aquí
  };

  return (
    <WalletContext.Provider value={{ kit: kitRef.current, address, kitReady, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletKit() {
  return useContext(WalletContext);
} 