import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "OtoVitre'nin hikayesi, değerleri ve vizyonu. 10 yılı aşkın deneyimimizle İstanbul'un güvenilir araç galerisi.",
};

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
