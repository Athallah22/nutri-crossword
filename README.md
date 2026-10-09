# TTS Gizi: Oper Pena & Musik

> **Media Edukasi Gizi Interaktif & Teka-Teki Silang Berbasis Web**
>
> 🔗 **Live Demo:** [https://nutricross.vercel.app/](https://nutricross.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Demo-nutricross.vercel.app-2EAD67?style=for-the-badge&logo=vercel)](https://nutricross.vercel.app/)
![Style: Neobrutalism](https://img.shields.io/badge/Style-Neobrutalism-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Offline Ready](https://img.shields.io/badge/Offline-100%25%20Ready-success?style=for-the-badge)

---

## Tentang Aplikasi

**TTS Gizi: Oper Pena & Musik** adalah aplikasi web edukatif yang dirancang untuk memfasilitasi pembelajaran gizi seimbang, kebiasaan hidup sehat, dan pencegahan anemia secara interaktif dan menyenangkan melalui permainan kelompok (kelas, komunitas, workshop, maupun kegiatan edukasi lainnya).

Aplikasi ini menggabungkan format **Teka-Teki Silang (TTS)** dengan dinamika fisik estafet **"Oper Pena & Irama Musik"**. Selama musik berputar secara acak (15–30 detik), para peserta mengoper pena estafet secara bergantian. Ketika musik berhenti seketika, peserta yang memegang pena bertindak sebagai penjawab petunjuk soal yang dipilih fasilitator di layar tampilan/proyektor.

---

## Tech Stack & Dependencies

Aplikasi dibangun menggunakan arsitektur modern berbasis browser tanpa dependensi backend, sehingga dapat berjalan cepat, ringan, dan 100% offline.

| Kategori | Teknologi / Pustaka | Versi | Keterangan & Kegunaan |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [React](https://react.dev/) | 19.x | Library antarmuka komponen reaktif berbasis hooks |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.x | Static typing ketat untuk struktur matriks TTS, state game, dan audio engine |
| **Build Tool** | [Vite](https://vitejs.dev/) | 8.x | Modern bundler dengan Hot Module Replacement (HMR) super cepat |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | v4.x | Utility-first CSS dengan Neobrutalism Design Tokens & Dual-Theme |
| **Audio Engine** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) + HTML5 Audio | Native | Built-in Procedural Audio Synthesizer & SFX mandiri tanpa file eksternal |
| **Icons** | [Lucide React](https://lucide.dev/) | Latest | Set ikon vektor modern dengan kontras dan ketebalan garis tegas |
| **Celebration** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Latest | Efek selebrasi partikel animasi saat seluruh TTS berhasil diselesaikan |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Google Fonts | Tipografi modern berbobot ekstra tebal untuk keterbacaan proyektor |

---

## Fitur Unggulan

### 1. Built-in Web Audio Synthesizer (100% Offline)
- Tidak memerlukan koneksi internet untuk memutar audio musik.
- Dilengkapi mesin synthesizer prosedural Web Audio API dengan 3 pilihan aransemen musik ceria:
  1. *Ceria Gizi Groove* (Default tempo ceria)
  2. *Energi Remaja* (Ketukan upbeat semangat)
  3. *Marimba Pop Tropis* (Harmoni santai berirama)
- Efek suara interaktif (*SFX*): Penanda musik berhenti (*Stop Alert*), Jawaban Benar (+100 poin), dan Jawaban Salah.

### 2. Bank Soal Multi-Paket (Multi-Puzzle Bank)
Menyediakan **5 Paket Soal Terkurasi** dengan total **41+ pertanyaan edukasi gizi**:
- **Paket 1:** *Gizi Makro & Kebiasaan Sehat* (8 Soal: Karbohidrat, Kalsium, Obesitas, Rehidrasi, Sosis, Telur, Lauk, Koi)
- **Paket 2:** *Protein, Pangan & Zat Gizi* (8 Soal: Protein, Pangan, Teri, Nasi, Gizi, Zat, Natur, Roti, Otot)
- **Paket 3:** *Sayuran, Vitamin & Hidrasi* (8 Soal: Sayuran, Serat, Retinol, Nasi, Taman, Kol, Makan, Natrium)
- **Paket 4:** *Zat Besi, Darah & Pencegahan Anemia* (9 Soal: Anemia, Aktif, Emulsi, Tauco, Fisik, Kalsium, Lauk, Ubi, Isi, Manis)
- **Paket 5:** *Hidrasi, Buah Tropis & Kebugaran* (8 Soal: Pisang, Pangan, Serat, Gel, Telur, Lemak, Tomat, Kalium)

> **Integritas Grid 100%:** Seluruh perpotongan huruf tervalidasi secara presisi, tanpa perlekatan kata paralel (*zero unintended collision*).

### 3. Bantuan Bertingkat & Proteksi Anti-Bocoran (Anti-Spoil)
- **3 Tingkat Bantuan (Hint):**
  - *Hint Level 1:* Membuka huruf kosong pertama pada kata di grid TTS.
  - *Hint Level 2:* Menampilkan kalimat petunjuk edukatif ekstra.
  - *Hint Level 3:* Membuka huruf kosong paling akhir.
- **Proteksi Anti-Bocoran (Anti-Spoil Rule):**
  - Jika suatu kata hanya menyisakan **1 huruf kosong**, sistem **tidak akan membuka huruf terakhir secara otomatis**.
  - Sistem mengunci pembukaan huruf dan hanya mengizinkan *Hint 2 (Petunjuk Teks)* agar siswa tetap tertantang menebak huruf terakhir sendiri.

### 4. Desain Neobrutalism & Zero-Scroll Layout
- Didesain dengan estetika **Neobrutalism** modern:
  - Border hitam tebal `3-4px` (`#171717`)
  - Bayangan tegas (*hard offset shadow*)
  - Palet warna kontras tinggi (*Warm Cream* `#FFF9ED`, *Canary Yellow* `#FFD84D`, *Soft Blue* `#A8D8FF`, *Mint Green* `#2EAD67`, *Coral Red* `#FF765E`)
  - Huruf di dalam kotak TTS diposisikan presisi di titik tengah (*dead-center*) dengan tipografi tebal dan tajam.
- **Zero-Scroll Classroom & Projector Layout:** Seluruh area interaksi (Header, Status Musik, Papan TTS, Panel Soal, dan Kontrol) terkunci dalam batas layar (`h-screen overflow-hidden` & `max-h-[48vh]`) sehingga tampil proporsional tanpa scrollbar vertikal pada zoom 100% di layar laptop maupun proyektor 1080p.

### 5. Mode Gelap & Terang (Dark & Light Mode)
- **Dukungan Dual-Theme Instan:** Satu klik tombol di header atau beranda untuk berpindah antara **Mode Terang** (pencahayaan normal) dan **Mode Gelap** (ruangan proyektor redup).
- **Estetika Neobrutalism Gelap:** Latar *Deep Charcoal* (`#121212`), kartu *Zinc* (`#1E1E20`), aksen neon kontras tinggi, dan bayangan hitam solid (`#000000`).
- **Persistensi Otomatis:** Pilihan tema otomatis tersimpan di `localStorage` (`'tts-gizi-theme'`) dan mendeteksi preferensi sistem bawaan.

### 6. Kendali Penuh Fasilitator & Modal Neobrutalist
- Tombol penilaian cepat: **Benar (+100 Poin)** atau **Salah**.
- Opsi cerdas untuk jawaban salah: **Lewati Soal** (coba lagi nanti) atau **Buka Kunci Jawaban (0 Poin)**.
- **Modal Konfirmasi Reset (`ResetConfirmModal`):** Dialog konfirmasi Neobrutalist di tengah layar dengan tombol Coral Red (`#FF765E`) serta dukungan pintasan keyboard `Enter` / `Escape`.
- **Opsi Acak Paket Otomatis:** Menekan konfirmasi reset akan langsung mengacak dan memuat paket soal baru.
- Mode Layar Penuh (*Fullscreen*) untuk presentasi proyektor tanpa gangguan toolbar browser.

---

## Pintasan Keyboard (Keyboard Shortcuts)

Fasilitator dapat mengendalikan jalannya sesi permainan dengan cepat menggunakan keyboard laptop:

| Tombol Keyboard | Aksi / Perintah |
| :--- | :--- |
| `Enter` atau `1` | Menandai jawaban siswa **Benar** (+100 Poin) |
| `Backspace` atau `0` | Menandai jawaban siswa **Salah / Buntu** |
| `1` *(saat status Salah)* | **Lewati Soal** (soal tetap aktif untuk ronde berikutnya) |
| `2` atau `Enter` *(saat status Salah)* | **Buka Kunci Jawaban** (+0 Poin & materi tetap tersampaikan) |
| `Escape` | Batalkan ronde aktif / Tutup Modal Reset |

---

## Struktur Direktori Proyek

```text
TTS-Gizi/
├── Docs/                                  # Dokumentasi Produk, Arsitektur & Desain
│   ├── PRD.md                             # Product Requirements Document
│   ├── Architecture.md                    # System Architecture & State Machine
│   └── Design.md                          # Neobrutalism UI Guidelines (Light & Dark)
├── public/
│   ├── audio/                             # Musik latar MP3 lokal
│   │   ├── music-01.mp3
│   │   ├── music-02.mp3
│   │   └── music-03.mp3
│   ├── images/
│   │   └── logo.png                       # Logo resmi transparan 3D TTS Gizi
│   ├── favicon.png                        # Favicon browser tab
│   └── favicon.svg
├── scripts/
│   └── export_to_word.py                  # Skrip export data soal ke docx
├── src/
│   ├── components/
│   │   ├── audio/
│   │   │   └── AudioSettings.tsx          # Modal kontrol volume, SFX & pilihan synth
│   │   ├── common/
│   │   │   └── ThemeToggle.tsx            # Tombol pengalih tema (Light/Dark)
│   │   ├── crossword/
│   │   │   ├── CrosswordBoard.tsx         # Grid interlocking matrix & viewport adapter
│   │   │   └── CrosswordCell.tsx          # Sel kotak TTS, penomoran & dead-center text
│   │   └── game/
│   │       ├── GameHeader.tsx             # Header status, ronde, skor & audio trigger
│   │       ├── QuestionPanel.tsx          # Panel petunjuk clue & widget 3-tingkat hint
│   │       ├── RoundStatus.tsx            # Visualizer banner musik aktif & giliran jawab
│   │       ├── AnswerControls.tsx         # Tombol aksi fasilitator (Benar/Salah/Lewati)
│   │       ├── ResetConfirmModal.tsx      # Modal konfirmasi reset Neobrutalism di tengah
│   │       └── CompletionModal.tsx        # Modal selebrasi akhir & animasi confetti
│   ├── data/
│   │   └── puzzles.json                   # 5 Paket bank soal TTS terkurasi
│   ├── engine/
│   │   ├── crosswordEngine.ts             # Generator matriks 2D & validasi sel
│   │   ├── answerValidator.ts             # Logika normalisasi & pencocokan jawaban
│   │   ├── scoreEngine.ts                 # Penghitungan skor (+100, 0 pts)
│   │   └── progressEngine.ts              # Pelacak status paket & soal selesai
│   ├── hooks/
│   │   ├── useGame.ts                     # Custom hook pengelola state game utama
│   │   ├── useAudio.ts                    # Custom hook pengelola audio & synthesizer
│   │   └── useTheme.ts                    # Custom hook pengelola tema Neobrutalism
│   ├── pages/
│   │   ├── HomePage.tsx                   # Halaman landing page & brand showcase
│   │   ├── TutorialPage.tsx               # Halaman panduan 3 langkah fasilitator
│   │   └── GamePage.tsx                   # Layar utama game (Zero-Scroll Viewport)
│   ├── services/
│   │   ├── audioService.ts                # Procedural Web Audio Synth & Audio Player
│   │   ├── timerService.ts                # Monotonic countdown & acak musik 15-30s
│   │   └── roundController.ts             # State machine orchestrator antar ronde
│   ├── types/
│   │   ├── puzzle.ts                      # Tipe data soal, arah, koordinat & matrix
│   │   └── game.ts                        # Tipe data ronde, skor, audio & game state
│   ├── utils/
│   │   ├── normalizeAnswer.ts             # Pembersih spasi/karakter huruf kapital
│   │   └── storage.ts                     # Pembaca & penyimpan localStorage lokal
│   ├── App.tsx                            # Root application component & screen router
│   ├── main.tsx                           # React 19 entry point
│   └── index.css                          # Tailwind v4 setup & custom tokens
├── Daftar_Soal_dan_Jawaban_TTS_Gizi.docx  # Dokumen Word pegangan cetak fasilitator
├── index.html                             # Entry HTML dengan metadata & font
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Panduan Menjalankan Aplikasi

### Prasyarat
- [Node.js](https://nodejs.org/) (Versi 18+ disarankan)
- Web Browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari)

### 1. Instalasi Dependensi
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 2. Menjalankan di Lingkungan Lokal (Development)
```bash
npm run dev
```
Buka peramban di tautan lokal yang ditampilkan (biasanya `http://localhost:5173`).

### 3. Membangun untuk Produksi (Build)
```bash
npm run build
```
Hasil kompilasi siap saji akan berada di folder `dist/` dan dapat dijalankan langsung di server hosting mana pun.

---

## Dokumen Pegangan Fasilitator

Daftar seluruh soal dan kunci jawaban lengkap tersedia dalam format Microsoft Word yang siap dicetak:
👉 **[Daftar_Soal_dan_Jawaban_TTS_Gizi.docx](./Daftar_Soal_dan_Jawaban_TTS_Gizi.docx)**

---

## Lisensi & Penggunaan

Dikembangkan sebagai media edukasi gizi interaktif nirlaba untuk meningkatkan kesadaran gizi seimbang, pencegahan anemia, dan kebiasaan hidup aktif bagi generasi muda Indonesia.
