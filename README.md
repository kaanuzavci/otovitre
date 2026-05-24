# OtoVitre

İkinci el araç galerisi için hazır web sitesi. Next.js 16 App Router, React 19, Tailwind CSS 4 ile geliştirilmiştir.

---

## Özellikler

**Ziyaretçi Tarafı**
- Ana sayfa — öne çıkan araçlar, galeri istatistikleri, WhatsApp CTA
- Araç listesi — marka, yakıt, vites, kasa, km aralığı, yıl, durum filtreleri + metin arama + sıralama
- Araç detay — fotoğraf galerisi, teknik özellikler, donanım listesi, boya/ekspertiz tablosu
- Araç karşılaştırma — max 3 araç yan yana (fiyat/km/yıl vurgusu ile)
- Hakkımızda, İletişim sayfaları
- Özel 404 sayfası
- Tüm sayfalarda SEO metadata

**Admin Paneli** (`/admin`)
- Araç listesi yönetimi
- Araç ekleme formu (teknik bilgiler, fotoğraf yükleme, donanım, boya/ekspertiz)
- Araç düzenleme formu
- Site ayarları

---

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

---

## Araç Fotoğrafları

Her araç için fotoğraflar `public/images/araclar/{id}/` klasörüne eklenir.

```
public/images/araclar/
├── 1/
│   ├── dis-on.jpg      ← liste kartlarında ve karşılaştırma sayfasında kullanılır
│   ├── dis-yan.jpg
│   ├── dis-arka.jpg
│   ├── ic-on.jpg
│   ├── ic-arka.jpg
│   ├── motor.jpg
│   ├── bagaj.jpg
│   └── jant.jpg
├── 2/
│   └── ...
```

Fotoğraf eklenmemiş görünümler otomatik olarak araç rengine göre gradient + silüet gösterir.

---

## Özelleştirme

Satın alan galeri, aşağıdaki alanlarda kendi bilgilerini günceller:

| Alan | Dosya |
|---|---|
| Telefon numarası | `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/app/iletisim/page.tsx` |
| WhatsApp numarası | `src/app/araclar/[id]/page.tsx`, `src/app/page.tsx` |
| Adres | `src/app/iletisim/page.tsx`, `src/app/araclar/[id]/page.tsx` |
| Sosyal medya linkleri | `src/components/Footer.tsx` |
| Galeri adı / logo | `src/components/Navbar.tsx`, `src/components/Footer.tsx` |
| Araç ilanları | `src/app/araclar/page.tsx`, `src/app/araclar/[id]/page.tsx` |
| Öne çıkan araçlar | `src/app/page.tsx` → `onecikaranAraclar` dizisi |
| Google Maps embed | `src/app/iletisim/page.tsx` |

---

## Teknoloji

- **Next.js 16** — App Router, server/client components, generateMetadata
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
