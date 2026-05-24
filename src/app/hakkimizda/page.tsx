import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const degerler = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    ),
    baslik: "Şeffaflık",
    aciklama: "Her araç hakkında tüm bilgileri — ekspertiz, boya geçmişi, hasar kaydı — açık ve dürüst şekilde paylaşırız. Müşterilerimiz bilinçli karar verir.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z" />
    ),
    baslik: "Güvenilirlik",
    aciklama: "Yıllar içinde binlerce müşteri bizimle çalışmayı tercih etti. Referanslarımız ve tekrarlanan müşterilerimiz en büyük gücümüzdür.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    ),
    baslik: "Kalite",
    aciklama: "Stoğumuzdaki her araç belirli kalite standartlarını karşılamalıdır. Düşük kaliteli veya problemli araçlar galerimizde yer almaz.",
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    ),
    baslik: "Müşteri Odaklılık",
    aciklama: "Satış sonrası destekten takas işlemlerine kadar her adımda yanınızdayız. Müşteri memnuniyeti işin en önemli parçasıdır.",
  },
];

const istatistikler = [
  { sayi: "2014",  etiket: "Kuruluş Yılı"        },
  { sayi: "500+",  etiket: "Satılan Araç"          },
  { sayi: "4.9★",  etiket: "Google Puanı"          },
  { sayi: "1.200+",etiket: "Mutlu Müşteri"         },
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">Hakkımızda</p>
            <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl leading-tight">
              İstanbul&apos;un Güvenilir Araç Galerisi
            </h1>
            <p className="mt-5 text-gray-400 max-w-xl text-base leading-relaxed">
              2014&apos;ten bu yana binlerce müşteriye hizmet veren OtoVitre, şeffaflık ve güven
              ilkeleriyle ikinci el araç alım satımını yeniden tanımlıyor.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── İSTATİSTİKLER ── */}
      <section className="bg-amber-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {istatistikler.map((s, i) => (
            <FadeIn key={s.etiket} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900">{s.sayi}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{s.etiket}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── HİKAYE ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p>
                    OtoVitre, 2014 yılında Kaan Uzavcı tarafından "ikinci el araç alımı güvenli olmalı"
                    mottosuyla kuruldu. İstanbul&apos;da başlayan bu yolculuk, bugün 1.200&apos;den fazla
                    mutlu müşteriyle devam ediyor.
                  </p>
                  <p>
                    Kuruluşumuzun temel ilkesi basitti: Her araç için tam şeffaflık. Ekspertiz raporları,
                    boya geçmişi, hasar kayıtları — hepsi gizlemeksizin paylaşılır. Müşterilerimiz
                    bildikleri için güvenir, güvendikleri için tekrar gelir.
                  </p>
                  <p>
                    Bugün, yetkili servis bakımlı ve kapsamlı ekspertizden geçirilmiş araçlarımızla
                    İstanbul&apos;un en güvenilir galerilerinden biri olmaya devam ediyoruz.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              {/* Görsel placeholder */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center text-center p-8">
                <span className="text-6xl font-black text-amber-400 opacity-80 select-none">OV</span>
                <p className="text-gray-400 text-sm mt-3">Kadıköy, İstanbul</p>
                <p className="text-gray-500 text-xs mt-1">2014&apos;ten beri hizmetinizde</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DEĞERLER ── */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">Değerlerimiz</h2>
              <p className="text-gray-500 mt-2 text-sm">Her işimizin temelinde bu dört ilke yatar.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {degerler.map((d, i) => (
              <FadeIn key={d.baslik} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      {d.icon}
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{d.baslik}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.aciklama}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SÜREÇ ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">Nasıl Çalışıyoruz?</h2>
              <p className="text-gray-500 mt-2 text-sm">Araç alım satım sürecimiz, 4 basit adımda tamamlanır.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { no: "01", baslik: "Ekspertiz",      aciklama: "Araç, uzman ekibimiz tarafından 50 noktalı ekspertizden geçirilir." },
              { no: "02", baslik: "Fiyatlama",      aciklama: "Piyasa verilerine göre adil ve şeffaf bir fiyat belirlenir." },
              { no: "03", baslik: "İlan Yayını",    aciklama: "Tüm teknik detaylar ve ekspertiz raporu ilan üzerinde yayınlanır." },
              { no: "04", baslik: "Güvenli Teslim", aciklama: "Evrak işlemleri için eksiksiz destek sağlanır, araç güvenle teslim edilir." },
            ].map((adim, i) => (
              <FadeIn key={adim.no} delay={i * 100}>
                <div className="relative p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-4xl font-black text-gray-100 select-none">{adim.no}</span>
                  <h3 className="font-semibold text-gray-900 mt-3 mb-2">{adim.baslik}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{adim.aciklama}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Araçları İncelemeye Hazır mısınız?</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Güncel stoğumuzu inceleyin veya ihtiyacınıza özel araç bulmamız için bize ulaşın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/araclar"
                className="px-6 py-3 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Araçları Gör
              </Link>
              <Link
                href="/iletisim"
                className="px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
