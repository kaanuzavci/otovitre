import FadeIn from '@/components/FadeIn';

const araclar = [
  {
    id: 1,
    marka: "Toyota",
    model: "Corolla",
    yil: 2021,
    km: 48_000,
    fiyat: 1_250_000,
    yakit: "Benzin",
    vites: "Otomatik",
    kasa: "Sedan",
  },
  {
    id: 2,
    marka: "Honda",
    model: "Civic",
    yil: 2020,
    km: 62_000,
    fiyat: 1_100_000,
    yakit: "Benzin",
    vites: "Otomatik",
    kasa: "Sedan",
  },
  {
    id: 3,
    marka: "Volkswagen",
    model: "Passat",
    yil: 2022,
    km: 31_000,
    fiyat: 1_650_000,
    yakit: "Dizel",
    vites: "Otomatik",
    kasa: "Sedan",
  },
];

const istatistikler = [
  { sayi: "10+", etiket: "Yıl Deneyim" },
  { sayi: "500+", etiket: "Satılan Araç" },
  { sayi: "50+", etiket: "Aktif İlan" },
  { sayi: "%100", etiket: "Şeffaf Ekspertiz" },
];

function formatFiyat(fiyat: number) {
  return new Intl.NumberFormat("tr-TR").format(fiyat) + " ₺";
}

function formatKm(km: number) {
  return new Intl.NumberFormat("tr-TR").format(km) + " km";
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">OtoVitre</span>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="/araclar" className="hover:text-gray-900 transition-colors">Araçlar</a>
            <a href="#hakkimizda" className="hover:text-gray-900 transition-colors">Hakkımızda</a>
            <a href="#iletisim" className="hover:text-gray-900 transition-colors">İletişim</a>
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

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-28 sm:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-amber-400/15 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block" />
              İstanbul&apos;un Güvenilir Araç Galerisi
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
              Güvenilir Araç Alım Satımında{" "}
              <span className="text-amber-400">10 Yıllık</span> Deneyim
            </h1>
          </FadeIn>

          <FadeIn delay={280}>
            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
              Her araç, teslim öncesinde kapsamlı ekspertiz sürecinden geçer.
              Boya, değişen, hasar — hepsi şeffaf şekilde paylaşılır.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/araclar"
                className="px-6 py-3 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Araçları İncele
              </a>
              <a
                href="#iletisim"
                className="px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Bize Ulaşın
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── İSTATİSTİKLER ──────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {istatistikler.map((s, index) => (
            <FadeIn key={s.etiket} delay={index * 100}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{s.sayi}</div>
                <div className="text-sm text-gray-500 mt-1.5">{s.etiket}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── NEDEN OTOVITRE ─────────────────────────────────── */}
      <section id="hakkimizda" className="bg-gray-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Neden OtoVitre?</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
                10 yıldır binlerce müşteriye hizmet veriyoruz. Güvenin temeli şeffaflıktır.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6">
            <FadeIn delay={0}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Güvenilir Ekspertiz</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Her araç uzman ekibimiz tarafından detaylı ekspertizden geçirilir.
                  Boya ve değişen bilgileri hiçbir şey gizlenmeden paylaşılır.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Şeffaf Fiyatlandırma</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Gizli ücret yoktur. Fiyat geçmişi takip edilir, düşüşler açıkça
                  gösterilir. Ne görüyorsanız onu ödersiniz.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Kolay İletişim</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Telefon veya WhatsApp üzerinden anında ulaşın. Sorularınıza
                  hızlı ve dürüst yanıt veriyoruz.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ÖNE ÇIKAN ARAÇLAR ──────────────────────────────── */}
      <section id="araclar" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Araçlar</h2>
                <p className="text-gray-500 mt-2 text-sm">Güncel stoğumuzdan seçkin araçlar</p>
              </div>
              <a
                href="/araclar"
                className="hidden sm:inline-flex text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
              >
                Tüm araçları gör →
              </a>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6">
            {araclar.map((arac, index) => (
              <FadeIn key={arac.id} delay={index * 150}>
                <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Fotoğraf alanı */}
                  <div className="relative bg-gray-100 h-52 flex items-center justify-center overflow-hidden">
                    <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    {/* Yıl rozeti */}
                    <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {arac.yil}
                    </div>
                  </div>

                  {/* Kart içeriği */}
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {arac.marka} {arac.model}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                            {arac.yakit}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                            {arac.vites}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                            {arac.kasa}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                      </svg>
                      {formatKm(arac.km)}
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400 font-medium">Fiyat</div>
                        <div className="text-xl font-bold text-gray-900 mt-0.5">
                          {formatFiyat(arac.fiyat)}
                        </div>
                      </div>
                      <a
                        href={`/araclar/${arac.id}`}
                        className="px-4 py-2 text-sm font-semibold bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors"
                      >
                        İncele
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a href="/araclar" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
              Tüm araçları gör →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ───────────────────────────────────── */}
      <section className="bg-amber-400 py-16 px-6">
        <FadeIn>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Aradığınız aracı bulamadınız mı?
              </h3>
              <p className="text-gray-700 mt-1 text-sm">
                WhatsApp&apos;tan yazın, size özel araç bulalım.
              </p>
            </div>
            <a
              href="https://wa.me/905320000000"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer id="iletisim" className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-12">
          <FadeIn delay={0}>
            <div>
              <span className="text-xl font-bold tracking-tight">OtoVitre</span>
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                10 yıllık deneyimimizle güvenilir araç alım satımında yanınızdayız.
                Şeffaflık ve müşteri memnuniyeti önceliğimizdir.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">
                Sayfalar
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/araclar" className="hover:text-white transition-colors">Araçlar</a></li>
                <li><a href="#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#iletisim" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">
                İletişim
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6v.75Z" />
                  </svg>
                  <span>0532 000 00 00</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span>info@otovitre.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>Atatürk Cad. No:1, İstanbul</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} OtoVitre. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

    </div>
  );
}
