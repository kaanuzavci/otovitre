"use client";

import { useState } from "react";
import Link from "next/link";

export default function GirisPage() {
  const [eposta, setEposta]         = useState("");
  const [sifre, setSifre]           = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata]             = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    setYukleniyor(true);
    await new Promise((r) => setTimeout(r, 800));
    setYukleniyor(false);
    setHata("Supabase henüz bağlı değil. Yakında aktif olacak.");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 font-sans antialiased">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tight text-white">OtoVitre</span>
          </Link>
          <p className="text-sm text-gray-500 mt-1.5">Admin Paneli</p>
        </div>

        {/* Kart */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700/60 p-8">
          <h1 className="text-base font-bold text-white mb-6">Giriş Yap</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                E-posta
              </label>
              <input
                type="email"
                required
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                placeholder="ornek@otovitre.com"
                className="w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Şifre
              </label>
              <input
                type="password"
                required
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors"
              />
            </div>

            {hata && (
              <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {hata}
              </div>
            )}

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-2.5 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {yukleniyor ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          <Link href="/" className="hover:text-gray-400 transition-colors">← Siteye Dön</Link>
        </p>
      </div>
    </div>
  );
}
