import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import Navbar from "@/app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillsHubID",
  description: "SkillsHubID: Certifica y muestra tu talento al mundo.",
  icons: {
    icon: "/Logo.png",
  },
  openGraph: {
    title: "SkillsHubID",
    description: "Certifica y muestra tu talento al mundo.",
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 512,
        alt: "SkillsHubID Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SkillsHubID",
    description: "Certifica y muestra tu talento al mundo.",
    images: ["/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <Navbar />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
