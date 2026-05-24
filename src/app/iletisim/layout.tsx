import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "OtoVitre ile iletişime geçin. Telefon, WhatsApp veya formumuzu kullanarak bize ulaşabilirsiniz.",
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
