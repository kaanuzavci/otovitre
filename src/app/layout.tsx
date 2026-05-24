import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OtoVitre — Güvenilir Araç Galerisi",
    template: "%s | OtoVitre",
  },
  description:
    "İstanbul'un güvenilir araç galerisi. Profesyonel ekspertiz, şeffaf fiyatlandırma ve kapsamlı araç stoku. Benzin, dizel, hibrit seçenekler.",
  keywords: ["araç galerisi", "ikinci el araç", "istanbul araba", "ekspertiz", "satılık araç"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "OtoVitre",
    title: "OtoVitre — Güvenilir Araç Galerisi",
    description: "İstanbul'un güvenilir araç galerisi. Şeffaf ekspertiz ve dürüst fiyatlandırma.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">{children}</body>
    </html>
  );
}
