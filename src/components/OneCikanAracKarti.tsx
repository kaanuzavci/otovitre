"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";

type Arac = {
  id: string;
  marka: string;
  model: string;
  yil: number;
  km: number;
  fiyat: number;
  yakit: string;
  vites: string;
  kasa: string;
  renk: string;
};

const RENK_GRADYAN: Record<string, { bg: string; text: string }> = {
  "Beyaz": { bg: "from-slate-100 to-slate-300", text: "text-slate-400" },
  "Gri":   { bg: "from-gray-400 to-gray-600",   text: "text-gray-200" },
  "Siyah": { bg: "from-gray-700 to-gray-950",   text: "text-gray-500" },
};

function formatFiyat(fiyat: number) {
  return new Intl.NumberFormat("tr-TR").format(fiyat) + " ₺";
}
function formatKm(km: number) {
  return new Intl.NumberFormat("tr-TR").format(km) + " km";
}

export default function OneCikanAracKarti({
  arac,
  delay = 0,
}: {
  arac: Arac;
  delay?: number;
}) {
  const [imgHata, setImgHata] = useState(false);
  const g = RENK_GRADYAN[arac.renk] ?? { bg: "from-gray-200 to-gray-300", text: "text-gray-400" };

  return (
    <FadeIn delay={delay}>
      <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

        {/* ── Görsel ── */}
        <div className={`relative h-52 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${g.bg}`}>

          {/* Watermark */}
          <span
            className={`absolute text-[100px] font-black leading-none select-none pointer-events-none ${g.text} opacity-10`}
            aria-hidden
          >
            {arac.marka[0]}
          </span>

          {/* Gradient fallback içeriği */}
          <div className="relative text-center select-none">
            <p className={`text-xl font-black tracking-tight ${g.text} opacity-40`}>{arac.marka}</p>
            <p className={`text-sm ${g.text} opacity-30`}>{arac.model}</p>
          </div>

          {/* Gerçek resim — varsa gradient üzerini örter */}
          {!imgHata && (
            <Image
              src={`/images/araclar/${arac.id}/dis-on.jpg`}
              alt={`${arac.marka} ${arac.model}`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover z-[2]"
              onError={() => setImgHata(true)}
            />
          )}

          {/* Yıl badge */}
          <div className="absolute top-3 left-3 z-[3] bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            {arac.yil}
          </div>

          {/* Km badge */}
          <div className="absolute bottom-3 left-3 z-[3] bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg">
            {formatKm(arac.km)}
          </div>
        </div>

        {/* ── Bilgi ── */}
        <div className="p-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{arac.marka} {arac.model}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              {[arac.yakit, arac.vites, arac.kasa].map((e) => (
                <span key={e} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{e}</span>
              ))}
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-medium">Fiyat</div>
              <div className="text-xl font-bold text-gray-900 mt-0.5">{formatFiyat(arac.fiyat)}</div>
            </div>
            <Link
              href={`/araclar/${arac.id}`}
              className="px-4 py-2 text-sm font-semibold bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors"
            >
              İncele
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
