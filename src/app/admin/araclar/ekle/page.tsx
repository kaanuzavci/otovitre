"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/* ── Sabitler ────────────────────────────────── */

type Durum      = "aktif" | "satildi" | "rezerve";
type HasarDurum = "orijinal" | "boyali" | "lokal_boyali" | "degisen";

const KASA_TIPLERI   = ["Sedan", "Hatchback", "SUV", "Coupe", "Cabrio", "Pickup", "Minivan"];
const YAKIT_TIPLERI  = ["Benzin", "Dizel", "LPG", "Hibrit", "Elektrik"];
const VITES_TIPLERI  = ["Otomatik", "Manuel", "Yarı Otomatik (CVT)"];

const DONANIM_LISTESI = [
  "Geri Görüş Kamerası", "360° Kamera",
  "Park Sensörü (Ön)", "Park Sensörü (Arka)",
  "Cruise Control", "Adaptif Cruise Control",
  "Otomatik Klima", "İki Bölgeli Klima",
  "Isıtmalı Ön Koltuklar", "Isıtmalı Arka Koltuklar",
  "Ventilasyonlu Koltuklar", "Koltuk Hafızası",
  "Sunroof", "Panoramik Cam Tavan",
  "Apple CarPlay", "Android Auto",
  "Bluetooth", "USB Bağlantı", "Kablosuz Şarj",
  "LED Farlar", "Matrix LED Farlar",
  "Head-Up Display", "Navigasyon",
  "Start/Stop Sistemi", "Keyless Go",
  "Elektrikli Bagaj Kapağı",
  "Harman Kardon / Bose Ses Sistemi",
  "Şerit Takip Sistemi", "Kör Nokta Uyarısı",
];

const PARCALAR = [
  "Ön Kaput",
  "Ön Sol Çamurluk", "Ön Sağ Çamurluk",
  "Sol Ön Kapı",     "Sağ Ön Kapı",
  "Sol Arka Kapı",   "Sağ Arka Kapı",
  "Tavan",
  "Arka Bagaj",
  "Arka Sol Çamurluk", "Arka Sağ Çamurluk",
];

const HASAR_DURUMLARI: { value: HasarDurum; label: string; renk: string }[] = [
  { value: "orijinal",     label: "Orijinal",     renk: "text-green-400  bg-green-500/10  border-green-500/20"  },
  { value: "boyali",       label: "Boyalı",       renk: "text-amber-400  bg-amber-500/10  border-amber-500/20"  },
  { value: "lokal_boyali", label: "Lokal Boyalı", renk: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { value: "degisen",      label: "Değişen",      renk: "text-red-400    bg-red-500/10    border-red-500/20"    },
];

/* ── Stil yardımcıları ───────────────────────── */

const inputCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors";
const selectCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Section({
  baslik,
  aciklama,
  children,
}: {
  baslik: string;
  aciklama?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 rounded-2xl border border-white/5 p-6">
      <div className="mb-5">
        <h2 className="font-bold text-white">{baslik}</h2>
        {aciklama && <p className="text-sm text-gray-500 mt-0.5">{aciklama}</p>}
      </div>
      {children}
    </div>
  );
}

/* ── Bileşen ─────────────────────────────────── */

type FormState = {
  marka: string; model: string; yil: number; km: string;
  renk: string; motorHacmi: string; kasaTipi: string;
  yakitTipi: string; vites: string; fiyat: string;
  durum: Durum; oneCikan: boolean;
  sahibindenLink: string; aciklama: string;
};

const bosForm: FormState = {
  marka: "", model: "", yil: new Date().getFullYear(), km: "",
  renk: "", motorHacmi: "", kasaTipi: "Sedan",
  yakitTipi: "Benzin", vites: "Otomatik", fiyat: "",
  durum: "aktif", oneCikan: false,
  sahibindenLink: "", aciklama: "",
};

export default function AracEklePage() {
  const [form, setForm]         = useState<FormState>(bosForm);
  const [donanim, setDonanim]   = useState<string[]>([]);
  const [hasar, setHasar]       = useState<Record<string, HasarDurum>>(
    () => Object.fromEntries(PARCALAR.map((p) => [p, "orijinal" as HasarDurum]))
  );
  const [hasarNot, setHasarNot] = useState<Record<string, string>>(
    () => Object.fromEntries(PARCALAR.map((p) => [p, ""]))
  );
  const [fotolar, setFotolar]   = useState<File[]>([]);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [basari, setBasari]     = useState(false);
  const dosyaRef = useRef<HTMLInputElement>(null);

  function setF<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function toggleDonanim(d: string) {
    setDonanim((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  function fotoEkle(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setFotolar((prev) => [...prev, ...files].slice(0, 20));
  }

  function fotoKaldir(i: number) {
    setFotolar((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setKaydediliyor(true);
    await new Promise((r) => setTimeout(r, 1000));
    setKaydediliyor(false);
    setBasari(true);
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-20 bg-gray-900 border-b border-white/5 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/araclar"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Geri
          </Link>
          <span className="text-gray-600">|</span>
          <h1 className="text-sm font-bold text-white">Yeni Araç Ekle</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setForm(bosForm)}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-200 hover:bg-white/5 rounded-xl transition-colors"
          >
            Temizle
          </button>
          <button
            form="arac-form"
            type="submit"
            disabled={kaydediliyor}
            className="flex items-center gap-2 px-5 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {kaydediliyor ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Kaydediliyor…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Kaydet
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── BAŞARI MESAJI ── */}
      {basari && (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm font-medium">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Araç başarıyla kaydedildi. (Supabase entegrasyonu tamamlanınca gerçek kayıt yapılacak.)
            <button onClick={() => setBasari(false)} className="ml-auto text-green-500 hover:text-green-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── FORM ── */}
      <form
        id="arac-form"
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-6 py-6 space-y-5"
      >
        {/* 1. Temel Bilgiler */}
        <Section baslik="Temel Bilgiler">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Marka" required>
              <input
                className={inputCls} required placeholder="Toyota"
                value={form.marka} onChange={(e) => setF("marka", e.target.value)}
              />
            </Field>
            <Field label="Model" required>
              <input
                className={inputCls} required placeholder="Corolla"
                value={form.model} onChange={(e) => setF("model", e.target.value)}
              />
            </Field>
            <Field label="Yıl" required>
              <input
                type="number" className={inputCls} required
                min={1990} max={new Date().getFullYear() + 1}
                value={form.yil} onChange={(e) => setF("yil", parseInt(e.target.value))}
              />
            </Field>
            <Field label="Kilometre" required>
              <input
                type="number" className={inputCls} required
                placeholder="48000" min={0}
                value={form.km} onChange={(e) => setF("km", e.target.value)}
              />
            </Field>
            <Field label="Renk">
              <input
                className={inputCls} placeholder="Beyaz"
                value={form.renk} onChange={(e) => setF("renk", e.target.value)}
              />
            </Field>
            <Field label="Motor Hacmi">
              <input
                className={inputCls} placeholder="1.6"
                value={form.motorHacmi} onChange={(e) => setF("motorHacmi", e.target.value)}
              />
            </Field>
            <Field label="Kasa Tipi" required>
              <select className={selectCls} value={form.kasaTipi} onChange={(e) => setF("kasaTipi", e.target.value)}>
                {KASA_TIPLERI.map((k) => <option key={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Yakıt Tipi" required>
              <select className={selectCls} value={form.yakitTipi} onChange={(e) => setF("yakitTipi", e.target.value)}>
                {YAKIT_TIPLERI.map((y) => <option key={y}>{y}</option>)}
              </select>
            </Field>
            <Field label="Vites" required>
              <select className={selectCls} value={form.vites} onChange={(e) => setF("vites", e.target.value)}>
                {VITES_TIPLERI.map((v) => <option key={v}>{v}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        {/* 2. Fiyat & Durum */}
        <Section baslik="Fiyat & Durum">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Fiyat (₺)" required>
              <input
                type="number" className={inputCls} required
                placeholder="1250000" min={0}
                value={form.fiyat} onChange={(e) => setF("fiyat", e.target.value)}
              />
            </Field>
            <Field label="Durum">
              <select className={selectCls} value={form.durum} onChange={(e) => setF("durum", e.target.value as Durum)}>
                <option value="aktif">Aktif — Satışta</option>
                <option value="rezerve">Rezerve</option>
                <option value="satildi">Satıldı</option>
              </select>
            </Field>
            <Field label="Sahibinden.com Linki" hint="İlan sayfasının tam URL'si (opsiyonel)">
              <input
                type="url" className={inputCls}
                placeholder="https://sahibinden.com/ilan/..."
                value={form.sahibindenLink} onChange={(e) => setF("sahibindenLink", e.target.value)}
              />
            </Field>
            <Field label="Öne Çıkan">
              <button
                type="button"
                onClick={() => setF("oneCikan", !form.oneCikan)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.oneCikan
                    ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                    : "bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500"
                }`}
              >
                <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${form.oneCikan ? "bg-amber-400" : "bg-gray-600"}`}>
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${form.oneCikan ? "translate-x-4" : "translate-x-1"}`} />
                </span>
                {form.oneCikan ? "Ana sayfada gösteriliyor" : "Ana sayfada gösterilmiyor"}
              </button>
            </Field>
          </div>
        </Section>

        {/* 3. Açıklama */}
        <Section baslik="Açıklama">
          <textarea
            className={`${inputCls} resize-none min-h-[100px]`}
            rows={4}
            placeholder="Araç hakkında detaylı bilgi verin. Bakım geçmişi, özellikler, notlar…"
            value={form.aciklama}
            onChange={(e) => setF("aciklama", e.target.value)}
          />
        </Section>

        {/* 4. Fotoğraflar */}
        <Section
          baslik="Fotoğraflar"
          aciklama="İlk fotoğraf kapak görseli olarak kullanılır. Maksimum 20 adet."
        >
          <div
            onClick={() => dosyaRef.current?.click()}
            className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-amber-400/60 hover:bg-amber-400/5 transition-all"
          >
            <svg className="w-8 h-8 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-medium text-gray-300">Fotoğraf yüklemek için tıklayın</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG — maks. 10 MB / dosya</p>
            <input
              ref={dosyaRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={fotoEkle}
            />
          </div>

          {fotolar.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
              {fotolar.map((f, i) => (
                <div key={i} className="relative group aspect-square bg-gray-700 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <div className="absolute bottom-1 left-1 bg-amber-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      Kapak
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fotoKaldir(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => dosyaRef.current?.click()}
                className="aspect-square bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center hover:border-amber-400/60 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          )}
        </Section>

        {/* 5. Donanım */}
        <Section
          baslik="Donanım"
          aciklama="Araçta bulunan özellikleri işaretleyin."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
            {DONANIM_LISTESI.map((d) => (
              <label key={d} className="flex items-center gap-2.5 cursor-pointer group py-1">
                <input
                  type="checkbox"
                  checked={donanim.includes(d)}
                  onChange={() => toggleDonanim(d)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-amber-500"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                  {d}
                </span>
              </label>
            ))}
          </div>
          {donanim.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs font-medium text-gray-500 mb-2">{donanim.length} özellik seçildi</p>
              <div className="flex flex-wrap gap-1.5">
                {donanim.map((d) => (
                  <span key={d} className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-lg font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 6. Boya & Ekspertiz */}
        <Section
          baslik="Boya & Ekspertiz"
          aciklama="Her parça için durumu seçin. Not alanı opsiyoneldir."
        >
          <div className="flex flex-wrap gap-2 mb-5">
            {HASAR_DURUMLARI.map((d) => (
              <span key={d.value} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${d.renk}`}>
                {d.label}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {PARCALAR.map((parca) => {
              const durumBilgi = HASAR_DURUMLARI.find((d) => d.value === hasar[parca])!;
              return (
                <div key={parca} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-300 w-40 shrink-0">{parca}</span>
                  <select
                    value={hasar[parca]}
                    onChange={(e) =>
                      setHasar((prev) => ({ ...prev, [parca]: e.target.value as HasarDurum }))
                    }
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer ${durumBilgi.renk}`}
                  >
                    {HASAR_DURUMLARI.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  {hasar[parca] !== "orijinal" && (
                    <input
                      type="text"
                      placeholder="Not ekle (opsiyonel)"
                      value={hasarNot[parca]}
                      onChange={(e) =>
                        setHasarNot((prev) => ({ ...prev, [parca]: e.target.value }))
                      }
                      className="flex-1 text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {Object.values(hasar).some((d) => d !== "orijinal") && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs font-medium text-gray-500 mb-2">Orijinal olmayan parçalar</p>
              <div className="flex flex-wrap gap-1.5">
                {PARCALAR.filter((p) => hasar[p] !== "orijinal").map((p) => {
                  const d = HASAR_DURUMLARI.find((x) => x.value === hasar[p])!;
                  return (
                    <span key={p} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${d.renk}`}>
                      {p} — {d.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </Section>

        {/* Alt Kaydet */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={kaydediliyor}
            className="flex items-center gap-2 px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 text-sm"
          >
            {kaydediliyor ? "Kaydediliyor…" : "Aracı Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
