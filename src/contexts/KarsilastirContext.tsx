"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type AracOzet = {
  id: string;
  marka: string;
  model: string;
  yil: number;
};

type Ctx = {
  secili: AracOzet[];
  ekle: (arac: AracOzet) => void;
  cikar: (id: string) => void;
  sifirla: () => void;
  isSecili: (id: string) => boolean;
  dolu: boolean; // 3 araç seçildi mi
};

const KarsilastirCtx = createContext<Ctx>({
  secili: [],
  ekle: () => {},
  cikar: () => {},
  sifirla: () => {},
  isSecili: () => false,
  dolu: false,
});

export function KarsilastirProvider({ children }: { children: ReactNode }) {
  const [secili, setSecili] = useState<AracOzet[]>([]);

  const ekle = useCallback((arac: AracOzet) => {
    setSecili((prev) => {
      if (prev.some((a) => a.id === arac.id) || prev.length >= 3) return prev;
      return [...prev, arac];
    });
  }, []);

  const cikar = useCallback((id: string) => {
    setSecili((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const sifirla = useCallback(() => setSecili([]), []);

  const isSecili = useCallback(
    (id: string) => secili.some((a) => a.id === id),
    [secili]
  );

  const dolu = secili.length >= 3;

  return (
    <KarsilastirCtx.Provider value={{ secili, ekle, cikar, sifirla, isSecili, dolu }}>
      {children}
    </KarsilastirCtx.Provider>
  );
}

export function useKarsilastir() {
  return useContext(KarsilastirCtx);
}
