# Bento Studio & Portofolio — Agung Purwanto (Retro Game Boy DMG-01 Edition)

Website portofolio pribadi dosen (*lecturer*) dan perekayasa sistem informasi, dipadukan dengan kurasi hobi *toys enthusiast* (diecast/Gunpla).

Mengadopsi tata letak modern **Bento Studio Grid** (modular 12-kolom responsif) yang dipadukan dengan estetika otentik **Retro Game Boy DMG-01**:
- **Tipografi**: Pixel Headings (*Press Start 2P*), Retro Monospace Body (*VT323*).
- **Palet Warna**: DMG-01 Shell Beige (`#DAD6CC` / `#ECE8DE`), Dot-Matrix Green LCD (`#AEC083`), Magenta A/B Action Buttons (`#9B2C5A`), dan LED Daya Merah (`#E5483A`).
- **Komponen**: Konsol Game Boy Hero Interaktif, Hero Bio LCD Dot-Matrix, Profil Identitas, 4 Pilar Riset, Kurasi Diecast/Gunpla Makro, Timeline Pendidikan, Perkakas Meja Kerja (*The Workbench*), Rangkuman Metrik, dan Formulir Kontak Terminal.
- **Keandalan**: Tombol salin email dengan pengaman non-HTTPS/LAN fallback, serta pergantian tema berbasis `localStorage`.
- **Stack**: Zero-dependency (Pure HTML5 + Modern CSS Grid + Vanilla JS), beban muat <100ms.

---

## 📂 Struktur Berkas

```
.
├── index.html       # Markup grid modular Bento Studio
├── style.css        # Tata letak CSS Grid 12-kolom, token tema, dan responsivitas
├── script.js        # Pengalih tema, salin email aman LAN, dan navigasi aktif
├── vercel.json      # Konfigurasi keamanan dan deployment Vercel
└── README.md        # Dokumentasi teknis
```

---

## 🚀 Menjalankan Lokal

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
