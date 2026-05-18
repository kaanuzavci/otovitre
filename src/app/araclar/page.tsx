"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Durum = "aktif" | "satildi" | "rezerve";

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
  durum: Durum;
};

const tumAraclar: Arac[] = [
  { id: "1",  marka: "Toyota",       model: "Corolla",  yil: 2021, km: 48_000, fiyat: 1_250_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Beyaz",  durum: "aktif"   },
  { id: "2",  marka: "Honda",        model: "Civic",    yil: 2020, km: 62_000, fiyat: 1_100_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Siyah",  durum: "aktif"   },
  { id: "3",  marka: "Volkswagen",   model: "Passat",   yil: 2022, km: 31_000, fiyat: 1_650_000, yakit: "Dizel",  vites: "Otomatik", kasa: "Sedan",     renk: "Gümüş",  durum: "aktif"   },
  { id: "4",  marka: "Ford",         model: "Focus",    yil: 2019, km: 85_000, fiyat:   850_000, yakit: "Benzin", vites: "Manuel",   kasa: "Hatchback", renk: "Kırmızı",durum: "aktif"   },
  { id: "5",  marka: "Renault",      model: "Clio",     yil: 2023, km: 12_000, fiyat:   980_000, yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback", renk: "Mavi",   durum: "aktif"   },
  { id: "6",  marka: "BMW",          model: "3 Serisi", yil: 2021, km: 42_000, fiyat: 2_100_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Beyaz",  durum: "aktif"   },
  { id: "7",  marka: "Mercedes-Benz",model: "C180",     yil: 2020, km: 55_000, fiyat: 2_350_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Siyah",  durum: "satildi" },
  { id: "8",  marka: "Hyundai",      model: "Tucson",   yil: 2022, km: 28_000, fiyat: 1_450_000, yakit: "Dizel",  vites: "Otomatik", kasa: "SUV",       renk: "Gri",    durum: "aktif"   },
  { id: "9",  marka: "Kia",          model: "Sportage", yil: 2023, km:  8_000, fiyat: 1_580_000, yakit: "Benzin", vites: "Otomatik", kasa: "SUV",       renk: "Beyaz",  durum: "rezerve" },
  { id: "10", marka: "Skoda",        model: "Octavia",  yil: 2021, km: 39_000, fiyat: 1_180_000, yakit: "Dizel",  vites: "Otomatik", kasa: "Sedan",     renk: "Gri",    durum: "aktif"   },
  { id: "11", marka: "Seat",         model: "Leon",     yil: 2022, km: 21_000, fiyat: 1_050_000, yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback", renk: "Beyaz",  durum: "aktif"   },
  { id: "12", marka: "Toyota",       model: "RAV4",     yil: 2023, km:  5_000, fiyat: 2_200_000, yakit: "Hibrit", vites: "Otomatik", kasa: "SUV",       renk: "Gri",    durum: "aktif"   },
];

type Filtreler = {
  markalar: string[];
  yakitTipleri: string[];
  vitesTipleri: string[];
  kasaTipleri: string[];
  minFiyat: string;
  maxFiyat: string;
};

const bosFiltreler: Filtreler = {
  markalar: [], yakitTipleri: [], vitesTipleri: [], kasaTipleri: [],
  minFiyat: "", maxFiyat: "",
};

function uniq(arr: string[]) {
  return [...new Set(arr)].sort();
}

const markalar    = uniq(tumAraclar.map((a) => a.marka));
const yakitTipleri = uniq(tumAraclar.map((a) => a.yakit));
const vitesTipleri = uniq(tumAraclar.map((a) => a.vites));
const kasaTipleri  = uniq(tumAraclar.map((a) => a.kasa));

function formatFiyat(f: number) {
  return new Intl.NumberFormat("tr-TR").format(f) + " ₺";
}
function formatKm(k: number) {
  return new Intl.NumberFormat("tr-TR").format(k) + " km";
}

const durumRenk: Record<Durum, string> = {
  aktif:   "bg-green-100 text-green-700",
  satildi: "bg-red-100 text-red-600",
  rezerve: "bg-amber-100 text-amber-700",
};
const durumEtiket: Record<Durum, string> = {
  aktif: "Aktif", satildi: "Satıldı", rezerve: "Rezerve",
};

/* ── Checkbox grubu bileşeni ── */
function FilterGroup({
  baslik,
  secenekler,
  secili,
  onChange,
}: {
  baslik: string;
  secenekler: string[];
  secili: string[];
  onChange: (deger: string) => void;
}) {
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {baslik}
      </p>
      <div className="space-y-2">
        {secenekler.map((s) => (
          <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={secili.includes(s)}
              onChange={() => onChange(s)}
              className="w-4 h-4 rounded border-gray-300 text-amber-500 accent-amber-500"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              {s}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function AraclarPage() {
  const [filtreler, setFiltreler] = useState<Filtreler>(bosFiltreler);
  const [siralama, setSiralama]   = useState("yil-azalan");
  const [mobilFiltreAcik, setMobilFiltreAcik] = useState(false);

  function toggle(
    alan: "markalar" | "yakitTipleri" | "vitesTipleri" | "kasaTipleri",
    deger: string
  ) {
    setFiltreler((prev) => {
      const liste = prev[alan];
      return {
        ...prev,
        [alan]: liste.includes(deger)
          ? liste.filter((x) => x !== deger)
          : [...liste, deger],
      };
    });
  }

  const aktifFiltreAdet =
    filtreler.markalar.length +
    filtreler.yakitTipleri.length +
    filtreler.vitesTipleri.length +
    filtreler.kasaTipleri.length +
    (filtreler.minFiyat ? 1 : 0) +
    (filtreler.maxFiyat ? 1 : 0);

  const goruntulenecek = useMemo(() => {
    const min = filtreler.minFiyat ? Number(filtreler.minFiyat) : null;
    const max = filtreler.maxFiyat ? Number(filtreler.maxFiyat) : null;

    let sonuc = tumAraclar.filter((a) => {
      if (filtreler.markalar.length     && !filtreler.markalar.includes(a.marka))      return false;
      if (filtreler.yakitTipleri.length && !filtreler.yakitTipleri.includes(a.yakit))  return false;
      if (filtreler.vitesTipleri.length && !filtreler.vitesTipleri.includes(a.vites))  return false;
      if (filtreler.kasaTipleri.length  && !filtreler.kasaTipleri.includes(a.kasa))    return false;
      if (min !== null && a.fiyat < min) return false;
      if (max !== null && a.fiyat > max) return false;
      return true;
    });

    switch (siralama) {
      case "fiyat-artan":  sonuc = sonuc.sort((a, b) => a.fiyat - b.fiyat); break;
      case "fiyat-azalan": sonuc = sonuc.sort((a, b) => b.fiyat - a.fiyat); break;
      case "yil-azalan":   sonuc = sonuc.sort((a, b) => b.yil - a.yil);     break;
      case "yil-artan":    sonuc = sonuc.sort((a, b) => a.yil - b.yil);     break;
      case "km-artan":     sonuc = sonuc.sort((a, b) => a.km - b.km);       break;
    }

    return sonuc;
  }, [filtreler, siralama]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">OtoVitre</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/araclar" className="text-gray-900 font-semibold">Araçlar</Link>
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

      {/* ── SAYFA BAŞLIĞI ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tüm Araçlar</h1>
            <p className="text-sm text-gray-500 mt-1">
              {goruntulenecek.length} araç listeleniyor
            </p>
          </div>

          {/* Mobil filtre butonu */}
          <button
            onClick={() => setMobilFiltreAcik((v) => !v)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            Filtreler
            {aktifFiltreAdet > 0 && (
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {aktifFiltreAdet}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

        {/* ── FİLTRE SIDEBAR ── */}
        <aside
          className={`
            ${mobilFiltreAcik ? "block" : "hidden"} sm:block
            w-full sm:w-64 shrink-0
          `}
        >
          <div className="bg-white bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Filtreler</h2>
              {aktifFiltreAdet > 0 && (
                <button
                  onClick={() => setFiltreler(bosFiltreler)}
                  className="text-xs text-amber-600 font-medium hover:text-amber-700"
                >
                  Sıfırla ({aktifFiltreAdet})
                </button>
              )}
            </div>

            <FilterGroup
              baslik="Marka"
              secenekler={markalar}
              secili={filtreler.markalar}
              onChange={(d) => toggle("markalar", d)}
            />
            <FilterGroup
              baslik="Yakıt Tipi"
              secenekler={yakitTipleri}
              secili={filtreler.yakitTipleri}
              onChange={(d) => toggle("yakitTipleri", d)}
            />
            <FilterGroup
              baslik="Vites"
              secenekler={vitesTipleri}
              secili={filtreler.vitesTipleri}
              onChange={(d) => toggle("vitesTipleri", d)}
            />
            <FilterGroup
              baslik="Kasa Tipi"
              secenekler={kasaTipleri}
              secili={filtreler.kasaTipleri}
              onChange={(d) => toggle("kasaTipleri", d)}
            />

            {/* Fiyat aralığı */}
            <div className="border-b border-gray-100 pb-5 mb-5 last:border-0">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Fiyat Aralığı (₺)
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filtreler.minFiyat}
                  onChange={(e) =>
                    setFiltreler((prev) => ({ ...prev, minFiyat: e.target.value }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filtreler.maxFiyat}
                  onChange={(e) =>
                    setFiltreler((prev) => ({ ...prev, maxFiyat: e.target.value }))
                  }
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* ── ARAÇ LİSTESİ ── */}
        <div className="flex-1 min-w-0">

          {/* Sıralama */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 hidden sm:block">
              {goruntulenecek.length} araç bulundu
            </p>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-gray-500">Sırala:</label>
              <select
                value={siralama}
                onChange={(e) => setSiralama(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 bg-white"
              >
                <option value="yil-azalan">Yıl (yeni → eski)</option>
                <option value="yil-artan">Yıl (eski → yeni)</option>
                <option value="fiyat-artan">Fiyat (düşük → yüksek)</option>
                <option value="fiyat-azalan">Fiyat (yüksek → düşük)</option>
                <option value="km-artan">Km (az → çok)</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {goruntulenecek.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <p className="font-medium text-gray-600 mb-1">Araç bulunamadı</p>
              <p className="text-sm">Filtreleri değiştirerek tekrar deneyin.</p>
              <button
                onClick={() => setFiltreler(bosFiltreler)}
                className="mt-4 text-sm text-amber-600 font-medium hover:text-amber-700"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {goruntulenecek.map((arac) => {
                const satildi = arac.durum === "satildi";
                return (
                  <div
                    key={arac.id}
                    className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
                      satildi ? "opacity-60" : "hover:shadow-lg"
                    }`}
                  >
                    {/* Fotoğraf */}
                    <div className="relative bg-gray-100 h-44 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        {arac.yil}
                      </div>
                      <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg ${durumRenk[arac.durum]}`}>
                        {durumEtiket[arac.durum]}
                      </div>
                    </div>

                    {/* İçerik */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-base">
                        {arac.marka} {arac.model}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[arac.yakit, arac.vites, arac.kasa, arac.renk].map((etiket) => (
                          <span key={etiket} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">
                            {etiket}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {formatKm(arac.km)}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-400 font-medium">Fiyat</div>
                          <div className="text-lg font-bold text-gray-900 mt-0.5">
                            {formatFiyat(arac.fiyat)}
                          </div>
                        </div>
                        {!satildi && (
                          <Link
                            href={`/araclar/${arac.id}`}
                            className="px-4 py-2 text-sm font-semibold bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors"
                          >
                            İncele
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
