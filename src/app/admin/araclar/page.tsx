"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from '@/components/AdminSidebar';

/* ── Tipler ─────────────────────────────────── */

type Durum = "aktif" | "satildi" | "rezerve";

type Arac = {
  id: string; marka: string; model: string; yil: number;
  km: number; fiyat: number; yakit: string; vites: string;
  kasa: string; durum: Durum; oneCikan: boolean;
  guncelleme: string; guncellemeYapan: string;
};

/* ── Veri ────────────────────────────────────── */

const basAraclar: Arac[] = [
  { id: "1",  marka: "Toyota",        model: "Corolla",  yil: 2021, km: 48_000, fiyat: 1_250_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     durum: "aktif",   oneCikan: true,  guncelleme: "2026-05-15", guncellemeYapan: "Kaan U." },
  { id: "2",  marka: "Honda",         model: "Civic",    yil: 2020, km: 62_000, fiyat: 1_100_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     durum: "aktif",   oneCikan: true,  guncelleme: "2026-05-14", guncellemeYapan: "Kaan U." },
  { id: "3",  marka: "Volkswagen",    model: "Passat",   yil: 2022, km: 31_000, fiyat: 1_650_000, yakit: "Dizel",  vites: "Otomatik", kasa: "Sedan",     durum: "aktif",   oneCikan: true,  guncelleme: "2026-05-13", guncellemeYapan: "Kaan U." },
  { id: "4",  marka: "Ford",          model: "Focus",    yil: 2019, km: 85_000, fiyat:   850_000, yakit: "Benzin", vites: "Manuel",   kasa: "Hatchback", durum: "aktif",   oneCikan: false, guncelleme: "2026-05-12", guncellemeYapan: "Kaan U." },
  { id: "5",  marka: "Renault",       model: "Clio",     yil: 2023, km: 12_000, fiyat:   980_000, yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback", durum: "aktif",   oneCikan: false, guncelleme: "2026-05-10", guncellemeYapan: "Kaan U." },
  { id: "6",  marka: "BMW",           model: "3 Serisi", yil: 2021, km: 42_000, fiyat: 2_100_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     durum: "aktif",   oneCikan: false, guncelleme: "2026-05-09", guncellemeYapan: "Kaan U." },
  { id: "7",  marka: "Mercedes-Benz", model: "C180",     yil: 2020, km: 55_000, fiyat: 2_350_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     durum: "satildi", oneCikan: false, guncelleme: "2026-04-30", guncellemeYapan: "Kaan U." },
  { id: "8",  marka: "Hyundai",       model: "Tucson",   yil: 2022, km: 28_000, fiyat: 1_450_000, yakit: "Dizel",  vites: "Otomatik", kasa: "SUV",       durum: "aktif",   oneCikan: false, guncelleme: "2026-05-11", guncellemeYapan: "Kaan U." },
  { id: "9",  marka: "Kia",           model: "Sportage", yil: 2023, km:  8_000, fiyat: 1_580_000, yakit: "Benzin", vites: "Otomatik", kasa: "SUV",       durum: "rezerve", oneCikan: false, guncelleme: "2026-05-16", guncellemeYapan: "Kaan U." },
  { id: "10", marka: "Skoda",         model: "Octavia",  yil: 2021, km: 39_000, fiyat: 1_180_000, yakit: "Dizel",  vites: "Otomatik", kasa: "Sedan",     durum: "aktif",   oneCikan: false, guncelleme: "2026-05-08", guncellemeYapan: "Kaan U." },
  { id: "11", marka: "Seat",          model: "Leon",     yil: 2022, km: 21_000, fiyat: 1_050_000, yakit: "Benzin", vites: "Otomatik", kasa: "Hatchback", durum: "aktif",   oneCikan: false, guncelleme: "2026-05-07", guncellemeYapan: "Kaan U." },
  { id: "12", marka: "Toyota",        model: "RAV4",     yil: 2023, km:  5_000, fiyat: 2_200_000, yakit: "Hibrit", vites: "Otomatik", kasa: "SUV",       durum: "aktif",   oneCikan: false, guncelleme: "2026-05-17", guncellemeYapan: "Kaan U." },
];

/* ── Yardımcılar ─────────────────────────────── */

function formatFiyat(f: number) {
  return new Intl.NumberFormat("tr-TR").format(f);
}

const durumCls: Record<Durum, string> = {
  aktif:   "bg-green-500/15 text-green-400 border border-green-500/20",
  satildi: "bg-red-500/15   text-red-400   border border-red-500/20",
  rezerve: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
};
const durumEtiket: Record<Durum, string> = {
  aktif: "Aktif", satildi: "Satıldı", rezerve: "Rezerve",
};

type Filtre = "tumu" | Durum;

/* ── Ana Sayfa ───────────────────────────────── */

export default function AdminAraclarPage() {
  const [araclar, setAraclar]           = useState<Arac[]>(basAraclar);
  const [filtre, setFiltre]             = useState<Filtre>("tumu");
  const [fiyatDuzenle, setFiyatDuzenle] = useState<string | null>(null);
  const [geciciFiyat, setGeciciFiyat]   = useState("");
  const [silOnay, setSilOnay]           = useState<string | null>(null);
  const [mobilSidebar, setMobilSidebar] = useState(false);

  const gorunen = filtre === "tumu" ? araclar : araclar.filter((a) => a.durum === filtre);
  const sayilar = {
    tumu:    araclar.length,
    aktif:   araclar.filter((a) => a.durum === "aktif").length,
    satildi: araclar.filter((a) => a.durum === "satildi").length,
    rezerve: araclar.filter((a) => a.durum === "rezerve").length,
  };

  function fiyatBasla(a: Arac) { setFiyatDuzenle(a.id); setGeciciFiyat(String(a.fiyat)); }
  function fiyatKaydet(id: string) {
    const yeni = parseInt(geciciFiyat.replace(/\D/g, ""), 10);
    if (!isNaN(yeni) && yeni > 0)
      setAraclar((prev) => prev.map((a) => a.id === id ? { ...a, fiyat: yeni } : a));
    setFiyatDuzenle(null);
  }
  function durumDegistir(id: string, d: Durum) {
    setAraclar((prev) => prev.map((a) => a.id === id ? { ...a, durum: d } : a));
  }
  function oneCikanToggle(id: string) {
    setAraclar((prev) => prev.map((a) => a.id === id ? { ...a, oneCikan: !a.oneCikan } : a));
  }
  function sil(id: string) { setAraclar((prev) => prev.filter((a) => a.id !== id)); setSilOnay(null); }

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased flex">
      <AdminSidebar mobilAcik={mobilSidebar} onKapat={() => setMobilSidebar(false)} />

      <div className="flex-1 min-w-0 flex flex-col">

        {/* Topbar */}
        <header className="bg-gray-900 border-b border-white/5 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobilSidebar(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="text-sm font-bold text-white">Araçlar</h1>
          </div>
          <Link href="/admin/araclar/ekle"
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Araç
          </Link>
        </header>

        <div className="p-6 space-y-5">

          {/* İstatistik kartları */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["tumu", "aktif", "satildi", "rezerve"] as Filtre[]).map((f) => (
              <button key={f} onClick={() => setFiltre(f)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  filtre === f
                    ? "bg-amber-400/10 border-amber-400/40"
                    : "bg-gray-800 border-white/5 hover:border-white/10"
                }`}>
                <div className={`text-2xl font-bold ${filtre === f ? "text-amber-400" : "text-white"}`}>
                  {sayilar[f]}
                </div>
                <div className="text-xs text-gray-500 mt-1 capitalize">
                  {f === "tumu" ? "Toplam" : durumEtiket[f as Durum]}
                </div>
              </button>
            ))}
          </div>

          {/* Tablo */}
          <div className="bg-gray-800 rounded-2xl border border-white/5 overflow-hidden">

            {/* Filtre tab'ları */}
            <div className="border-b border-white/5 px-6 flex gap-1">
              {(["tumu", "aktif", "rezerve", "satildi"] as Filtre[]).map((f) => (
                <button key={f} onClick={() => setFiltre(f)}
                  className={`py-3.5 px-3 text-sm font-medium border-b-2 transition-colors ${
                    filtre === f
                      ? "border-amber-400 text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}>
                  {f === "tumu" ? "Tümü" : durumEtiket[f as Durum]}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    filtre === f ? "bg-amber-400/20 text-amber-400" : "bg-white/5 text-gray-500"
                  }`}>
                    {sayilar[f]}
                  </span>
                </button>
              ))}
            </div>

            {/* Tablo */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Araç</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">KM / Yakıt</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fiyat</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Öne Çıkan</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Güncelleme</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {gorunen.map((arac) => (
                    <tr key={arac.id} className="hover:bg-white/[0.02] transition-colors">

                      {/* Araç */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gray-700 rounded-xl shrink-0 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-white">{arac.marka} {arac.model}</div>
                            <div className="text-xs text-gray-500">{arac.yil} · {arac.vites} · {arac.kasa}</div>
                          </div>
                        </div>
                      </td>

                      {/* KM */}
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="text-gray-300">{new Intl.NumberFormat("tr-TR").format(arac.km)} km</div>
                        <div className="text-xs text-gray-600">{arac.yakit}</div>
                      </td>

                      {/* Fiyat inline */}
                      <td className="px-4 py-4">
                        {fiyatDuzenle === arac.id ? (
                          <div className="flex items-center gap-1.5">
                            <input type="number" value={geciciFiyat}
                              onChange={(e) => setGeciciFiyat(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") fiyatKaydet(arac.id); if (e.key === "Escape") setFiyatDuzenle(null); }}
                              autoFocus
                              className="w-28 text-sm bg-gray-700 border border-amber-400/60 text-white rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
                            <button onClick={() => fiyatKaydet(arac.id)} className="p-1 text-green-400 hover:text-green-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            </button>
                            <button onClick={() => setFiyatDuzenle(null)} className="p-1 text-gray-500 hover:text-gray-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => fiyatBasla(arac)}
                            className="group flex items-center gap-1.5 text-white font-semibold hover:text-amber-400 transition-colors">
                            {formatFiyat(arac.fiyat)} ₺
                            <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-amber-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                            </svg>
                          </button>
                        )}
                      </td>

                      {/* Durum */}
                      <td className="px-4 py-4">
                        <select value={arac.durum}
                          onChange={(e) => durumDegistir(arac.id, e.target.value as Durum)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer focus:outline-none bg-transparent border ${durumCls[arac.durum]}`}>
                          <option value="aktif"   className="bg-gray-800 text-white">Aktif</option>
                          <option value="rezerve" className="bg-gray-800 text-white">Rezerve</option>
                          <option value="satildi" className="bg-gray-800 text-white">Satıldı</option>
                        </select>
                      </td>

                      {/* Öne çıkan */}
                      <td className="px-4 py-4 text-center hidden lg:table-cell">
                        <button onClick={() => oneCikanToggle(arac.id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${arac.oneCikan ? "bg-amber-400" : "bg-gray-700"}`}>
                          <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${arac.oneCikan ? "translate-x-4" : "translate-x-1"}`} />
                        </button>
                      </td>

                      {/* Güncelleme */}
                      <td className="px-4 py-4 hidden xl:table-cell">
                        <div className="text-xs text-gray-400">{arac.guncelleme}</div>
                        <div className="text-xs text-gray-600">{arac.guncellemeYapan}</div>
                      </td>

                      {/* İşlemler */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/admin/araclar/${arac.id}/duzenle`}
                            className="p-2 text-gray-500 hover:text-gray-200 hover:bg-white/5 rounded-lg transition-colors" title="Düzenle">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                            </svg>
                          </Link>
                          <button onClick={() => setSilOnay(arac.id)}
                            className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Sil">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {gorunen.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-gray-600 text-sm">
                        Bu filtrede araç bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sil Modal */}
      {silOnay && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-gray-800 rounded-2xl border border-white/10 p-6 w-full max-w-sm shadow-2xl">
            <div className="w-10 h-10 bg-red-500/15 rounded-full flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="font-bold text-white mb-1">Aracı sil</h3>
            <p className="text-sm text-gray-400 mb-6">Bu araç kalıcı olarak silinecek. Geri alınamaz.</p>
            <div className="flex gap-3">
              <button onClick={() => setSilOnay(null)}
                className="flex-1 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/10 transition-colors">
                Vazgeç
              </button>
              <button onClick={() => sil(silOnay)}
                className="flex-1 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/30 transition-colors">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
