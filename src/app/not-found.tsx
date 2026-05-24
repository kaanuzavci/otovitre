import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">

          {/* 404 numarası */}
          <div className="relative mb-8 inline-block">
            <span className="text-[120px] font-black text-gray-200 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-amber-400"
                fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Sayfa bulunamadı</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Aradığınız sayfa taşınmış, kaldırılmış ya da hiç mevcut olmamış olabilir.
            Ana sayfaya dönerek araçlara göz atabilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/araclar"
              className="px-6 py-3 bg-amber-400 text-gray-900 text-sm font-bold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Araçları İncele
            </Link>
          </div>

          <p className="mt-10 text-xs text-gray-400">
            Sorun devam ediyorsa{" "}
            <a href="tel:05320000000" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              0532 000 00 00
            </a>{" "}
            numarasından bize ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
