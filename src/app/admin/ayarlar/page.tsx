"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

const inputCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors";

const textareaCls =
  "w-full text-sm bg-gray-700 border border-gray-600 text-white placeholder:text-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-colors resize-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
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
      <div className="mb-5 pb-4 border-b border-white/5">
        <h2 className="font-bold text-white">{baslik}</h2>
        {aciklama && <p className="text-sm text-gray-500 mt-0.5">{aciklama}</p>}
      </div>
      {children}
    </div>
  );
}

type Ayarlar = {
  galerinAdi: string;
  telefon: string;
  whatsapp: string;
  eposta: string;
  adres: string;
  calisma_saatleri: string;
  hakkimizda: string;
  vizyon: string;
  instagram: string;
  facebook: string;
  youtube: string;
  harita_link: string;
};

const varsayilan: Ayarlar = {
  galerinAdi: "OtoVitre",
  telefon: "0532 000 00 00",
  whatsapp: "905320000000",
  eposta: "info@otovitre.com",
  adres: "Atatürk Cad. No:1, Kadıköy / İstanbul",
  calisma_saatleri: "Pazartesi – Cumartesi: 09:00 – 19:00\nPazar: Kapalı",
  hakkimizda:
    "10 yıldır İstanbul'da güvenilir araç alım satımı yapıyoruz. Her araç teslim öncesinde kapsamlı ekspertiz sürecinden geçer; boya, değişen ve hasar bilgileri şeffaf şekilde paylaşılır.",
  vizyon:
    "İkinci el araç piyasasında şeffaflığı ve güveni ön plana çıkaran, müşterilerin en doğru kararı vermesine destek olan bir galeri olmak.",
  instagram: "",
  facebook: "",
  youtube: "",
  harita_link: "",
};

export default function AyarlarPage() {
  const [ayarlar, setAyarlar] = useState<Ayarlar>(varsayilan);
  const [mobilSidebar, setMobilSidebar] = useState(false);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [basari, setBasari] = useState(false);

  function set<K extends keyof Ayarlar>(key: K, value: Ayarlar[K]) {
    setAyarlar((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setKaydediliyor(true);
    await new Promise((r) => setTimeout(r, 800));
    setKaydediliyor(false);
    setBasari(true);
    setTimeout(() => setBasari(false), 4000);
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased flex">
      <AdminSidebar mobilAcik={mobilSidebar} onKapat={() => setMobilSidebar(false)} />

      <div className="flex-1 min-w-0 flex flex-col">

        {/* Topbar */}
        <header className="bg-gray-900 border-b border-white/5 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobilSidebar(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="text-sm font-bold text-white">Site Ayarları</h1>
          </div>

          <button
            form="ayarlar-form"
            type="submit"
            disabled={kaydediliyor}
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50"
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
        </header>

        <form id="ayarlar-form" onSubmit={handleSubmit} className="p-6 space-y-5 max-w-3xl">

          {/* Başarı mesajı */}
          {basari && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-4 py-3 text-sm font-medium">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Ayarlar kaydedildi. (Supabase entegrasyonu tamamlanınca gerçek kayıt yapılacak.)
            </div>
          )}

          {/* 1. Galeri Bilgileri */}
          <Section baslik="Galeri Bilgileri" aciklama="Siteye yansıyacak temel iletişim bilgileri.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Galeri Adı">
                <input className={inputCls} value={ayarlar.galerinAdi} onChange={(e) => set("galerinAdi", e.target.value)} />
              </Field>
              <Field label="Telefon">
                <input className={inputCls} placeholder="0532 000 00 00" value={ayarlar.telefon} onChange={(e) => set("telefon", e.target.value)} />
              </Field>
              <Field label="WhatsApp Numarası" hint="Ülke kodu ile birlikte, boşluksuz (ör: 905321234567)">
                <input className={inputCls} placeholder="905320000000" value={ayarlar.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
              </Field>
              <Field label="E-posta">
                <input type="email" className={inputCls} placeholder="info@otovitre.com" value={ayarlar.eposta} onChange={(e) => set("eposta", e.target.value)} />
              </Field>
              <Field label="Adres" hint="Footer ve iletişim bölümünde görünür">
                <input className={inputCls} placeholder="Atatürk Cad. No:1, İstanbul" value={ayarlar.adres} onChange={(e) => set("adres", e.target.value)} />
              </Field>
              <Field label="Çalışma Saatleri">
                <textarea
                  className={textareaCls}
                  rows={3}
                  placeholder={"Pzt–Cmt: 09:00 – 19:00\nPazar: Kapalı"}
                  value={ayarlar.calisma_saatleri}
                  onChange={(e) => set("calisma_saatleri", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          {/* 2. Hakkımızda */}
          <Section baslik="Hakkımızda & Vizyon" aciklama="Ana sayfada ve hakkımızda bölümünde görüntülenir.">
            <div className="space-y-4">
              <Field label="Hakkımızda Metni">
                <textarea
                  className={textareaCls}
                  rows={4}
                  value={ayarlar.hakkimizda}
                  onChange={(e) => set("hakkimizda", e.target.value)}
                />
              </Field>
              <Field label="Vizyon">
                <textarea
                  className={textareaCls}
                  rows={3}
                  value={ayarlar.vizyon}
                  onChange={(e) => set("vizyon", e.target.value)}
                />
              </Field>
            </div>
          </Section>

          {/* 3. Sosyal Medya */}
          <Section baslik="Sosyal Medya" aciklama="Boş bırakılan alanlar footer'da gösterilmez.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Instagram">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">instagram.com/</span>
                  <input
                    className={`${inputCls} pl-32`}
                    placeholder="galeri_adi"
                    value={ayarlar.instagram}
                    onChange={(e) => set("instagram", e.target.value)}
                  />
                </div>
              </Field>
              <Field label="Facebook">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">facebook.com/</span>
                  <input
                    className={`${inputCls} pl-28`}
                    placeholder="galeri_adi"
                    value={ayarlar.facebook}
                    onChange={(e) => set("facebook", e.target.value)}
                  />
                </div>
              </Field>
              <Field label="YouTube Kanalı">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">youtube.com/</span>
                  <input
                    className={`${inputCls} pl-28`}
                    placeholder="@galeri_adi"
                    value={ayarlar.youtube}
                    onChange={(e) => set("youtube", e.target.value)}
                  />
                </div>
              </Field>
            </div>
          </Section>

          {/* 4. Harita */}
          <Section baslik="Google Maps" aciklama="Google Maps'ten 'Bağlantıyı paylaş' seçeneğiyle alınan URL.">
            <Field label="Harita Linki" hint="İletişim bölümüne 'Haritada Gör' butonu olarak eklenir.">
              <input
                type="url"
                className={inputCls}
                placeholder="https://maps.google.com/?q=..."
                value={ayarlar.harita_link}
                onChange={(e) => set("harita_link", e.target.value)}
              />
            </Field>
          </Section>

          {/* Kaydet butonu (alt) */}
          <div className="flex justify-end pb-8">
            <button
              type="submit"
              disabled={kaydediliyor}
              className="flex items-center gap-2 px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 text-sm"
            >
              {kaydediliyor ? "Kaydediliyor…" : "Ayarları Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
