"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

type FormDurum = "bos" | "gonderiliyor" | "basarili" | "hata";

const ILETISIM_BILGI = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
    ),
    baslik: "Telefon",
    deger: "0532 000 00 00",
    href: "tel:05320000000",
    alt: "Hergün 09:00 – 20:00",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    baslik: "WhatsApp",
    deger: "0532 000 00 00",
    href: "https://wa.me/905320000000",
    alt: "Hızlı yanıt",
    isWhatsapp: true,
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    ),
    baslik: "E-posta",
    deger: "info@otovitre.com",
    href: "mailto:info@otovitre.com",
    alt: "24 saat içinde yanıt",
  },
  {
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </>
    ),
    baslik: "Adres",
    deger: "Atatürk Cad. No:1",
    href: "https://maps.google.com/?q=Ataşehir,İstanbul",
    alt: "Kadıköy, İstanbul",
  },
];

const CALISMA_SAATLERI = [
  { gun: "Pazartesi – Cuma",  saat: "09:00 – 19:00" },
  { gun: "Cumartesi",         saat: "09:00 – 18:00" },
  { gun: "Pazar",             saat: "Kapalı"         },
];

export default function IletisimPage() {
  const [form, setForm] = useState({ ad: "", telefon: "", konu: "", mesaj: "" });
  const [durum, setDurum] = useState<FormDurum>("bos");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.ad.trim() || !form.telefon.trim() || !form.mesaj.trim()) return;
    setDurum("gonderiliyor");
    await new Promise((r) => setTimeout(r, 1200));
    setDurum("basarili");
    setForm({ ad: "", telefon: "", konu: "", mesaj: "" });
    setTimeout(() => setDurum("bos"), 5000);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <FadeIn>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">İletişim</p>
            <h1 className="text-4xl font-bold mb-3">Bizimle İletişime Geçin</h1>
            <p className="text-gray-400 text-sm max-w-md">
              Araç hakkında soru sormak, ziyaret planlamak veya takas için bize ulaşın.
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── FORM ── */}
          <FadeIn className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-6">Mesaj Gönderin</h2>

              {durum === "basarili" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p className="text-sm text-green-700 font-medium">Mesajınız alındı! En kısa sürede dönüş yapacağız.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ad Soyad *</label>
                    <input
                      type="text" name="ad" value={form.ad} onChange={handleChange}
                      placeholder="Örn: Ahmet Yılmaz" required
                      className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Telefon *</label>
                    <input
                      type="tel" name="telefon" value={form.telefon} onChange={handleChange}
                      placeholder="0532 000 00 00" required
                      className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Konu</label>
                  <select
                    name="konu" value={form.konu} onChange={handleChange}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors"
                  >
                    <option value="">Konu seçin (isteğe bağlı)</option>
                    <option value="Araç Hakkında Bilgi">Araç Hakkında Bilgi</option>
                    <option value="Ziyaret Planlamak">Ziyaret Planlamak</option>
                    <option value="Takas">Takas</option>
                    <option value="Özel Araç Talebi">Özel Araç Talebi</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mesaj *</label>
                  <textarea
                    name="mesaj" value={form.mesaj} onChange={handleChange}
                    rows={5} required
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={durum === "gonderiliyor"}
                  className="w-full py-3.5 bg-amber-400 text-gray-900 text-sm font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {durum === "gonderiliyor" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"/>
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : (
                    "Mesaj Gönder"
                  )}
                </button>
              </form>
            </div>
          </FadeIn>

          {/* ── BİLGİLER ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* İletişim bilgileri */}
            <FadeIn delay={100}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  {ILETISIM_BILGI.map((b) => (
                    <a
                      key={b.baslik}
                      href={b.href}
                      target={b.href.startsWith("http") ? "_blank" : undefined}
                      rel={b.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                        {b.isWhatsapp ? (
                          b.icon
                        ) : (
                          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            {b.icon}
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{b.baslik}</p>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">{b.deger}</p>
                        {b.alt && <p className="text-xs text-gray-500 mt-0.5">{b.alt}</p>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Çalışma Saatleri */}
            <FadeIn delay={200}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4">Çalışma Saatleri</h2>
                <div className="space-y-3">
                  {CALISMA_SAATLERI.map((s) => (
                    <div key={s.gun} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{s.gun}</span>
                      <span className={`font-semibold ${s.saat === "Kapalı" ? "text-red-500" : "text-gray-900"}`}>
                        {s.saat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Harita */}
            <FadeIn delay={300}>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-44 flex flex-col items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-700">Atatürk Cad. No:1</p>
                  <p className="text-xs text-gray-500">Kadıköy, İstanbul</p>
                </div>
                <div className="p-4">
                  <a
                    href="https://maps.google.com/?q=Kadıköy,İstanbul"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Google Maps&apos;te Aç
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
