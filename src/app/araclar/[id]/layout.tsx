import type { Metadata } from "next";

/* Araç bazlı dinamik metadata */
const aracMeta: Record<string, { marka: string; model: string; yil: number; km: number; fiyat: number }> = {
  "1":  { marka: "Toyota",        model: "Corolla",  yil: 2021, km: 48_000, fiyat: 1_250_000 },
  "2":  { marka: "Honda",         model: "Civic",    yil: 2020, km: 62_000, fiyat: 1_100_000 },
  "3":  { marka: "Volkswagen",    model: "Passat",   yil: 2022, km: 31_000, fiyat: 1_650_000 },
  "4":  { marka: "Ford",          model: "Focus",    yil: 2019, km: 85_000, fiyat:   850_000 },
  "5":  { marka: "Renault",       model: "Clio",     yil: 2023, km: 12_000, fiyat:   980_000 },
  "6":  { marka: "BMW",           model: "3 Serisi", yil: 2021, km: 42_000, fiyat: 2_100_000 },
  "7":  { marka: "Mercedes-Benz", model: "C180",     yil: 2020, km: 55_000, fiyat: 2_350_000 },
  "8":  { marka: "Hyundai",       model: "Tucson",   yil: 2022, km: 28_000, fiyat: 1_450_000 },
  "9":  { marka: "Kia",           model: "Sportage", yil: 2023, km:  8_000, fiyat: 1_580_000 },
  "10": { marka: "Skoda",         model: "Octavia",  yil: 2021, km: 39_000, fiyat: 1_180_000 },
  "11": { marka: "Seat",          model: "Leon",     yil: 2022, km: 21_000, fiyat: 1_050_000 },
  "12": { marka: "Toyota",        model: "RAV4",     yil: 2023, km:  5_000, fiyat: 2_200_000 },
};

function fmt(n: number) { return new Intl.NumberFormat("tr-TR").format(n); }

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const a = aracMeta[id];
  if (!a) return { title: "Araç Bulunamadı" };

  const baslik = `${a.yil} ${a.marka} ${a.model}`;
  const aciklama = `${baslik} — ${fmt(a.km)} km, ${fmt(a.fiyat)} ₺. OtoVitre güvencesiyle şeffaf ekspertiz.`;

  return {
    title: baslik,
    description: aciklama,
    openGraph: {
      title: baslik,
      description: aciklama,
    },
  };
}

export default function AracDetayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
