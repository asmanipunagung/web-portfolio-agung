# Bento Studio & Portofolio — Agung Purwanto

Website portofolio pribadi akademisi dan perekayasa sistem informasi di Universitas Darwan Ali (UNDA), Sampit, dipadukan dengan kurasi hobi *toy photography* dan koleksi diecast/Gunpla.

Mengadopsi tata letak modern **Bento Studio Grid** (modular 12-kolom responsif tanpa sidebar kaku), dipadukan dengan standar desain **Editorial Academic Humanist**:
- **Tipografi**: Display Serif (*Newsreader*), Grotesque Sans (*Plus Jakarta Sans*), Monospace (*JetBrains Mono*).
- **Palet Warna**: Warm ivory paper & bronze accent (Light mode), deep obsidian slate & warm amber gold (Dark mode).
- **Struktur Bento**: Hero Bio, Profil Identitas, 4 Pilar Riset, Kurasi Diecast/Gunpla Makro, Timeline Pendidikan, Perkakas Meja Kerja (*The Workbench*), Rangkuman Metrik, dan Formulir Kontak.
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
