import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ClientShell from "@/components/layout/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arenania — Game Console Rental",
  description:
    "Rent premium gaming consoles by the hour or day. PS5, Xbox, Nintendo Switch, and PC rigs ready to play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-bg-base font-body antialiased">
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
