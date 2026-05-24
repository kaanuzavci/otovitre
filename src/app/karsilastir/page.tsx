import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AracDetay = {
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
  motorHacmi: string;
  durum: string;
};

const ARAC_VERILERI: Record<string, AracDetay> = {
  "1":  { id:"1",  marka:"Toyota",        model:"Corolla",  yil:2021, km:48_000, fiyat:1_250_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Sedan",     renk:"Beyaz",   motorHacmi:"1.6",             durum:"Satışta" },
  "2":  { id:"2",  marka:"Honda",         model:"Civic",    yil:2020, km:62_000, fiyat:1_100_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Sedan",     renk:"Siyah",   motorHacmi:"1.5 Turbo",       durum:"Satışta" },
  "3":  { id:"3",  marka:"Volkswagen",    model:"Passat",   yil:2022, km:31_000, fiyat:1_650_000, yakit:"Dizel",  vites:"Otomatik (DSG)",kasa:"Sedan",     renk:"Gümüş",   motorHacmi:"2.0 TDI",         durum:"Satışta" },
  "4":  { id:"4",  marka:"Ford",          model:"Focus",    yil:2019, km:85_000, fiyat:  850_000, yakit:"Benzin", vites:"Manuel",        kasa:"Hatchback", renk:"Kırmızı", motorHacmi:"1.5 EcoBoost",    durum:"Satışta" },
  "5":  { id:"5",  marka:"Renault",       model:"Clio",     yil:2023, km:12_000, fiyat:  980_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Hatchback", renk:"Mavi",    motorHacmi:"1.0 TCe",         durum:"Satışta" },
  "6":  { id:"6",  marka:"BMW",           model:"3 Serisi", yil:2021, km:42_000, fiyat:2_100_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Sedan",     renk:"Beyaz",   motorHacmi:"2.0 TwinPower",   durum:"Satışta" },
  "7":  { id:"7",  marka:"Mercedes-Benz", model:"C180",     yil:2020, km:55_000, fiyat:2_350_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Sedan",     renk:"Siyah",   motorHacmi:"1.5 EQ Boost",    durum:"Satıldı" },
  "8":  { id:"8",  marka:"Hyundai",       model:"Tucson",   yil:2022, km:28_000, fiyat:1_450_000, yakit:"Dizel",  vites:"Otomatik",      kasa:"SUV",       renk:"Gri",     motorHacmi:"1.6 CRDi",        durum:"Satışta" },
  "9":  { id:"9",  marka:"Kia",           model:"Sportage", yil:2023, km: 8_000, fiyat:1_580_000, yakit:"Benzin", vites:"Otomatik",      kasa:"SUV",       renk:"Beyaz",   motorHacmi:"1.6 T-GDI",       durum:"Rezerve" },
  "10": { id:"10", marka:"Skoda",         model:"Octavia",  yil:2021, km:39_000, fiyat:1_180_000, yakit:"Dizel",  vites:"Otomatik",      kasa:"Sedan",     renk:"Gri",     motorHacmi:"2.0 TDI",         durum:"Satışta" },
  "11": { id:"11", marka:"Seat",          model:"Leon",     yil:2022, km:21_000, fiyat:1_050_000, yakit:"Benzin", vites:"Otomatik",      kasa:"Hatchback", renk:"Beyaz",   motorHacmi:"1.5 TSI",         durum:"Satışta" },
  "12": { id:"12", marka:"Toyota",        model:"RAV4",     yil:2023, km: 5_000, fiyat:2_200_000, yakit:"Hibrit", vites:"Otomatik (e-CVT)",kasa:"SUV",     renk:"Gri",     motorHacmi:"2.5 Hibrit",      durum:"Satışta" },
};

function fmt(n: number) { return new Intl.NumberFormat("tr-TR").format(n); }

const SATIRLAR: { etiket: string; alan: keyof AracDetay }[] = [
  { etiket: "Marka",       alan: "marka"      },
  { etiket: "Model",       alan: "model"      },
  { etiket: "Yıl",         alan: "yil"        },
  { etiket: "Kilometre",   alan: "km"         },
  { etiket: "Fiyat",       alan: "fiyat"      },
  { etiket: "Yakıt",       alan: "yakit"      },
  { etiket: "Vites",       alan: "vites"      },
  { etiket: "Kasa",        alan: "kasa"       },
  { etiket: "Renk",        alan: "renk"       },
  { etiket: "Motor",       alan: "motorHacmi" },
  { etiket: "Durum",       alan: "durum"      },
];

function formatDeger(alan: keyof AracDetay, deger: string | number): string {
  if (alan === "km")    return `${fmt(deger as number)} km`;
  if (alan === "fiyat") return `${fmt(deger as number)} ₺`;
  if (alan === "yil")   return String(deger);
  return String(deger);
}

function vurgula(alan: keyof AracDetay, araclar: AracDetay[]): boolean[] {
  if (alan !== "fiyat" && alan !== "km" && alan !== "yil") {
    return araclar.map(() => false);
  }
  const degerler = araclar.map((a) => Number(a[alan]));
  const min = Math.min(...degerler);
  const max = Math.max(...degerler);
  return araclar.map((a) => {
    const v = Number(a[alan]);
    if (alan === "fiyat" || alan === "km") return v === min; // az olan iyi
    return v === max; // yeni olan iyi
  });
}

export default async function KarsilastirPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids: idsStr } = await searchParams;
  const ids = (idsStr ?? "").split(",").filter(Boolean).slice(0, 3);
  const araclar = ids.map((id) => ARAC_VERILERI[id]).filter(Boolean) as AracDetay[];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-32">

        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Araç Karşılaştırma</h1>
            <p className="text-sm text-gray-500 mt-1">{araclar.length} araç karşılaştırılıyor</p>
          </div>
          <Link
            href="/araclar"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Araçlara dön
          </Link>
        </div>

        {araclar.length < 2 ? (
          /* Yetersiz araç */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15M3.75 9h16.5M3.75 15h16.5" />
            </svg>
            <p className="font-semibold text-gray-700 mb-2">Karşılaştırmak için en az 2 araç seçin</p>
            <p className="text-sm text-gray-400 mb-6">Araçlar sayfasında kart üzerindeki &quot;Karşılaştır&quot; düğmesine tıklayın.</p>
            <Link
              href="/araclar"
              className="inline-flex px-5 py-2.5 bg-amber-400 text-gray-900 text-sm font-semibold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Araçlara Git
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* ── Araç başlıkları ── */}
            <div className={`grid border-b border-gray-100`} style={{ gridTemplateColumns: `200px repeat(${araclar.length}, 1fr)` }}>
              <div className="p-5 bg-gray-50 border-r border-gray-100" />
              {araclar.map((arac) => (
                <div key={arac.id} className="p-5 border-r border-gray-100 last:border-r-0">
                  {/* Araç resmi */}
                  <div className="relative h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={`/images/araclar/${arac.id}/dis-on.jpg`}
                      alt={`${arac.marka} ${arac.model}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                  <h2 className="font-bold text-gray-900 text-sm leading-snug">
                    {arac.yil} {arac.marka} {arac.model}
                  </h2>
                  <p className="text-lg font-black text-gray-900 mt-1">{fmt(arac.fiyat)} ₺</p>
                  <Link
                    href={`/araclar/${arac.id}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    İlanı İncele
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* ── Karşılaştırma satırları ── */}
            {SATIRLAR.map(({ etiket, alan }, rowIdx) => {
              const vurgular = vurgula(alan, araclar);
              return (
                <div
                  key={alan}
                  className={`grid border-b border-gray-50 last:border-b-0 ${rowIdx % 2 === 0 ? "" : "bg-gray-50/50"}`}
                  style={{ gridTemplateColumns: `200px repeat(${araclar.length}, 1fr)` }}
                >
                  {/* Özellik adı */}
                  <div className="px-5 py-3.5 flex items-center border-r border-gray-100 bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">{etiket}</span>
                  </div>

                  {/* Değerler */}
                  {araclar.map((arac, i) => (
                    <div
                      key={arac.id}
                      className={`px-5 py-3.5 flex items-center border-r border-gray-100 last:border-r-0 ${
                        vurgular[i] ? "bg-amber-50" : ""
                      }`}
                    >
                      <span className={`text-sm font-semibold ${vurgular[i] ? "text-amber-700" : "text-gray-900"}`}>
                        {formatDeger(alan, arac[alan] as string | number)}
                        {vurgular[i] && (
                          <span className="ml-1.5 text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                            {alan === "fiyat" ? "En Uygun" : alan === "km" ? "En Az Km" : "En Yeni"}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
