import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toko SBD",
  description: "Tugas Modul SBD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}>
        {/* Navbar */}
        <nav className="bg-white/90 backdrop-blur border-b border-zinc-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-2xl font-bold text-zinc-950 tracking-tight">
                Toko SBD
              </Link>
              <div className="space-x-4">
                <Link href="/login" className="text-zinc-600 hover:text-zinc-950 font-medium transition">
                  Login
                </Link>
                <Link href="/register" className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 font-medium transition shadow-sm shadow-zinc-200">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Area Konten Utama */}
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}