import FadeIn from '@/components/FadeIn';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import OneCikanAracKarti from '@/components/OneCikanAracKarti';

const onecikaranAraclar = [
  { id: "1", marka: "Toyota",     model: "Corolla",  yil: 2021, km: 48_000, fiyat: 1_250_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Beyaz"   },
  { id: "6", marka: "BMW",        model: "3 Serisi", yil: 2021, km: 42_000, fiyat: 2_100_000, yakit: "Benzin", vites: "Otomatik", kasa: "Sedan",     renk: "Beyaz"   },
  { id: "12",marka: "Toyota",     model: "RAV4",     yil: 2023, km:  5_000, fiyat: 2_200_000, yakit: "Hibrit", vites: "Otomatik", kasa: "SUV",       renk: "Gri"     },
];

const istatistikler = [
  { sayi: "10+",  etiket: "Yıl Deneyim"       },
  { sayi: "500+", etiket: "Satılan Araç"       },
  { sayi: "50+",  etiket: "Aktif İlan"         },
  { sayi: "%100", etiket: "Şeffaf Ekspertiz"   },
];


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">

      <Navbar />

      {/* ── HERO ── */}
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
              <Link
                href="/araclar"
                className="px-6 py-3 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Araçları İncele
              </Link>
              <Link
                href="/iletisim"
                className="px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Bize Ulaşın
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── İSTATİSTİKLER ── */}
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

      {/* ── NEDEN OTOVITRE ── */}
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
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                ),
                baslik: "Güvenilir Ekspertiz",
                aciklama: "Her araç uzman ekibimiz tarafından detaylı ekspertizden geçirilir. Boya ve değişen bilgileri hiçbir şey gizlenmeden paylaşılır.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                ),
                baslik: "Şeffaf Fiyatlandırma",
                aciklama: "Gizli ücret yoktur. Fiyat geçmişi takip edilir, düşüşler açıkça gösterilir. Ne görüyorsanız onu ödersiniz.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                ),
                baslik: "Kolay İletişim",
                aciklama: "Telefon veya WhatsApp üzerinden anında ulaşın. Sorularınıza hızlı ve dürüst yanıt veriyoruz.",
              },
            ].map((kart, i) => (
              <FadeIn key={kart.baslik} delay={i * 150}>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      {kart.icon}
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{kart.baslik}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{kart.aciklama}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="text-center mt-10">
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
              >
                Hikayemizi okuyun →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ÖNE ÇIKAN ARAÇLAR ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Araçlar</h2>
                <p className="text-gray-500 mt-2 text-sm">Güncel stoğumuzdan seçkin araçlar</p>
              </div>
              <Link href="/araclar" className="hidden sm:inline-flex text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                Tüm araçları gör →
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6">
            {onecikaranAraclar.map((arac, index) => (
              <OneCikanAracKarti key={arac.id} arac={arac} delay={index * 150} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/araclar" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
              Tüm araçları gör →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section className="bg-amber-400 py-16 px-6">
        <FadeIn>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Aradığınız aracı bulamadınız mı?</h3>
              <p className="text-gray-700 mt-1 text-sm">WhatsApp&apos;tan yazın, size özel araç bulalım.</p>
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

      <Footer />
    </div>
  );
}
