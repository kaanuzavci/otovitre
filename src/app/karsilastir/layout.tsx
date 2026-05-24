import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Araç Karşılaştırma",
  description: "Seçtiğiniz araçları yan yana karşılaştırın. Fiyat, yıl, km, yakıt ve diğer teknik özellikler.",
};

export default function KarsilastirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
