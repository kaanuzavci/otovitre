"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";

/* ── Tipler ─────────────────────────────────── */

type Durum      = "aktif" | "satildi" | "rezerve";
type HasarDurum = "orijinal" | "boyali" | "lokal_boyali" | "degisen";

/* ── Sabitler ────────────────────────────────── */

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

/* ── Mevcut araç verisi (Supabase'den gelecek) ── */

type MevcutArac = {
  marka: string; model: string; yil: number; km: number;
  renk: string; motorHacmi: string; kasaTipi: string;
  yakitTipi: string; vites: string; fiyat: number;
  durum: Durum; oneCikan: boolean;
  sahibindenLink: string; aciklama: string;
  donanim: string[];
  hasar: Record<string, HasarDurum>;
  hasarNot: Record<string, string>;
};

const mevcutAraclar: Record<string, MevcutArac> = {
  "1": {
    marka: "Toyota", model: "Corolla", yil: 2021, km: 48000,
    renk: "Beyaz", motorHacmi: "1.6", kasaTipi: "Sedan",
    yakitTipi: "Benzin", vites: "Otomatik", fiyat: 1250000,
    durum: "aktif", oneCikan: true,
    sahibindenLink: "https://sahibinden.com",
    aciklama: "Bakımları yetkili serviste yapılmış, hasarsız, boyasız araç.",
    donanim: ["Geri Görüş Kamerası", "Park Sensörü (Arka)", "Cruise Control", "Otomatik Klima", "Bluetooth", "USB Bağlantı", "LED Farlar", "Start/Stop Sistemi"],
    hasar: { ...Object.fromEntries(PARCALAR.map(p => [p, "orijinal" as HasarDurum])), "Arka Bagaj": "boyali" },
    hasarNot: { ...Object.fromEntries(PARCALAR.map(p => [p, ""])), "Arka Bagaj": "Küçük çizik tamiri" },
  },
  "2": {
    marka: "Honda", model: "Civic", yil: 2020, km: 62000,
    renk: "Siyah", motorHacmi: "1.5 Turbo", kasaTipi: "Sedan",
    yakitTipi: "Benzin", vites: "Otomatik", fiyat: 1100000,
    durum: "aktif", oneCikan: true,
    sahibindenLink: "",
    aciklama: "Türkiye'de satılan Civic. Servis bakımları Honda yetkili serviste yapılmıştır.",
    donanim: ["Geri Görüş Kamerası", "Park Sensörü (Arka)", "Isıtmalı Ön Koltuklar", "Sunroof", "Apple CarPlay", "Android Auto", "LED Farlar"],
    hasar: { ...Object.fromEntries(PARCALAR.map(p => [p, "orijinal" as HasarDurum])), "Ön Sol Çamurluk": "lokal_boyali" },
    hasarNot: { ...Object.fromEntries(PARCALAR.map(p => [p, ""])), "Ön Sol Çamurluk": "Küçük taş izi temizliği" },
  },
  "3": {
    marka: "Volkswagen", model: "Passat", yil: 2022, km: 31000,
    renk: "Gümüş", motorHacmi: "2.0 TDI", kasaTipi: "Sedan",
    yakitTipi: "Dizel", vites: "Otomatik", fiyat: 1650000,
    durum: "aktif", oneCikan: true,
    sahibindenLink: "https://sahibinden.com",
    aciklama: "Business paket. Periyodik bakımlar VW yetkili servisinde yapılmıştır.",
    donanim: ["Adaptif Cruise Control", "Head-Up Display", "Panoramik Cam Tavan", "Isıtmalı Ön Koltuklar", "Koltuk Hafızası", "360° Kamera", "Kablosuz Şarj", "Harman Kardon / Bose Ses Sistemi"],
    hasar: Object.fromEntries(PARCALAR.map(p => [p, "orijinal" as HasarDurum])),
    hasarNot: Object.fromEntries(PARCALAR.map(p => [p, ""])),
  },
};

/* ── Stil yardımcıları ───────────────────────── */

const inputCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors";
const selectCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Section({ baslik, aciklama, children }: {
  baslik: string; aciklama?: string; children: React.ReactNode;
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

/* ── Ana Bileşen ─────────────────────────────── */

type FormState = {
  marka: string; model: string; yil: number; km: string;
  renk: string; motorHacmi: string; kasaTipi: string;
  yakitTipi: string; vites: string; fiyat: string;
  durum: Durum; oneCikan: boolean;
  sahibindenLink: string; aciklama: string;
};

export default function AracDuzenlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const mevcut = mevcutAraclar[id];

  const [form, setForm] = useState<FormState>(() =>
    mevcut
      ? {
          marka: mevcut.marka, model: mevcut.model,
          yil: mevcut.yil, km: String(mevcut.km),
          renk: mevcut.renk, motorHacmi: mevcut.motorHacmi,
          kasaTipi: mevcut.kasaTipi, yakitTipi: mevcut.yakitTipi,
          vites: mevcut.vites, fiyat: String(mevcut.fiyat),
          durum: mevcut.durum, oneCikan: mevcut.oneCikan,
          sahibindenLink: mevcut.sahibindenLink,
          aciklama: mevcut.aciklama,
        }
      : {
          marka: "", model: "", yil: new Date().getFullYear(), km: "",
          renk: "", motorHacmi: "", kasaTipi: "Sedan",
          yakitTipi: "Benzin", vites: "Otomatik", fiyat: "",
          durum: "aktif", oneCikan: false, sahibindenLink: "", aciklama: "",
        }
  );

  const [donanim, setDonanim]   = useState<string[]>(mevcut?.donanim ?? []);
  const [hasar, setHasar]       = useState<Record<string, HasarDurum>>(
    mevcut?.hasar ?? Object.fromEntries(PARCALAR.map(p => [p, "orijinal" as HasarDurum]))
  );
  const [hasarNot, setHasarNot] = useState<Record<string, string>>(
    mevcut?.hasarNot ?? Object.fromEntries(PARCALAR.map(p => [p, ""]))
  );
  const [fotolar, setFotolar]   = useState<File[]>([]);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [basari, setBasari]     = useState(false);
  const dosyaRef = useRef<HTMLInputElement>(null);

  function setF<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function toggleDonanim(d: string) {
    setDonanim(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  }

  function fotoEkle(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setFotolar(prev => [...prev, ...files].slice(0, 20));
  }

  function fotoKaldir(i: number) {
    setFotolar(prev => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setKaydediliyor(true);
    await new Promise(r => setTimeout(r, 900));
    setKaydediliyor(false);
    setBasari(true);
  }

  const baslik = mevcut ? `${mevcut.marka} ${mevcut.model}` : `Araç #${id}`;

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased">

      {/* TOPBAR */}
      <header className="sticky top-0 z-20 bg-gray-900 border-b border-white/5 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/araclar"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Geri
          </Link>
          <span className="text-gray-600">|</span>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-white truncate">{baslik}</h1>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Düzenle</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/araclar/${id}`}
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-200 hover:bg-white/5 rounded-xl transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            İlanı Gör
          </Link>
          <button
            form="duzenle-form"
            type="submit"
            disabled={kaydediliyor}
            className="flex items-center gap-2 px-5 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {kaydediliyor ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
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

      {/* BAŞARI */}
      {basari && (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm font-medium">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Değişiklikler kaydedildi.
            <button onClick={() => setBasari(false)} className="ml-auto text-green-500 hover:text-green-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ARAÇ BULUNAMADI */}
      {!mevcut && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl px-5 py-4 text-sm text-amber-400 font-medium">
            Bu araç veritabanında bulunamadı. Supabase bağlantısı kurulunca gerçek veriler yüklenecek.
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        id="duzenle-form"
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-6 py-6 space-y-5"
      >
        {/* 1. Temel Bilgiler */}
        <Section baslik="Temel Bilgiler">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Marka" required>
              <input className={inputCls} required placeholder="Toyota"
                value={form.marka} onChange={e => setF("marka", e.target.value)} />
            </Field>
            <Field label="Model" required>
              <input className={inputCls} required placeholder="Corolla"
                value={form.model} onChange={e => setF("model", e.target.value)} />
            </Field>
            <Field label="Yıl" required>
              <input type="number" className={inputCls} required
                min={1990} max={new Date().getFullYear() + 1}
                value={form.yil} onChange={e => setF("yil", parseInt(e.target.value))} />
            </Field>
            <Field label="Kilometre" required>
              <input type="number" className={inputCls} required placeholder="48000" min={0}
                value={form.km} onChange={e => setF("km", e.target.value)} />
            </Field>
            <Field label="Renk">
              <input className={inputCls} placeholder="Beyaz"
                value={form.renk} onChange={e => setF("renk", e.target.value)} />
            </Field>
            <Field label="Motor Hacmi">
              <input className={inputCls} placeholder="1.6"
                value={form.motorHacmi} onChange={e => setF("motorHacmi", e.target.value)} />
            </Field>
            <Field label="Kasa Tipi" required>
              <select className={selectCls} value={form.kasaTipi} onChange={e => setF("kasaTipi", e.target.value)}>
                {KASA_TIPLERI.map(k => <option key={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Yakıt Tipi" required>
              <select className={selectCls} value={form.yakitTipi} onChange={e => setF("yakitTipi", e.target.value)}>
                {YAKIT_TIPLERI.map(y => <option key={y}>{y}</option>)}
              </select>
            </Field>
            <Field label="Vites" required>
              <select className={selectCls} value={form.vites} onChange={e => setF("vites", e.target.value)}>
                {VITES_TIPLERI.map(v => <option key={v}>{v}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        {/* 2. Fiyat & Durum */}
        <Section baslik="Fiyat & Durum">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Fiyat (₺)" required>
              <input type="number" className={inputCls} required placeholder="1250000" min={0}
                value={form.fiyat} onChange={e => setF("fiyat", e.target.value)} />
            </Field>
            <Field label="Durum">
              <select className={selectCls} value={form.durum} onChange={e => setF("durum", e.target.value as Durum)}>
                <option value="aktif">Aktif — Satışta</option>
                <option value="rezerve">Rezerve</option>
                <option value="satildi">Satıldı</option>
              </select>
            </Field>
            <Field label="Sahibinden.com Linki" hint="İlan sayfasının tam URL'si (opsiyonel)">
              <input type="url" className={inputCls} placeholder="https://sahibinden.com/ilan/..."
                value={form.sahibindenLink} onChange={e => setF("sahibindenLink", e.target.value)} />
            </Field>
            <Field label="Öne Çıkan">
              <button type="button" onClick={() => setF("oneCikan", !form.oneCikan)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.oneCikan
                    ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                    : "bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500"
                }`}>
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
          <textarea className={`${inputCls} resize-none`} rows={4}
            placeholder="Araç hakkında detaylı bilgi…"
            value={form.aciklama} onChange={e => setF("aciklama", e.target.value)} />
        </Section>

        {/* 4. Fotoğraflar */}
        <Section baslik="Fotoğraflar" aciklama="İlk fotoğraf kapak görseli olarak kullanılır. Yeni fotoğraf eklediğinizde mevcut listeye eklenir.">
          {mevcut && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative group aspect-square bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  {i === 0 && (
                    <div className="absolute bottom-1 left-1 bg-amber-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      Kapak
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" className="text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div onClick={() => dosyaRef.current?.click()}
            className="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-400/60 hover:bg-amber-400/5 transition-all">
            <svg className="w-7 h-7 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm font-medium text-gray-300">Yeni fotoğraf ekle</p>
            <p className="text-xs text-gray-500 mt-0.5">JPG, PNG — maks. 10 MB</p>
            <input ref={dosyaRef} type="file" accept="image/*" multiple className="hidden" onChange={fotoEkle} />
          </div>

          {fotolar.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-3">
              {fotolar.map((f, i) => (
                <div key={i} className="relative group aspect-square bg-gray-700 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => fotoKaldir(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* 5. Donanım */}
        <Section baslik="Donanım" aciklama="Araçta bulunan özellikleri işaretleyin.">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
            {DONANIM_LISTESI.map(d => (
              <label key={d} className="flex items-center gap-2.5 cursor-pointer group py-1">
                <input type="checkbox" checked={donanim.includes(d)} onChange={() => toggleDonanim(d)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-amber-500" />
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{d}</span>
              </label>
            ))}
          </div>
          {donanim.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs font-medium text-gray-500 mb-2">{donanim.length} özellik seçildi</p>
              <div className="flex flex-wrap gap-1.5">
                {donanim.map(d => (
                  <span key={d} className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2.5 py-1 rounded-lg font-medium">{d}</span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 6. Boya & Ekspertiz */}
        <Section baslik="Boya & Ekspertiz" aciklama="Her parça için durumu seçin.">
          <div className="flex flex-wrap gap-2 mb-5">
            {HASAR_DURUMLARI.map(d => (
              <span key={d.value} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${d.renk}`}>{d.label}</span>
            ))}
          </div>
          <div className="space-y-2">
            {PARCALAR.map(parca => {
              const durumBilgi = HASAR_DURUMLARI.find(d => d.value === hasar[parca])!;
              return (
                <div key={parca} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                  <span className="text-sm font-medium text-gray-300 w-40 shrink-0">{parca}</span>
                  <select value={hasar[parca]}
                    onChange={e => setHasar(prev => ({ ...prev, [parca]: e.target.value as HasarDurum }))}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer ${durumBilgi.renk}`}>
                    {HASAR_DURUMLARI.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  {hasar[parca] !== "orijinal" && (
                    <input type="text" placeholder="Not ekle (opsiyonel)"
                      value={hasarNot[parca]}
                      onChange={e => setHasarNot(prev => ({ ...prev, [parca]: e.target.value }))}
                      className="flex-1 text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30" />
                  )}
                </div>
              );
            })}
          </div>
          {Object.values(hasar).some(d => d !== "orijinal") && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs font-medium text-gray-500 mb-2">Orijinal olmayan parçalar</p>
              <div className="flex flex-wrap gap-1.5">
                {PARCALAR.filter(p => hasar[p] !== "orijinal").map(p => {
                  const d = HASAR_DURUMLARI.find(x => x.value === hasar[p])!;
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
        <div className="flex items-center justify-between pb-8">
          <Link href="/admin/araclar" className="text-sm text-gray-500 hover:text-gray-200 transition-colors">
            ← Değişiklikleri iptal et
          </Link>
          <button type="submit" disabled={kaydediliyor}
            className="flex items-center gap-2 px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 text-sm">
            {kaydediliyor ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
