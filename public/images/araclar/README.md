# Araç Fotoğrafları

Her araç için resimler bu klasörde, araç ID'sine göre ayrılmış alt klasörlerde saklanır.

## Klasör yapısı

```
public/images/araclar/
├── 1/          ← Toyota Corolla (ID 1)
│   ├── dis-on.jpg
│   ├── dis-yan.jpg
│   ├── dis-arka.jpg
│   ├── ic-on.jpg
│   ├── ic-arka.jpg
│   ├── motor.jpg
│   ├── bagaj.jpg
│   └── jant.jpg
├── 2/          ← Honda Civic
│   └── ...
└── ...
```

## Dosya isimlendirme kuralı

| Dosya adı     | Görünüm                |
|---------------|------------------------|
| `dis-on.jpg`  | Dış — ön görünüm       |
| `dis-yan.jpg` | Dış — yan görünüm      |
| `dis-arka.jpg`| Dış — arka görünüm     |
| `ic-on.jpg`   | İç mekan — ön          |
| `ic-arka.jpg` | İç mekan — arka koltuk |
| `motor.jpg`   | Motor bölmesi          |
| `bagaj.jpg`   | Bagaj                  |
| `jant.jpg`    | Jant detayı            |

## Notlar

- **Format:** `.jpg` veya `.jpeg` olarak kaydet (veya `.png`, `.webp`)
- **Önerilen boyut:** En az 800×500 px — daha büyük olursa Next.js otomatik optimize eder
- **Eksik resimler:** Kod otomatik olarak gradient + silüet görseline geçer
- Her araç için sadece istediğin görünümleri eklemen yeterli; hepsini eklemeye gerek yok
