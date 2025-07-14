"use client";
import { useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import BottomNav from "../../components/BottomNav";
import { useWalletKit } from "@/context/WalletContext";
import { Client as SBTClient } from "@/packages/sbtcerfificate/dist/index.js";
import { Buffer } from "buffer";
import { useRouter } from "next/navigation";
import StellarSdk, { SorobanRpc, Transaction } from "@stellar/stellar-sdk";

const CONTRACT_ID = "CCYWIQFYEXRKJUABFYEQJQUJE5TLY3DXZQ4IHZVKVNUJZIWPSAXL4KCK";
const SOROBAN_RPC = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

function randomHex32() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getMetadataHash(certData: object): Promise<string> {
  const json = JSON.stringify(certData);
  const encoder = new TextEncoder();
  const data = encoder.encode(json);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function MintSBT() {
  const [skill, setSkill] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { address, kit, kitReady } = useWalletKit();
  const router = useRouter();

  async function handleMint(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!kitReady || !address || !kit) {
        setLoading(false);
        return;
      }
      // 1. Preparar los datos del certificado
      const certData = {
        name,
        skill,
        date: new Date().toISOString(),
        issuer: "SkillChain"
      };
      // 2. Generar token_id único (32 bytes)
      const token_id = Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
      // 3. Calcular metadata (hash SHA-256 del JSON)
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(certData));
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const metadata = Buffer.from(hashBuffer);
      // 4. Instanciar el cliente del contrato
      const client = new SBTClient({
        contractId: CONTRACT_ID,
        networkPassphrase: NETWORK_PASSPHRASE,
        rpcUrl: SOROBAN_RPC
      });
      // 5. Construir, simular, firmar y enviar la transacción
      const tx = await client.mint({
        to: address,
        token_id,
        metadata
      });
      await tx.simulate();
      // Obtener el XDR de la transacción
      const xdr = tx.toXDR();
      // Firmar la transacción con la wallet
      const { signedTxXdr } = await kit.signTransaction(xdr, {
        address,
        networkPassphrase: NETWORK_PASSPHRASE,
      });
      // Reconstruir la transacción firmada
      const signedTx = new Transaction(signedTxXdr, NETWORK_PASSPHRASE);
      // Enviar la transacción a la red
      const server = new SorobanRpc.Server(SOROBAN_RPC, { allowHttp: true });
      await server.sendTransaction(signedTx);
      // 6. Guardar en Supabase
      await supabase.from("certificates").insert([
        {
          token_id: token_id.toString("hex"),
          metadata: metadata.toString("hex"),
          owner: address,
          json_data: certData
        }
      ]);
      setSkill("");
      setName("");
      router.push("/success");
    } catch (err: any) {
      setLoading(false);
      // Puedes mostrar un error si lo deseas
    }
    setLoading(false);
  }

  return (
    <main className="flex flex-col min-h-screen w-full font-sans items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="rounded-2xl p-8 w-full max-w-md flex flex-col items-center shadow-2xl border border-white/20" style={{ background: 'var(--color-surface)' }}>
        <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-7 h-7" /> Mintear Certificación SBT
        </h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleMint}>
          <input
            type="text"
            placeholder="Nombre del usuario"
            className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Skill o certificación"
            className="rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 outline-none"
            value={skill}
            onChange={e => setSkill(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Minteando..." : "Mintear SBT"}
          </button>
        </form>
      </div>
      <BottomNav />
    </main>
  );
} 