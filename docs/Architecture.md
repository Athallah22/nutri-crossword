# ARCHITECTURE — TTS Gizi: Oper Pena & Musik

## 1. Tujuan Arsitektur

Aplikasi dibangun sebagai frontend web yang dapat berjalan secara lokal, dengan logika TTS, pengelolaan ronde, timer, dan pemutaran musik yang terpisah.

Prinsip utama:

- Tidak memerlukan backend untuk MVP.
- Tidak memerlukan database.
- Musik dan soal disimpan sebagai aset lokal.
- Timer dan audio dikelola oleh satu pengendali ronde.
- Komponen UI tidak mengelola timer secara terpisah.
- Fasilitator tetap menjadi pengendali penilaian jawaban.
- Aplikasi dapat diperluas tanpa mengganti keseluruhan arsitektur.

## 2. Teknologi yang Digunakan

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (ikon visual proyektor)
- Canvas Confetti (selebrasi penyelesaian TTS)

### State management

Gunakan React state dan custom hooks (`useGame`, `useAudio`) untuk MVP.

### Audio

Gunakan **Web Audio API** dan **HTML5 Audio API** melalui satu service audio tunggal (`audioService.ts`).
- Mendukung pemutaran file lokal `/audio/*.mp3`.
- Memiliki **Built-in Procedural Web Audio Synthesizer** (3 preset musik: Ceria Gizi Groove, Energi Remaja, Marimba Pop Tropis) dan Sound Effects (Benar, Salah, Alert Stop) sehingga aplikasi dapat berjalan 100% offline secara mandiri tanpa bergantung pada file audio eksternal.

### Penyimpanan

- JSON lokal untuk konfigurasi puzzle dan soal.
- `localStorage` untuk menyimpan preferensi audio dan progres jika diperlukan.
- Tidak ada database untuk versi pertama.

## 3. High-Level Architecture

    ┌────────────────────────────────────────┐
    │               Browser                  │
    │                                        │
    │  ┌──────────────────────────────────┐  │
    │  │           React UI               │  │
    │  │                                  │  │
    │  │  Home / Tutorial / Game          │  │
    │  │  Crossword Board                 │  │
    │  │  Question Panel                  │  │
    │  │  Audio Status                    │  │
    │  └─────────────────┬────────────────┘  │
    │                    │                   │
    │  ┌─────────────────▼────────────────┐  │
    │  │        Game Controller           │  │
    │  │                                  │  │
    │  │  Round State Machine             │  │
    │  │  Question Selection              │  │
    │  │  Answer Evaluation               │  │
    │  │  Score / Progress                │  │
    │  └────────┬─────────────┬───────────┘  │
    │           │             │              │
    │  ┌────────▼──────┐ ┌────▼───────────┐  │
    │  │ Timer Service │ │ Audio Service  │  │
    │  └───────────────┘ └────┬───────────┘  │
    │                         │              │
    │                    Local Audio        │
    │                                        │
    │  Local Puzzle JSON / Game Data         │
    └────────────────────────────────────────┘

## 4. Struktur Folder

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

## 5. Data Model

### Question

    interface Question {
      id: string;
      number: number;
      direction: "across" | "down";
      row: number;
      col: number;
      answer: string;
      clue: string;
      category: string;
      points: number;
      hint?: string;
    }

### Puzzle

    interface Puzzle {
      id: string;
      title: string;
      rows: number;
      cols: number;
      cells: CrosswordCell[];
      questions: Question[];
    }

### Game State

    type RoundStatus =
      | "idle"
      | "playing"
      | "answering"
      | "evaluating"
      | "completed"
      | "cancelled"
      | "audio-error";

    interface GameState {
      score: number;
      selectedQuestionId: string | null;
      roundStatus: RoundStatus;
      answeredQuestionIds: string[];
      incorrectQuestionIds: string[];
      currentDurationSeconds: number | null;
      completed: boolean;
    }

## 6. State Machine Ronde

Setiap ronde harus mengikuti transisi status yang jelas.

    IDLE
      │ pilih nomor
      ▼
    STARTING
      │ audio berhasil dimulai
      ▼
    PLAYING
      │ timer berakhir
      ▼
    ANSWERING
      │ fasilitator mengonfirmasi hasil
      ▼
    EVALUATING
      │ hasil diproses
      ├───────────────┐
      ▼               ▼
    COMPLETED       IDLE
    (seluruh game)  (soal berikutnya)

Status tambahan:

- `CANCELLED`: ronde dibatalkan oleh fasilitator.
- `AUDIO_ERROR`: audio gagal diputar dan membutuhkan tindakan alternatif.

Transisi harus dikendalikan oleh satu controller. Komponen UI tidak boleh mengubah status ronde secara langsung tanpa melalui action yang tervalidasi.

## 7. Question Selection

Ketika nomor diklik:

1. Pastikan nomor memiliki soal valid.
2. Pastikan tidak ada ronde aktif yang belum diselesaikan.
3. Ambil data soal.
4. Set `selectedQuestionId`.
5. Highlight seluruh cell yang terkait.
6. Tentukan durasi acak.
7. Mulai pemutaran audio.
8. Mulai timer setelah audio berhasil diputar.
9. Ubah status menjadi `PLAYING`.

Jika nomor tidak valid atau sudah dijawab, jangan memulai audio.

## 8. Random Timer

Rentang durasi:

- Minimum: 15 detik.
- Maksimum: 30 detik.

Contoh implementasi TypeScript:

    export function randomRoundDuration(): number {
      return Math.floor(Math.random() * 16) + 15;
    }

Fungsi tersebut menghasilkan durasi bilangan bulat dari 15 sampai 30 detik.

Durasi diacak sekali pada awal ronde dan tidak boleh berubah selama ronde berjalan.

### Prinsip timer

- Gunakan satu timer aktif per ronde.
- Simpan identifier timer untuk dibatalkan.
- Bersihkan timer saat ronde dibatalkan atau komponen dilepas.
- Jangan mengandalkan interval UI sebagai sumber kebenaran waktu.
- Gunakan deadline berbasis waktu monotonik untuk menghindari ketergantungan pada jumlah tick interval.
- Saat tab kembali aktif setelah ditinggalkan, periksa apakah deadline telah terlewati dan segera selesaikan ronde jika memang waktunya habis.

Timer adalah sumber kebenaran untuk penghentian normal, bukan event `ended` pada file musik.

## 9. Audio Service

`audioService.ts` bertanggung jawab atas:

- Memuat musik lokal.
- Memulai musik.
- Mengatur volume.
- Menghentikan musik.
- Menghentikan audio ketika ronde dibatalkan.
- Mencegah beberapa track diputar bersamaan.
- Menangani error pemutaran.
- Mengembalikan status audio kepada controller.

Contoh antarmuka:

    interface AudioService {
      play(track: string): Promise<void>;
      stop(): void;
      setVolume(volume: number): void;
      isPlaying(): boolean;
      dispose(): void;
    }

### Aturan implementasi

Gunakan satu instance audio yang dikelola dengan benar. Jangan membuat objek Audio baru pada setiap render React.

Saat ronde dimulai, controller memanggil `play()`. Karena browser dapat menolak pemutaran otomatis, tindakan klik nomor harus menjadi bagian dari interaksi pengguna yang mengizinkan pemutaran audio.

Jika `play()` menghasilkan error, jangan menganggap musik sudah berjalan.

## 10. Sinkronisasi Musik dan Timer

Urutan yang benar:

    Klik nomor
        │
        ▼
    Validasi soal
        │
        ▼
    Pilih durasi 15–30 detik
        │
        ▼
    Mulai audio
        │
        ▼
    Audio berhasil dimulai?
        │
        ├── Tidak ──► AUDIO_ERROR
        │
        └── Ya
             │
             ▼
         Mulai timer
             │
             ▼
         Deadline tercapai
             │
             ▼
         Hentikan audio
             │
             ▼
         Status ANSWERING

Timer dimulai berdasarkan keberhasilan audio dimulai, bukan ketika file audio mulai diunduh atau ketika nomor pertama kali dirender.

Untuk menghindari keterlambatan pemuatan, file audio sebaiknya dimuat sebelum permainan dimulai.

Browser tidak menjamin penghentian audio pada presisi milidetik. Target implementasi adalah menghentikan musik segera setelah deadline terdeteksi, dengan timer yang tidak bergantung pada panjang track audio.

## 11. Pembatalan Ronde

Ketika fasilitator membatalkan ronde:

1. Hentikan audio.
2. Bersihkan timer.
3. Batalkan callback atau event tertunda yang terkait ronde.
4. Reset status ronde.
5. Pertahankan jawaban soal lain yang telah selesai.
6. Tandai ronde sebagai dibatalkan atau kembali ke `IDLE`.
7. Izinkan pemilihan nomor berikutnya.

Gunakan identitas ronde atau mekanisme pembatalan agar callback dari ronde lama tidak memengaruhi ronde baru.

## 12. Answer Evaluation & Hint System

Karena peserta menjawab secara lisan, fasilitator mengonfirmasi hasil melalui antarmuka.

### Jawaban benar

1. Pastikan status `ANSWERING`.
2. Pastikan soal belum diselesaikan.
3. Verifikasi jawaban yang diterima sesuai dengan jawaban resmi.
4. Isi cell sesuai seluruh huruf jawaban.
5. Tambahkan skor (+100 poin).
6. Tandai soal selesai.
7. Perbarui progress permainan.

### Jawaban salah

Ketika fasilitator menandai salah, fasilitator dapat memilih 2 opsi:
1. **Lewati (Coba Lagi Nanti):**
   - Catat percobaan salah.
   - Kotak TTS tetap kosong (kecuali huruf hint yang sudah dibuka).
   - Reset status ronde ke `IDLE` agar fasilitator dapat memilih nomor soal lain atau mengulanginya nanti.
2. **Buka Kunci Jawaban (0 Poin):**
   - Isi cell sesuai jawaban resmi agar seluruh kelas dapat melihat dan mempelajarinya.
   - Tambahkan skor +0 poin.
   - Tandai soal sebagai selesai.
   - Tampilkan materi edukasi gizi ringkas.

### Sistem Bantuan (3x Hint Per Soal)

- State `hintsUsed: Record<string, number>` melacak berapa kali hint telah digunakan pada masing-masing pertanyaan (0 sampai 3).
- **Tingkat 1:** Menambahkan indeks huruf ke-0 ke `revealedLetters`. Kotak pertama berkedip kuning dan hurufnya tampil di grid.
- **Tingkat 2:** Mengaktifkan tampilan petunjuk teks gizi tambahan (`hint` string) di panel soal.
- **Tingkat 3:** Menambahkan indeks huruf terakhir ke `revealedLetters` di grid TTS.

Tombol penilaian tidak boleh menerima klik ganda yang menghasilkan skor atau pengisian grid berulang.

## 13. Crossword Engine

`crosswordEngine.ts` bertanggung jawab atas:

- Pemetaan nomor soal ke cell.
- Penentuan arah mendatar dan menurun.
- Highlight jawaban aktif.
- Pengisian huruf.
- Pemeriksaan konflik antarkata.
- Status penyelesaian soal.

Komponen UI hanya menampilkan hasil dari engine.

Untuk MVP, gunakan puzzle yang disusun dan diuji secara manual. Jangan membuat algoritma pembangkit TTS otomatis sebelum gameplay utama stabil.

## 14. Persistence & Theme Management

### 14.1 Preferensi yang Disimpan di `localStorage`

- **Tema Tampilan:** `'tts-gizi-theme'` (`'light'` atau `'dark'`).
- **Preferensi Audio:** Volume (`number`), track musik terpilih (`string`), status mute (`boolean`), status efek suara (`boolean`).
- **Progress Permainan:** Tidak menyimpan status `PLAYING` aktif untuk menghindari pemutaran audio otomatis tanpa aksi klik pengguna setelah reload.

### 14.2 Theme Architecture (`useTheme`)

- Hook `useTheme` mengelola class `.dark` pada elemen akar HTML (`document.documentElement`).
- Mendeteksi preferensi sistem secara otomatis via `window.matchMedia('(prefers-color-scheme: dark)')` saat pertama kali dibuka.
- Token styling dipetakan menggunakan utility Tailwind v4 dan variabel CSS Neobrutalism (`--bg-canvas`, `--text-main`, `--card-bg`, `--border-color`).
- Komponen `ThemeToggle` menyediakan tombol Neobrutalist satu klik dengan ikon `Sun` dan `Moon`.

Setelah halaman dimuat ulang, audio tetap diam sampai ada tindakan interaksi pengguna.

## 15. Penanganan Error

### Audio tidak tersedia

Tampilkan pesan:
"Musik tidak dapat diputar. Coba kembali atau gunakan mode tanpa musik."

### Timer tidak valid

Gunakan rentang default 15–30 detik. Jangan memulai ronde dengan durasi nol atau negatif.

### Soal tidak ditemukan

Tampilkan pesan bahwa soal tidak tersedia dan jangan memulai audio.

### Klik nomor berulang

Abaikan klik tambahan selama ronde berlangsung, kecuali fasilitator secara eksplisit membatalkan ronde.

### File musik gagal dimuat

Deteksi error saat preload atau pemutaran. Jangan membiarkan timer aktif dengan status UI yang mengklaim musik sedang berjalan jika audio gagal dimulai.

### Browser kehilangan fokus

Jangan mengandalkan interval animasi untuk memastikan deadline. Periksa deadline aktual ketika event browser aktif kembali.

## 16. Testing

### Unit Test

- `randomRoundDuration()` hanya menghasilkan 15–30 detik.
- Normalisasi jawaban.
- Validasi jawaban.
- Perhitungan skor.
- Perhitungan progress.
- Pemeriksaan nomor soal.
- Pengisian grid.

### Integration Test

- Klik nomor memulai ronde.
- Audio dimulai sebelum timer berjalan.
- Timer berakhir dan menghentikan audio.
- Status berubah menjadi `ANSWERING`.
- Pembatalan menghentikan audio dan timer.
- Audio gagal tidak menyebabkan timer berjalan seolah-olah musik aktif.
- Pemilihan soal baru tidak menerima callback dari ronde lama.

### End-to-End Test

1. Buka game.
2. Mulai permainan.
3. Klik nomor TTS.
4. Pastikan petunjuk tampil.
5. Pastikan musik dimulai.
6. Tunggu sampai timer berakhir.
7. Pastikan musik berhenti.
8. Pastikan status menunggu jawaban muncul.
9. Konfirmasikan jawaban benar.
10. Pastikan kotak terisi.
11. Lanjutkan ke soal berikutnya.
12. Pastikan seluruh game dapat diselesaikan.

### Audio Test Manual

Uji pada browser dan perangkat target untuk memastikan:
- Musik tidak tumpang tindih.
- Volume nyaman untuk kelas.
- Musik berhenti ketika ronde dibatalkan.
- Audio tetap berfungsi setelah beberapa ronde berturut-turut.

## 17. Keamanan dan Privasi

- Tidak perlu mengumpulkan identitas peserta.
- Tidak perlu meminta akses mikrofon.
- Tidak perlu mengakses kamera.
- Tidak membutuhkan API key.
- Gunakan musik yang dibuat sendiri atau memiliki lisensi penggunaan yang sesuai.
- Jangan menyertakan file musik berhak cipta tanpa izin.

## 18. Deployment

Pilihan:
- Vercel.
- Netlify.
- Cloudflare Pages.
- Server lokal untuk penggunaan offline.

Untuk penggunaan tanpa internet, semua aset harus tersedia secara lokal dan build produksi dapat dijalankan dari lingkungan yang telah disiapkan. Pastikan URL aset, konfigurasi server lokal, dan kebijakan browser telah diuji; jangan mengasumsikan semua konfigurasi hosting statis otomatis berfungsi secara offline.

## 19. Tahapan Pengembangan

### Phase 1 — Foundation
- Setup React, TypeScript, Vite, Tailwind.
- Siapkan routing dan halaman utama.

### Phase 2 — Crossword Engine
- Render grid.
- Nomor soal.
- Pemilihan nomor.
- Highlight dan pengisian jawaban.

### Phase 3 — Round State Machine
- Implementasi status ronde.
- Question selection.
- State transition.
- Kontrol fasilitator.

### Phase 4 — Audio and Timer
- Audio service.
- Preload musik.
- Random timer 15–30 detik.
- Auto-stop.
- Penanganan error dan pembatalan.

### Phase 5 — Answer Evaluation
- Penilaian fasilitator.
- Validasi jawaban.
- Score dan progress.
- Completion screen.

### Phase 6 — UI Polish
- Animasi.
- Sound feedback.
- Pengaturan volume.
- Responsive layout.
- Accessibility.

### Phase 7 — Quality Assurance
- Unit test.
- Integration test.
- End-to-end test.
- Pengujian audio pada perangkat target.
- Simulasi permainan kelas.

## 20. Prinsip Arsitektur Utama

Pisahkan tanggung jawab sebagai berikut:

- **UI:** menampilkan grid, soal, status, dan kontrol.
- **Game Controller:** mengatur alur permainan.
- **Timer Service:** mengatur deadline ronde.
- **Audio Service:** mengelola pemutaran dan penghentian musik.
- **Crossword Engine:** mengelola posisi huruf dan grid.
- **Answer Validator:** memeriksa jawaban resmi.
- **Score Engine:** mengelola skor.

Dengan pemisahan ini, fitur baru seperti level kesulitan, beberapa playlist musik, mode tim, atau penjelasan edukatif dapat ditambahkan tanpa mengubah logika dasar oper pena.