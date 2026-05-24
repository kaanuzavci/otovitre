"use client";

import Link from "next/link";
import { useKarsilastir } from "@/contexts/KarsilastirContext";

export default function KarsilastirBar() {
  const { secili, cikar, sifirla } = useKarsilastir();

  if (secili.length === 0) return null;

  const karsilastirUrl = `/karsilastir?ids=${secili.map((a) => a.id).join(",")}`;
  const hazir = secili.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/96 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">

        {/* Seçilen araçlar */}
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider shrink-0">
            Karşılaştır
          </span>

          {secili.map((arac) => (
            <div
              key={arac.id}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg px-2.5 py-1.5 shrink-0 transition-colors"
            >
              <span className="text-xs font-medium text-white">
                {arac.yil} {arac.marka} {arac.model}
              </span>
              <button
                onClick={() => cikar(arac.id)}
                className="text-gray-400 hover:text-white transition-colors ml-0.5"
                aria-label={`${arac.marka} ${arac.model} çıkar`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}

          {/* Boş slotlar */}
          {Array.from({ length: 3 - secili.length }).map((_, i) => (
            <div
              key={`bos-${i}`}
              className="flex items-center justify-center w-28 h-8 border border-dashed border-white/20 rounded-lg shrink-0"
            >
              <span className="text-[11px] text-gray-500">+ araç ekle</span>
            </div>
          ))}
        </div>

        {/* Sağ taraf */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={sifirla}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Temizle
          </button>

          {hazir ? (
            <Link
              href={karsilastirUrl}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15M3.75 9h16.5M3.75 15h16.5" />
              </svg>
              Karşılaştır ({secili.length})
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2 bg-gray-700 text-gray-400 text-sm font-medium rounded-lg whitespace-nowrap cursor-not-allowed select-none">
              En az 2 araç seç
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
