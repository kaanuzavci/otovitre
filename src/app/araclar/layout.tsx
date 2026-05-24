import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Araçlar",
  description:
    "OtoVitre araç stoku. Filtrele, karşılaştır ve detay incele. Benzin, dizel, hibrit, SUV, sedan ve daha fazlası.",
};

export default function AraclarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
