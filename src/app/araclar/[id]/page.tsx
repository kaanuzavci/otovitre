"use client";

import { use, useState } from "react";
import Link from "next/link";
import FadeIn from '@/components/FadeIn';

/* ── Tipler ─────────────────────────────────────── */

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
  fotoSayisi: number;
  donanim: string[];
  hasar: { parca: string; durum: HasarDurum; not?: string }[];
};

/* ── Sahte Veri ──────────────────────────────────── */

const detaylar: Record<string, AracDetay> = {
  "1": {
    id: "1", marka: "Toyota", model: "Corolla", yil: 2021, km: 48_000,
    fiyat: 1_250_000, oncekiFiyat: 1_350_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Beyaz", motorHacmi: "1.6", durum: "aktif", fotoSayisi: 5,
    aciklama: "Bakımları yetkili serviste yapılmış, hasarsız, boyasız araç. Trafik sigortası ve muayenesi yeni. İkinci el sertifikası mevcuttur. Takas görüşülür.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Geri Görüş Kamerası", "Park Sensörü (Ön/Arka)", "Cruise Control", "Otomatik Klima", "Bluetooth", "USB Bağlantı", "Elektrikli Aynalar", "LED Farlar", "Start/Stop", "Dokunmatik Ekran"],
    hasar: [
      { parca: "Ön Kaput",          durum: "orijinal" },
      { parca: "Ön Sol Çamurluk",   durum: "orijinal" },
      { parca: "Ön Sağ Çamurluk",   durum: "orijinal" },
      { parca: "Sol Ön Kapı",       durum: "orijinal" },
      { parca: "Sağ Ön Kapı",       durum: "orijinal" },
      { parca: "Sol Arka Kapı",     durum: "orijinal" },
      { parca: "Sağ Arka Kapı",     durum: "orijinal" },
      { parca: "Tavan",             durum: "orijinal" },
      { parca: "Arka Bagaj",        durum: "boyali", not: "Küçük çizik tamiri" },
      { parca: "Arka Sol Çamurluk", durum: "orijinal" },
      { parca: "Arka Sağ Çamurluk", durum: "orijinal" },
    ],
  },
  "2": {
    id: "2", marka: "Honda", model: "Civic", yil: 2020, km: 62_000,
    fiyat: 1_100_000,
    yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",
    renk: "Siyah", motorHacmi: "1.5 Turbo", durum: "aktif", fotoSayisi: 4,
    aciklama: "Türkiye'de satılan Civic. Servis bakımları Honda yetkili serviste yapılmıştır. Boya ve hasar kaydı bulunmamaktadır.",
    donanim: ["Honda Sensing (LaneWatch, Collision Mitigation)", "Apple CarPlay / Android Auto", "Geri Görüş Kamerası", "Park Sensörü", "Isıtmalı Koltuk", "Sunroof", "Elektrikli Bagaj", "LED Farlar"],
    hasar: [
      { parca: "Ön Kaput",          durum: "orijinal" },
      { parca: "Ön Sol Çamurluk",   durum: "lokal_boyali", not: "Küçük taş izi temizliği" },
      { parca: "Ön Sağ Çamurluk",   durum: "orijinal" },
      { parca: "Sol Ön Kapı",       durum: "orijinal" },
      { parca: "Sağ Ön Kapı",       durum: "orijinal" },
      { parca: "Sol Arka Kapı",     durum: "orijinal" },
      { parca: "Sağ Arka Kapı",     durum: "orijinal" },
      { parca: "Tavan",             durum: "orijinal" },
      { parca: "Arka Bagaj",        durum: "orijinal" },
      { parca: "Arka Sol Çamurluk", durum: "orijinal" },
      { parca: "Arka Sağ Çamurluk", durum: "orijinal" },
    ],
  },
  "3": {
    id: "3", marka: "Volkswagen", model: "Passat", yil: 2022, km: 31_000,
    fiyat: 1_650_000, oncekiFiyat: 1_750_000,
    yakit: "Dizel", vites: "Otomatik (DSG)", kasa: "Sedan",
    renk: "Gümüş", motorHacmi: "2.0 TDI", durum: "aktif", fotoSayisi: 6,
    aciklama: "Business paket. Tam donanım. Periyodik bakımlar VW yetkili servisinde yapılmıştır. Hasar kaydı, boya ve değişen yoktur. Şirket aracı olarak kullanılmıştır.",
    sahibindenLink: "https://sahibinden.com",
    donanim: ["Yarı Otonom Sürüş (Lane Assist, ACC)", "Dijital Gösterge Paneli", "Panoramik Cam Tavan", "Isıtmalı/Soğutmalı Ön Koltuklar", "Koltuk Hafızası", "360° Kamera", "Park Assist (Otomatik Park)", "Harman Kardon Ses Sistemi", "Kablosuz Şarj", "Head-Up Display"],
    hasar: [
      { parca: "Ön Kaput",          durum: "orijinal" },
      { parca: "Ön Sol Çamurluk",   durum: "orijinal" },
      { parca: "Ön Sağ Çamurluk",   durum: "orijinal" },
      { parca: "Sol Ön Kapı",       durum: "orijinal" },
      { parca: "Sağ Ön Kapı",       durum: "orijinal" },
      { parca: "Sol Arka Kapı",     durum: "orijinal" },
      { parca: "Sağ Arka Kapı",     durum: "orijinal" },
      { parca: "Tavan",             durum: "orijinal" },
      { parca: "Arka Bagaj",        durum: "orijinal" },
      { parca: "Arka Sol Çamurluk", durum: "orijinal" },
      { parca: "Arka Sağ Çamurluk", durum: "orijinal" },
    ],
  },
};

/* ── Yardımcılar ─────────────────────────────────── */

function formatFiyat(f: number) {
  return new Intl.NumberFormat("tr-TR").format(f) + " ₺";
}
function formatKm(k: number) {
  return new Intl.NumberFormat("tr-TR").format(k) + " km";
}

const hasarRenk: Record<HasarDurum, string> = {
  orijinal:    "bg-green-50  text-green-700  border-green-200",
  boyali:      "bg-amber-50  text-amber-700  border-amber-200",
  lokal_boyali:"bg-orange-50 text-orange-700 border-orange-200",
  degisen:     "bg-red-50    text-red-700    border-red-200",
};
const hasarEtiket: Record<HasarDurum, string> = {
  orijinal:    "Orijinal",
  boyali:      "Boyalı",
  lokal_boyali:"Lokal Boyalı",
  degisen:     "Değişen",
};

const durumRenk: Record<Durum, string> = {
  aktif:   "bg-green-100 text-green-700",
  satildi: "bg-red-100   text-red-600",
  rezerve: "bg-amber-100 text-amber-700",
};
const durumEtiket: Record<Durum, string> = {
  aktif: "Satışta", satildi: "Satıldı", rezerve: "Rezerve",
};

/* ── Fotoğraf Galerisi ───────────────────────────── */

function FotoGalerisi({ fotoSayisi, baslik }: { fotoSayisi: number; baslik: string }) {
  const [aktif, setAktif] = useState(0);

  function prev() { setAktif((i) => (i - 1 + fotoSayisi) % fotoSayisi); }
  function next() { setAktif((i) => (i + 1) % fotoSayisi); }

  return (
    <div className="space-y-3">
      {/* Ana fotoğraf */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>

        {/* Fotoğraf sayacı */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {aktif + 1} / {fotoSayisi}
        </div>

        {/* Oklar */}
        {fotoSayisi > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
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
        {Array.from({ length: fotoSayisi }).map((_, i) => (
          <button
            key={i}
            onClick={() => setAktif(i)}
            className={`flex-1 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${
              i === aktif ? "border-amber-400" : "border-transparent hover:border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Teknik Özellik Satırı ───────────────────────── */

function OzellikSatir({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{etiket}</span>
      <span className="text-sm font-semibold text-gray-900">{deger}</span>
    </div>
  );
}

/* ── Ana Sayfa Bileşeni ──────────────────────────── */

export default function AracDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const arac = detaylar[id];

  const whatsappMesaj = arac
    ? encodeURIComponent(
        `Merhaba, ${arac.yil} ${arac.marka} ${arac.model} ilanınız hakkında bilgi almak istiyorum.`
      )
    : "";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">OtoVitre</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/araclar" className="hover:text-gray-900 transition-colors">Araçlar</Link>
            <Link href="/#hakkimizda" className="hover:text-gray-900 transition-colors">Hakkımızda</Link>
            <Link href="/#iletisim"   className="hover:text-gray-900 transition-colors">İletişim</Link>
          </nav>
          <a
            href="tel:05320000000"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
            </svg>
            0532 000 00 00
          </a>
        </div>
      </header>

      {/* ── ARAÇ BULUNAMADI ── */}
      {!arac ? (
        <div className="max-w-6xl mx-auto px-6 py-32 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-3">Araç bulunamadı</p>
          <p className="text-gray-500 mb-8">Bu ilan kaldırılmış veya mevcut değil.</p>
          <Link
            href="/araclar"
            className="inline-flex px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Tüm Araçlara Dön
          </Link>
        </div>
      ) : (
        <>
          {/* ── BREADCRUMB ── */}
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

          {/* ── İÇERİK ── */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* SOL: Galeri + Detaylar */}
              <div className="flex-1 min-w-0 space-y-8">

                {/* Başlık (mobil) */}
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

                {/* Fotoğraf Galerisi */}
                <FadeIn delay={100}>
                  <FotoGalerisi fotoSayisi={arac.fotoSayisi} baslik={`${arac.marka} ${arac.model}`} />
                </FadeIn>

                {/* Teknik Özellikler */}
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

                {/* Açıklama */}
                <FadeIn delay={300}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-3">Açıklama</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{arac.aciklama}</p>
                  </div>
                </FadeIn>

                {/* Donanım */}
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

                {/* Boya / Ekspertiz */}
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

              {/* SAĞ: Fiyat + İletişim (sticky) */}
              <FadeIn delay={200} className="w-full lg:w-80 shrink-0">
                <div className="sticky top-24 space-y-4">

                  {/* Fiyat Kartı */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    {/* Başlık (desktop) */}
                    <div className="hidden lg:block mb-5">
                      <div className="flex items-start justify-between gap-2">
                        <h1 className="text-xl font-bold leading-snug">{arac.marka} {arac.model}</h1>
                        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg ${durumRenk[arac.durum]}`}>
                          {durumEtiket[arac.durum]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{arac.yil} · {arac.vites} · {arac.yakit}</p>
                    </div>

                    {/* Fiyat Düştü Rozeti */}
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
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/905320000000?text=${whatsappMesaj}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#1ebe5d] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        WhatsApp&apos;tan Sor
                      </a>

                      {/* Telefon */}
                      <a
                        href="tel:05320000000"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
                        </svg>
                        Hemen Ara
                      </a>

                      {/* Sahibinden */}
                      {arac.sahibindenLink && (
                        <a
                          href={arac.sahibindenLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Sahibinden&apos;de Gör
                        </a>
                      )}
                    </div>
                  </div>

                  {/* İletişim Bilgileri */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      Galeri Bilgileri
                    </p>
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

                  {/* Geri dön */}
                  <Link
                    href="/araclar"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
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
