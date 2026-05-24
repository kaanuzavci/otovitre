import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Araç Detayı",
  description: "Araç teknik özellikleri, donanım listesi, boya ve ekspertiz raporu. OtoVitre güvencesiyle.",
};

export default function AracDetayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
