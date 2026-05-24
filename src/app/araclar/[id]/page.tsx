"use client";

import { use, useState } from "react";
import Link from "next/link";
import FadeIn from '@/components/FadeIn';
import Image from "next/image";

type Durum       = "aktif" | "satildi" | "rezerve";
type HasarDurum  = "orijinal" | "boyali" | "lokal_boyali" | "degisen";

type AracDetay = {
  id: string;
  marka: string;
  model: string;
  yil: number;
  km: number;
  fiyat: number;
  oncekiFiyat?: number;
  yakit: string;
  vites: string;
  kasa: string;
  renk: string;
  motorHacmi: string;
  durum: Durum;
  aciklama: string;
  sahibindenLink?: string;
  fotolar: string[];   // "dis-on" | "dis-yan" | "dis-arka" | "ic-on" | "ic-arka" | "motor" | "bagaj" | "jant"
  donanim: string[];
  hasar: { parca: string; durum: HasarDurum; not?: string }[];
};

const TUM_PARCALAR = [
  "Ön Kaput", "Ön Sol Çamurluk", "Ön Sağ Çamurluk",
  "Sol Ön Kapı", "Sağ Ön Kapı", "Sol Arka Kapı", "Sağ Arka Kapı",
  "Tavan", "Arka Bagaj", "Arka Sol Çamurluk", "Arka Sağ Çamurluk",
];

function temizHasar(overrides: Partial<Record<string, { durum: HasarDurum; not?: string }>> = {}) {
  return TUM_PARCALAR.map((parca) => {
    const o = (overrides as Record<string, { durum: HasarDurum; not?: string }>)[parca];
    return { parca, durum: o?.durum ?? "orijinal" as HasarDurum, not: o?.not };
  });
}

const detaylar: Record<string, AracDetay> = {
  "1": {
    id: "1", marka: "Toyota", model: "Corolla", yil: 2021, km: 48_000,
    fiyat: 1_250_000, oncekiFiyat: 1_350_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Beyaz", motorHacmi: "1.6", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "motor"],
    aciklama: "Bakımları yetkili serviste yapılmış, hasarsız, boyasız araç. Trafik sigortası ve muayenesi yeni. İkinci el sertifikası mevcuttur. Takas görüşülür.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Cruise Control", "Otomatik Klima", "Bluetooth", "USB Bağlantı", "Elektrikli Aynalar", "LED Farlar", "Start/Stop", "Dokunmatik Ekran"],
    hasar: temizHasar({ "Arka Bagaj": { durum: "boyali", not: "Küçük çizik tamiri" } }),
  },
  "2": {
    id: "2", marka: "Honda", model: "Civic", yil: 2020, km: 62_000,
    fiyat: 1_100_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Siyah", motorHacmi: "1.5 Turbo", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on"],
    aciklama: "Türkiye'de satılan Civic. Servis bakımları Honda yetkili serviste yapılmıştır. Boya ve hasar kaydı bulunmamaktadır.",
    donanim: ["Honda Sensing (LaneWatch, Collision Mitigation)", "Apple CarPlay / Android Auto", "Geri Görüş Kamerası", "Park Sensörü", "Isıtmalı Koltuk", "Sunroof", "Elektrikli Bagaj", "LED Farlar"],
    hasar: temizHasar({ "Ön Sol Çamurluk": { durum: "lokal_boyali", not: "Küçük taş izi temizliği" } }),
  },
  "3": {
    id: "3", marka: "Volkswagen", model: "Passat", yil: 2022, km: 31_000,
    fiyat: 1_650_000, oncekiFiyat: 1_750_000,
    yakit: "Dizel", vites: "Otomatik (DSG)", kasa: "Sedan",
    renk: "Gümüş", motorHacmi: "2.0 TDI", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka", "motor"],
    aciklama: "Business paket. Tam donanım. Periyodik bakımlar VW yetkili servisinde yapılmıştır. Hasar kaydı, boya ve değişen yoktur. Şirket aracı olarak kullanılmıştır.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Yarı Otonom Sürüş (Lane Assist, ACC)", "Dijital Gösterge Paneli", "Panoramik Cam Tavan", "Isıtmalı/Soğutmalı Ön Koltuklar", "Koltuk Hafızası", "360° Kamera", "Park Assist", "Harman Kardon Ses Sistemi", "Kablosuz Şarj", "Head-Up Display"],
    hasar: temizHasar(),
  },
  "4": {
    id: "4", marka: "Ford", model: "Focus", yil: 2019, km: 85_000,
    fiyat: 850_000,
    yakit: "Benzin", vites: "Manuel", kasa: "Hatchback",
    renk: "Kırmızı", motorHacmi: "1.5 EcoBoost", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on"],
    aciklama: "Periyodik bakımları düzenli yapılmış, temiz bir Focus. Boya kaydı yoktur. Km'si yüksek olmasına karşın motor ve şanzıman sağlıklıdır. Muayene geçerli.",
    donanim: ["Bluetooth", "USB Bağlantı", "Cruise Control", "Park Sensörü (Arka)", "Geri Görüş Kamerası", "Otomatik Klima", "LED Farlar"],
    hasar: temizHasar({ "Sol Ön Kapı": { durum: "boyali", not: "Küçük kaporta hasarı giderilmiş" } }),
  },
  "5": {
    id: "5", marka: "Renault", model: "Clio", yil: 2023, km: 12_000,
    fiyat: 980_000, oncekiFiyat: 1_020_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback",
    renk: "Mavi", motorHacmi: "1.0 TCe", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka"],
    aciklama: "2023 model, neredeyse sıfır gibi. Sigorta ve muayenesi yeni. Sıfır araç garantisi devam etmektedir. Renault yetkili servisinde bakımları yapılmıştır.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Apple CarPlay / Android Auto", "Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Otomatik Klima", "LED Farlar", "Şerit Takip Sistemi", "Kör Nokta Uyarısı", "Bluetooth", "Kablosuz Şarj"],
    hasar: temizHasar(),
  },
  "6": {
    id: "6", marka: "BMW", model: "3 Serisi", yil: 2021, km: 42_000,
    fiyat: 2_100_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Beyaz", motorHacmi: "2.0 TwinPower Turbo", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka", "jant", "motor"],
    aciklama: "M-Sport paketi ile donatılmış BMW 3 Serisi. BMW Türkiye kayıtlı, yetkili servis bakımlı. Boya ve değişen kaydı bulunmamaktadır. M-Spor deri koltuk, 19 inç M jant.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["M-Sport Paketi", "Isıtmalı M Koltuklar", "Adaptif Cruise Control", "Head-Up Display", "Harman Kardon Ses Sistemi", "Dijital Gösterge Paneli", "Panoramik Cam Tavan", "Keyless Go", "Geri Görüş Kamerası", "Park Assist", "LED Farlar", "Kablosuz Şarj"],
    hasar: temizHasar(),
  },
  "7": {
    id: "7", marka: "Mercedes-Benz", model: "C180", yil: 2020, km: 55_000,
    fiyat: 2_350_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Siyah", motorHacmi: "1.5 EQ Boost", durum: "satildi",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka"],
    aciklama: "SATILMIŞ — Bu araç artık mevcut değildir. Benzer araçlar için bizimle iletişime geçebilirsiniz.",
    donanim: ["MBUX Dokunmatik Ekran", "Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Otomatik Klima", "Isıtmalı Koltuklar", "LED Farlar", "Keyless Go", "Bluetooth", "Apple CarPlay"],
    hasar: temizHasar(),
  },
  "8": {
    id: "8", marka: "Hyundai", model: "Tucson", yil: 2022, km: 28_000,
    fiyat: 1_450_000,
    yakit: "Dizel", vites: "Otomatik", kasa: "SUV",
    renk: "Gri", motorHacmi: "1.6 CRDi", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka"],
    aciklama: "Style+ paket, tam donanım. Hyundai Türkiye kayıtlı. Yetkili serviste bakımlı. Hasarsız, boyasız. Takas görüşülür.",
    donanim: ["Geri Görüş Kamerası", "360° Kamera", "Park Sensörü (Ön/Arka)", "Adaptif Cruise Control", "Şerit Takip Sistemi", "Kör Nokta Uyarısı", "Apple CarPlay / Android Auto", "Isıtmalı Ön Koltuklar", "Panoramik Cam Tavan", "LED Farlar", "Elektrikli Bagaj Kapağı"],
    hasar: temizHasar(),
  },
  "9": {
    id: "9", marka: "Kia", model: "Sportage", yil: 2023, km: 8_000,
    fiyat: 1_580_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "SUV",
    renk: "Beyaz", motorHacmi: "1.6 T-GDI", durum: "rezerve",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka", "jant"],
    aciklama: "REZERVE — Bu araç şu an rezerve edilmiş durumdadır. Rezervasyon düşerse bilgilendirme için bizimle iletişime geçin. 2023 model, sıfıra yakın, garantisi devam etmektedir.",
    donanim: ["360° Görüntüleme Sistemi", "Head-Up Display", "Adaptif Cruise Control", "Şerit Takip Sistemi", "Apple CarPlay / Android Auto", "Isıtmalı/Soğutmalı Koltuklar", "Panoramik Cam Tavan", "Keyless Go", "LED Matrix Farlar", "Kablosuz Şarj", "Elektrikli Bagaj Kapağı"],
    hasar: temizHasar(),
  },
  "10": {
    id: "10", marka: "Skoda", model: "Octavia", yil: 2021, km: 39_000,
    fiyat: 1_180_000,
    yakit: "Dizel", vites: "Otomatik", kasa: "Sedan",
    renk: "Gri", motorHacmi: "2.0 TDI", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on"],
    aciklama: "Style paket. Skoda yetkili servisinde bakımlı. Dizel otomatik, yakıt tasarruflu. Boya ve hasar kaydı yoktur. Sigorta ve muayene geçerli.",
    donanim: ["Columbus Navigasyon Sistemi", "Sanal Gösterge Paneli", "Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Otomatik Klima", "Isıtmalı Ön Koltuklar", "Apple CarPlay / Android Auto", "LED Farlar", "Cruise Control", "Bluetooth", "USB Bağlantı"],
    hasar: temizHasar({ "Ön Sol Çamurluk": { durum: "lokal_boyali", not: "Küçük park çizigi giderilmiş" } }),
  },
  "11": {
    id: "11", marka: "Seat", model: "Leon", yil: 2022, km: 21_000,
    fiyat: 1_050_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback",
    renk: "Beyaz", motorHacmi: "1.5 TSI", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka"],
    aciklama: "FR paket. Sportif ve ekonomik kullanım için ideal. Seat yetkili servisinde bakımlı. Boya kaydı yoktur. Sıfır araç teslim belgesi mevcuttur.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["FR Spor Paketi", "Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Otomatik Klima", "Apple CarPlay / Android Auto", "LED Farlar", "Şerit Takip Sistemi", "Adaptif Cruise Control", "Isıtmalı Ön Koltuklar", "Bluetooth", "USB Bağlantı"],
    hasar: temizHasar(),
  },
  "12": {
    id: "12", marka: "Toyota", model: "RAV4", yil: 2023, km: 5_000,
    fiyat: 2_200_000,
    yakit: "Hibrit", vites: "Otomatik (e-CVT)", kasa: "SUV",
    renk: "Gri", motorHacmi: "2.5 Hibrit", durum: "aktif",
    fotolar: ["dis-on", "dis-yan", "dis-arka", "ic-on", "ic-arka", "bagaj", "jant"],
    aciklama: "Neredeyse sıfır, hibrit SUV. Toyota yetkili servisinde bakımlı. Sıfır araç garantisi devam etmektedir. Yakıt tüketimi son derece düşük. Tam donanım paket.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Toyota Safety Sense (Otonom Acil Frenleme, Şerit Takip)", "360° Kamera", "Head-Up Display", "JBL Ses Sistemi", "Isıtmalı/Soğutmalı Koltuklar", "Koltuk Hafızası", "Panoramik Cam Tavan", "Elektrikli Bagaj Kapağı", "Kablosuz Şarj", "Keyless Go", "LED Matrix Farlar", "Apple CarPlay / Android Auto"],
    hasar: temizHasar(),
  },
};

/* ── Renk → gradient ── */
const RENK_GRADYAN: Record<string, { bg: string; text: string }> = {
  "Beyaz":   { bg: "from-slate-100 to-slate-300", text: "text-slate-400" },
  "Siyah":   { bg: "from-gray-700 to-gray-950",   text: "text-gray-500"  },
  "Gümüş":   { bg: "from-zinc-200 to-zinc-400",   text: "text-zinc-500"  },
  "Kırmızı": { bg: "from-red-500 to-red-800",     text: "text-red-300"   },
  "Mavi":    { bg: "from-blue-500 to-blue-800",   text: "text-blue-300"  },
  "Gri":     { bg: "from-gray-400 to-gray-600",   text: "text-gray-200"  },
};

/* Görsel tipleri ve etiketleri */
const GORSEL_ETIKET: Record<string, string> = {
  "dis-on":   "Ön Görünüm",
  "dis-yan":  "Yan Görünüm",
  "dis-arka": "Arka Görünüm",
  "ic-on":    "İç Mekan",
  "ic-arka":  "Arka Koltuk",
  "motor":    "Motor",
  "bagaj":    "Bagaj",
  "jant":     "Jant",
};

/* Görsel tipine göre gradient */
function gorselGradyan(tip: string, renk: string): { bg: string; text: string } {
  if (tip.startsWith("dis")) {
    const g = RENK_GRADYAN[renk];
    return g ?? { bg: "from-gray-400 to-gray-600", text: "text-gray-200" };
  }
  if (tip.startsWith("ic")) {
    return { bg: "from-stone-600 to-stone-900", text: "text-stone-300" };
  }
  if (tip === "motor") {
    return { bg: "from-zinc-700 to-zinc-950", text: "text-zinc-400" };
  }
  if (tip === "bagaj") {
    return { bg: "from-gray-600 to-gray-900", text: "text-gray-400" };
  }
  // jant
  return { bg: "from-slate-600 to-slate-900", text: "text-slate-300" };
}

/* ── Araç silüeti (SUV / Hatchback / Sedan) ── */
function AracSilhouette({ kasa, className }: { kasa: string; className?: string }) {
  if (kasa === "SUV") return (
    <svg className={className} viewBox="0 0 240 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 68 L10 56 L24 42 L68 28 L148 28 L180 40 L222 52 L228 62 L228 68 Z" opacity="0.32" />
      <circle cx="58"  cy="68" r="18" opacity="0.45" />
      <circle cx="182" cy="68" r="18" opacity="0.45" />
      <circle cx="58"  cy="68" r="9"  fill="white" opacity="0.22" />
      <circle cx="182" cy="68" r="9"  fill="white" opacity="0.22" />
    </svg>
  );
  if (kasa === "Hatchback") return (
    <svg className={className} viewBox="0 0 240 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 68 L12 58 L28 44 L72 30 L152 30 L188 50 L226 58 L228 68 Z" opacity="0.32" />
      <circle cx="60"  cy="68" r="17" opacity="0.45" />
      <circle cx="184" cy="68" r="17" opacity="0.45" />
      <circle cx="60"  cy="68" r="8"  fill="white" opacity="0.22" />
      <circle cx="184" cy="68" r="8"  fill="white" opacity="0.22" />
    </svg>
  );
  return (
    <svg className={className} viewBox="0 0 240 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 68 L12 58 L26 44 L70 30 L158 30 L190 46 L226 56 L228 68 Z" opacity="0.32" />
      <circle cx="60"  cy="68" r="17" opacity="0.45" />
      <circle cx="186" cy="68" r="17" opacity="0.45" />
      <circle cx="60"  cy="68" r="8"  fill="white" opacity="0.22" />
      <circle cx="186" cy="68" r="8"  fill="white" opacity="0.22" />
    </svg>
  );
}

/* ── İç mekan ikonu ── */
function IcMekanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Steering wheel */}
      <circle cx="80" cy="50" r="28" opacity="0.3" />
      <circle cx="80" cy="50" r="18" opacity="0" />
      <circle cx="80" cy="50" r="6"  opacity="0.45" />
      <line x1="80" y1="22" x2="80" y2="44" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <line x1="55" y1="65" x2="68" y2="54" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <line x1="105" y1="65" x2="92" y2="54" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      {/* Dashboard */}
      <rect x="20" y="68" width="200" height="12" rx="4" opacity="0.25" />
      <rect x="130" y="38" width="80" height="35" rx="6" opacity="0.2" />
      <rect x="142" y="44" width="56" height="23" rx="4" opacity="0.3" />
    </svg>
  );
}

/* ── Motor ikonu ── */
function MotorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="60"  y="20" width="120" height="60" rx="8" opacity="0.25" />
      <rect x="80"  y="30" width="80"  height="40" rx="5" opacity="0.35" />
      <rect x="40"  y="35" width="25"  height="12" rx="3" opacity="0.35" />
      <rect x="175" y="35" width="25"  height="12" rx="3" opacity="0.35" />
      <circle cx="120" cy="50" r="16" opacity="0.3" />
      <circle cx="120" cy="50" r="8"  opacity="0.4" />
      <rect x="108" y="10" width="8" height="15" rx="3" opacity="0.4" />
      <rect x="124" y="10" width="8" height="15" rx="3" opacity="0.4" />
    </svg>
  );
}

/* ── Jant ikonu ── */
function JantIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" opacity="0.25" />
      <circle cx="60" cy="60" r="42" opacity="0.1" />
      <circle cx="60" cy="60" r="14" opacity="0.4" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 60 + 14 * Math.cos(rad);
        const y1 = 60 + 14 * Math.sin(rad);
        const x2 = 60 + 42 * Math.cos(rad);
        const y2 = 60 + 42 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="5" opacity="0.3" />;
      })}
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.3" />
    </svg>
  );
}

/* ── Fotoğraf galerisi ── */
function FotoGalerisi({
  fotolar,
  renk,
  kasa,
  marka,
  model,
  aracId,
}: {
  fotolar: string[];
  renk: string;
  kasa: string;
  marka: string;
  model: string;
  aracId: string;
}) {
  const [aktif, setAktif] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  function prev() { setAktif((i) => (i - 1 + fotolar.length) % fotolar.length); }
  function next() { setAktif((i) => (i + 1) % fotolar.length); }

  const aktifTip = fotolar[aktif] ?? "dis-on";
  const { bg, text } = gorselGradyan(aktifTip, renk);
  const etiket = GORSEL_ETIKET[aktifTip] ?? aktifTip;

  function renderIcon() {
    if (aktifTip.startsWith("ic")) return <IcMekanIcon className={`w-56 h-auto ${text}`} />;
    if (aktifTip === "motor")       return <MotorIcon  className={`w-56 h-auto ${text}`} />;
    if (aktifTip === "jant")        return <JantIcon   className={`w-28 h-28 ${text}`} />;
    if (aktifTip === "bagaj")       return <AracSilhouette kasa={kasa} className={`w-52 h-auto ${text} opacity-70 scale-x-[-1]`} />;
    return <AracSilhouette kasa={kasa} className={`w-52 h-auto ${text}`} />;
  }

  return (
    <div className="space-y-3">
      {/* Ana görsel */}
      <div className={`relative bg-gradient-to-br ${bg} rounded-2xl overflow-hidden aspect-[16/10] flex flex-col items-center justify-center`}>
        {/* Watermark */}
        <span className={`absolute text-[140px] font-black leading-none select-none pointer-events-none ${text} opacity-5`} aria-hidden>
          {marka[0]}
        </span>

        {renderIcon()}

        {/* Görünüm etiketi */}
        <p className={`relative mt-3 text-xs font-semibold ${text} opacity-60 select-none`}>
          {marka} {model} · {etiket}
        </p>

        {/* Gerçek resim — varsa gradient + SVG'nin üzerini örter */}
        {!imgErrors[aktif] && (
          <Image
            key={`${aracId}-${aktifTip}`}
            src={`/images/araclar/${aracId}/${aktifTip}.jpg`}
            alt={`${marka} ${model} - ${etiket}`}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover z-[2]"
            onError={() => setImgErrors(e => ({ ...e, [aktif]: true }))}
            priority={aktif === 0}
          />
        )}

        {/* Sayaç */}
        <div className="absolute bottom-3 right-3 z-[3] bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {aktif + 1} / {fotolar.length}
        </div>

        {/* Ok butonları */}
        {fotolar.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Küçük resimler */}
      <div className="flex gap-2">
        {fotolar.map((tip, i) => {
          const { bg: tBg, text: tText } = gorselGradyan(tip, renk);
          return (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all bg-gradient-to-br ${tBg} flex items-center justify-center ${
                i === aktif ? "border-amber-400 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <span className={`text-[8px] font-semibold ${tText} opacity-70 select-none leading-none text-center px-1`}>
                {(GORSEL_ETIKET[tip] ?? tip).split(" ")[0]}
              </span>
              {!imgErrors[i] && (
                <Image
                  src={`/images/araclar/${aracId}/${tip}.jpg`}
                  alt={GORSEL_ETIKET[tip] ?? tip}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatFiyat(f: number) {
  return new Intl.NumberFormat("tr-TR").format(f) + " ₺";
}
function formatKm(k: number) {
  return new Intl.NumberFormat("tr-TR").format(k) + " km";
}

const hasarRenk: Record<HasarDurum, string> = {
  orijinal:     "bg-green-50  text-green-700  border-green-200",
  boyali:       "bg-amber-50  text-amber-700  border-amber-200",
  lokal_boyali: "bg-orange-50 text-orange-700 border-orange-200",
  degisen:      "bg-red-50    text-red-700    border-red-200",
};
const hasarEtiket: Record<HasarDurum, string> = {
  orijinal: "Orijinal", boyali: "Boyalı", lokal_boyali: "Lokal Boyalı", degisen: "Değişen",
};

const durumRenk: Record<Durum, string> = {
  aktif:   "bg-green-100 text-green-700",
  satildi: "bg-red-100   text-red-600",
  rezerve: "bg-amber-100 text-amber-700",
};
const durumEtiket: Record<Durum, string> = {
  aktif: "Satışta", satildi: "Satıldı", rezerve: "Rezerve",
};

function OzellikSatir({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{etiket}</span>
      <span className="text-sm font-semibold text-gray-900">{deger}</span>
    </div>
  );
}

export default function AracDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const arac = detaylar[id];

  const whatsappMesaj = arac
    ? encodeURIComponent(`Merhaba, ${arac.yil} ${arac.marka} ${arac.model} ilanınız hakkında bilgi almak istiyorum.`)
    : "";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">OtoVitre</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/araclar" className="hover:text-gray-900 transition-colors">Araçlar</Link>
            <Link href="/#hakkimizda" className="hover:text-gray-900 transition-colors">Hakkımızda</Link>
            <Link href="/#iletisim" className="hover:text-gray-900 transition-colors">İletişim</Link>
          </nav>
          <a href="tel:05320000000" className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
            </svg>
            0532 000 00 00
          </a>
        </div>
      </header>

      {!arac ? (
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <div className="text-6xl mb-6">🚗</div>
          <p className="text-2xl font-bold text-gray-900 mb-3">Araç bulunamadı</p>
          <p className="text-gray-500 mb-8">Bu ilan kaldırılmış veya mevcut değil.</p>
          <Link href="/araclar" className="inline-flex px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors">
            Tüm Araçlara Dön
          </Link>
        </div>
      ) : (
        <>
          <FadeIn>
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
              <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900 transition-colors">Ana Sayfa</Link>
                <span>›</span>
                <Link href="/araclar" className="hover:text-gray-900 transition-colors">Araçlar</Link>
                <span>›</span>
                <span className="text-gray-900 font-medium">{arac.marka} {arac.model}</span>
              </div>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* ── SOL ── */}
              <div className="flex-1 min-w-0 space-y-8">

                <FadeIn delay={0}>
                  <div className="lg:hidden">
                    <div className="flex items-start justify-between gap-3">
                      <h1 className="text-2xl font-bold">{arac.marka} {arac.model}</h1>
                      <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg ${durumRenk[arac.durum]}`}>
                        {durumEtiket[arac.durum]}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-1 text-sm">{arac.yil} · {arac.vites} · {arac.yakit}</p>
                    {arac.oncekiFiyat && (
                      <div className="inline-flex items-center gap-1.5 mt-3 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        Fiyat Düştü — {formatFiyat(arac.oncekiFiyat - arac.fiyat)} indirim
                      </div>
                    )}
                  </div>
                </FadeIn>

                <FadeIn delay={100}>
                  <FotoGalerisi
                    fotolar={arac.fotolar}
                    renk={arac.renk}
                    kasa={arac.kasa}
                    marka={arac.marka}
                    model={arac.model}
                    aracId={arac.id}
                  />
                </FadeIn>

                <FadeIn delay={200}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-4">Teknik Özellikler</h2>
                    <div className="grid sm:grid-cols-2 gap-x-8">
                      <div>
                        <OzellikSatir etiket="Marka"       deger={arac.marka} />
                        <OzellikSatir etiket="Model"       deger={arac.model} />
                        <OzellikSatir etiket="Yıl"         deger={String(arac.yil)} />
                        <OzellikSatir etiket="Kilometre"   deger={formatKm(arac.km)} />
                        <OzellikSatir etiket="Yakıt"       deger={arac.yakit} />
                      </div>
                      <div>
                        <OzellikSatir etiket="Vites"       deger={arac.vites} />
                        <OzellikSatir etiket="Kasa Tipi"   deger={arac.kasa} />
                        <OzellikSatir etiket="Renk"        deger={arac.renk} />
                        <OzellikSatir etiket="Motor Hacmi" deger={`${arac.motorHacmi} L`} />
                        <OzellikSatir etiket="Durum"       deger={durumEtiket[arac.durum]} />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={300}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-3">Açıklama</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{arac.aciklama}</p>
                  </div>
                </FadeIn>

                <FadeIn delay={400}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-4">Donanım</h2>
                    <div className="flex flex-wrap gap-2">
                      {arac.donanim.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 text-sm bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                          <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={500}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-2">Boya & Ekspertiz</h2>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(["orijinal", "boyali", "lokal_boyali", "degisen"] as HasarDurum[]).map((d) => (
                        <span key={d} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${hasarRenk[d]}`}>
                          {hasarEtiket[d]}
                        </span>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {arac.hasar.map((h) => (
                        <div key={h.parca} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <span className="text-sm font-medium text-gray-800">{h.parca}</span>
                            {h.not && <p className="text-xs text-gray-500 mt-0.5">{h.not}</p>}
                          </div>
                          <span className={`ml-3 shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border ${hasarRenk[h.durum]}`}>
                            {hasarEtiket[h.durum]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

              </div>

              {/* ── SAĞ ── */}
              <FadeIn delay={200} className="w-full lg:w-80 shrink-0">
                <div className="sticky top-24 space-y-4">

                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="hidden lg:block mb-5">
                      <div className="flex items-start justify-between gap-2">
                        <h1 className="text-xl font-bold leading-snug">{arac.marka} {arac.model}</h1>
                        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg ${durumRenk[arac.durum]}`}>
                          {durumEtiket[arac.durum]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{arac.yil} · {arac.vites} · {arac.yakit}</p>
                    </div>

                    {arac.oncekiFiyat && (
                      <div className="hidden lg:flex items-center gap-1.5 mb-4 bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-xl">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        Fiyat Düştü — {formatFiyat(arac.oncekiFiyat - arac.fiyat)} indirim
                      </div>
                    )}

                    {arac.oncekiFiyat && (
                      <p className="text-sm text-gray-400 line-through">{formatFiyat(arac.oncekiFiyat)}</p>
                    )}
                    <p className="text-3xl font-bold text-gray-900 mt-1">{formatFiyat(arac.fiyat)}</p>

                    <div className="mt-6 space-y-3">
                      {arac.durum !== "satildi" && (
                        <>
                          <a
                            href={`https://wa.me/905320000000?text=${whatsappMesaj}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1ebe5d] transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            WhatsApp&apos;tan Sor
                          </a>
                          <a href="tel:05320000000"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
                            </svg>
                            Hemen Ara
                          </a>
                        </>
                      )}

                      {arac.durum === "satildi" && (
                        <div className="text-center py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">
                          Bu araç satılmıştır
                        </div>
                      )}
                      {arac.durum === "rezerve" && (
                        <div className="text-center py-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700 font-medium">
                          Araç rezervedir — listeye girmek için arayın
                        </div>
                      )}

                      {arac.sahibindenLink && (
                        <a href={arac.sahibindenLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Sahibinden&apos;de Gör
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Galeri Bilgileri</p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>Atatürk Cad. No:1, İstanbul</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Pzt–Cmt: 09:00 – 19:00</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/araclar" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Tüm araçlara dön
                  </Link>
                </div>
              </FadeIn>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
