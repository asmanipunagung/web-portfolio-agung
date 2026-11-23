# Portofolio Akademik & Rekayasa — Agung Purwanto, M.Kom.

Website portofolio pribadi akademisi dan perekayasa sistem informasi di Universitas Darwan Ali (UNDA), Sampit. 

Dirancang mengadopsi arsitektur tata letak **Colorlib Jackson** (fixed sticky sidebar di sisi kiri, alur konten editorial di sisi kanan, serta menu off-canvas responsif pada layar sentuh/mobile), dipadukan dengan standar desain **Editorial Academic Humanist**:
- **Tipografi**: Display Serif (*Newsreader*), Grotesque Sans (*Plus Jakarta Sans*), Monospace (*JetBrains Mono*).
- **Palet Warna**: Warm ivory paper & bronze accent (Light mode), deep obsidian slate & warm amber gold (Dark mode).
- **Interaksi**: Navigasi scrollspy terintegrasi, tombol salin email instan, dan formulir pesan langsung.
- **Keandalan**: Tombol salin email dengan pengaman non-HTTPS/LAN fallback, serta pergantian tema berbasis `localStorage`.
- **Stack**: Zero-dependency (Pure HTML5 + Modern CSS + Vanilla JS), beban muat <100ms.

---

## 📂 Struktur Berkas

```
.
├── index.html       # Markup semantik seluruh bagian portofolio
├── style.css        # Tata letak sidebar Jackson, responsivitas, dan token tema
├── script.js        # Scrollspy, pengalih tema localStorage, dan penanganan salin email
├── vercel.json      # Konfigurasi keamanan dan deployment Vercel
└── README.md        # Dokumentasi teknis
```

---

## 🚀 Menjalankan Lokal

Jalankan server HTTP lokal sederhana pada port yang diinginkan (misal port 3008):

```bash
# Menggunakan Python
python3 -m http.server 3008

# Buka pada browser
http://localhost:3008
```

---

## 🌐 Publikasi ke Vercel

```bash
npx vercel --prod
```
