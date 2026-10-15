# DESIGN — TTS Gizi: Oper Pena & Musik (Neobrutalism Edition)

## 1. Arah Desain & Karakter Visual

Desain aplikasi menggabungkan nuansa permainan edukasi kelas, kuis interaktif kelompok, dan teka-teki silang fisik bergaya **Neobrutalism**.

Karakter desain:
- **Neobrutalism Berani & Ceria**: Border hitam solid yang tegas, warna kontras tinggi yang ceria, dan *hard shadow* tanpa blur.
- **Ramah untuk Anak SMP**: Visual yang dinamis, tidak kaku, dan tidak tampak seperti dashboard administrasi/SaaS formal.
- **Keterbacaan Optimal di Proyektor**: Huruf besar, nomor jelas, dan kontras tajam sehingga mudah dilihat dari jarak kelas.
- **Feedback Interaksi Taktil**: Tombol memiliki batas tegas dan efek tekan fisik (*active offset shift*).
- **Hierarki Informasi Jelas**: Grid TTS dan petunjuk soal menjadi fokus utama pandangan.

## 2. Prinsip UX

### 2.1 Satu layar, satu pusat perhatian (Zero-Scroll Layout)
Grid TTS menggunakan sekitar 60–65% lebar konten, sedangkan panel soal menggunakan sekitar 35–40%. Seluruh interaksi utama (Header, Round Status, Crossword Board + Question Panel, Answer Controls) dikunci dalam batas tinggi viewport (`h-screen overflow-hidden`) dengan pembatas adaptif papan TTS (`max-h-[48vh]`) agar tampil 100% tanpa scrollbar vertikal di layar laptop maupun proyektor 1080p standar.

### 2.2 Status permainan selalu jelas
Pengguna dan fasilitator dapat membedakan status ronde secara visual melalui kombinasi warna, teks, dan ikon:
- Menunggu pemilihan soal (*Idle*).
- Musik sedang berputar & oper pena (*Playing*).
- Musik berhenti & giliran menjawab (*Answering*).
- Tindakan jika jawaban salah / buntu (*Wrong Action: Skip vs Reveal 0 pts*).
- Ronde selesai & selebrasi (*Completed*).

### 2.3 Fasilitator memegang kendali
Sistem mengotomatisasi pemutaran musik dan timer acak, tetapi fasilitator tetap memegang kendali penuh dalam memilih nomor, menilai jawaban lisan, mengaktifkan hint, dan membatalkan ronde.

## 3. Sistem Visual & Design Tokens (Light & Dark Mode)

Aplikasi mendukung **Dual Theme (Mode Terang & Mode Gelap)** bergaya Neobrutalism dengan kontras tinggi yang dapat disesuaikan dengan kondisi pencahayaan ruangan kelas/proyektor.

### 3.1 Palet Warna Mode Terang (Light Theme Tokens)

- **Background Canvas Utama:** `#FFF9ED` (Warm Cream)
- **Surface Kartu & Input:** `#FFFFFF`
- **Secondary Surface:** `#EFE9DD` (Kotak blok non-aktif & latar kontrol)
- **Primary Yellow:** `#FFD84D` (Aksen tombol, kartu ronde musik, & highlight)
- **Secondary Blue:** `#A8D8FF` (Aksen kategori, waktu menjawab, & kotak terisi)
- **Accent Coral:** `#FF765E` (Aksen edukasi, badge, & tombol close)
- **Text & Border Utama:** `#171717` (Hitam pekat untuk garis tegas dan tipografi)
- **Success Green:** `#2EAD67` (Tombol & feedback jawaban benar)
- **Error Red:** `#E84C4F` (Tombol salah & alert darurat)

### 3.2 Palet Warna Mode Gelap (Dark Theme Tokens)

- **Background Canvas Utama:** `#121212` (Deep Charcoal Black)
- **Surface Kartu & Input:** `#1E1E20` / `#27272A` (Elevated Zinc Dark)
- **Secondary Surface:** `#18181B` (Kotak blok TTS non-aktif & input latar)
- **Primary Yellow (Neon Accent):** `#FFD84D` (Tetap cerah dan kontras tinggi)
- **Secondary Blue (Vibrant Sky):** `#38BDF8` / `#A8D8FF`
- **Accent Coral:** `#FF765E`
- **Text Utama:** `#F5F5F5` (High-contrast Off-White)
- **Text Muted / Subtitle:** `#A1A1AA` (Zinc 400)
- **Border Utama:** `#3F3F46` (Zinc 700 solid untuk kontras Neobrutalist gelap)
- **Hard Shadow Gelap:** `#000000` (Solid pure black shadow)

### 3.3 Border dan Bayangan (Hard Shadows)

- **Border Utama:** Border solid 3px hingga 4px (`border-[3px] border-[#171717]` di light mode, `border-[#3F3F46]` di dark mode).
- **Hard Shadow:** Bayangan tegas tanpa efek blur:
  - Kartu & Board Game: `shadow-[6px_6px_0px_#171717]` (Dark: `dark:shadow-[6px_6px_0px_#000000]`)
  - Tombol & Badge: `shadow-[4px_4px_0px_#171717]` (Dark: `dark:shadow-[4px_4px_0px_#000000]`)
  - Elemen Kecil: `shadow-[2px_2px_0px_#171717]` (Dark: `dark:shadow-[2px_2px_0px_#000000]`)
- **Radius Sudut:** Konsisten dan tajam (8px hingga 12px, bukan *pill/rounded* berlebihan).
- **Interaksi Tombol:** Saat tombol ditekan (*active*), tombol bergeser sedikit ke arah bayangan (`active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`).
- **Transisi Tema:** Seluruh pergantian tema menggunakan transisi halus warna (`transition-colors duration-200`).

### 3.4 Tipografi

- **Font Family:** `Plus Jakarta Sans` / `Space Grotesk` (San-serif modern dengan bobot ekstra tebal).
- **Judul Utama:** 32–48 px (Font Black 900).
- **Teks Petunjuk Soal:** 24–36 px (Font Black/Bold, sangat mudah dibaca dari jarak jauh).
- **Huruf dalam Kotak TTS:** 22–32 px (Font Black 900).
- **Label Kontrol Fasilitator:** 16–20 px.

## 4. Spesifikasi Halaman

### 4.1 Halaman Utama (Landing Page)
- Header dengan logo resmi TTS Gizi 3D Neobrutalist dan tombol Pengaturan Audio.
- Hero visual maskot emblem 3D "TTS GIZI" interaktif dengan bayangan tegas Neobrutalist.
- Judul besar "TEKA-TEKI SILANG GIZI SEIMBANG" berbingkai bayangan tegas.
- Tombol aksi utama: **Mulai Bermain** (Kuning `#FFD84D`) dan **Cara Bermain** (Putih `#FFFFFF`).
- Indikator fitur: Materi Anemia Remaja Putri, Musik 10s & Countdown UI, dan Ramah Proyektor.

### 4.2 Halaman Petunjuk (Tutorial Page)
- 3 Kartu Langkah Neobrutalist:
  1. **Pilih Nomor Soal** (Fasilitator klik grid).
  2. **Musik Berputar** (Siswa oper pena secara tertib selama 10 detik dengan countdown di layar).
  3. **Musik Berhenti** (Siswa pemegang pena menjawab secara lisan).
- Peringatan keselamatan kelas: dilarang melempar pena atau berlari di dalam kelas.
- Tombol Mulai TTS Sekarang.

### 4.3 Layar Permainan (Game Screen)
- **Game Header:** Menampilkan judul TTS Gizi, indikator nomor ronde, skor total, dan progres jumlah soal selesai. Dilengkapi tombol Fullscreen proyektor, Audio Settings, Tutorial, dan Reset Game.
- **Spanduk Status Ronde (Round Status):** 
  - Saat musik berputar: Warna kuning `#FFD84D`, animasi visualizer batang suara hitam tebal yang bergerak dinamis, serta badge **Countdown Timer** (10 detik menuju 0 detik) dengan efek peringatan visual saat sisa waktu $\le 3$ detik.
  - Saat musik berhenti: Warna biru `#A8D8FF`, tanda panggilan giliran menjawab.
- **Crossword Board:** Papan grid TTS berbingkai hitam 4px tebal.
- **Answer Controls:** Bar kontrol fasilitator di bagian bawah layar.
- **Modals (Neobrutalism Popups):**
  - *Completion Modal (`CompletionModal`):* Modal selebrasi dengan animasi confetti saat seluruh paket puzzle berhasil diselesaikan, lengkap dengan tombol aksi *Paket Soal Lain*, *Mainkan Lagi*, *Kunci Jawaban*, *Lihat Papan TTS*, dan *Beranda*.
  - *Answer Review Modal (`AnswerReviewModal`):* Modal pembahasan kunci jawaban lengkap yang mengelompokkan soal Mendatar & Menurun, jawaban resmi beraksen tebal, nomor soal, kategori, pertanyaan lengkap, petunjuk edukasi ekstra (hint), dan indikator status terjawab.

## 5. Desain Grid TTS & Aturan Hubungan Kata (Crossword Matrix)

### 5.1 Kaidah Grid Standar (Interlocking Grid)
- **Kesinambungan Penuh (Single Connected Network):** Setiap kata mendatar dan menurun saling berpotongan (*interlocking*) minimal pada 1–2 titik huruf. Tidak ada kata yang mengambang terisolasi.
- **Pemisahan Baris/Kolom:** Tidak ada dua kata mendatar yang berdampingan menempel langsung di baris $r$ dan $r+1$ pada kolom yang sama tanpa pemisah huruf menurun.
- **Tipe Kotak TTS:**
  - *Kotak Aktif:* Berlatar putih `#FFFFFF` dengan border hitam 3px.
  - *Kotak Blok (Non-kata):* Berlatar abu-abu `#EFE9DD`.
  - *Kotak Terpilih (Highlight Soal Aktif):* Berlatar kuning `#FFD84D` dengan efek pulse.
  - *Kotak Terisi Benar:* Berlatar biru muda `#A8D8FF` dengan huruf hitam tebal.
  - *Kotak Huruf Bantuan (Hint):* Berlatar kuning `#FFD84D` bergaris putus-putus.

## 6. Sistem Bantuan (Hint 3 Tingkat) & Penanganan Jawaban Salah

### 6.1 Sistem Bantuan (Hint)
Setiap nomor soal memiliki batas maksimal 3 kali bantuan:
- **Hint 1:** Membuka huruf kosong pertama yang belum terisi pada kotak TTS soal tersebut.
- **Hint 2:** Menampilkan petunjuk teks edukasi tambahan pada panel soal.
- **Hint 3:** Membuka huruf kosong terakhir yang belum terisi pada kotak TTS soal tersebut.

### 6.2 Penanganan Jawaban Salah (Wrong Action)
Ketika fasilitator menekan tombol **Salah / Buntu**, fasilitator diberikan 2 opsi tindakan:
1. **Lewati (Coba Lagi Nanti):** Kotak TTS tetap kosong (kecuali huruf hint yang sudah dibuka). Soal tetap aktif dan bisa dipilih lagi di ronde berikutnya.
2. **Buka Kunci Jawaban (0 Poin):** Seluruh huruf jawaban dibuka di grid TTS, poin +0, dan materi edukasi gizi tetap tersampaikan agar permainan dapat diselesaikan hingga akhir.

## 7. Audio & Pengaturan Musik

- **Format Audio:** Mendukung file audio lokal `/audio/*.mp3` dan built-in Procedural Web Audio Synthesizer (100% offline).
- **Pilihan Track Musik:** 
  - *Ceria Gizi Groove* (Musik 1)
  - *Energi Remaja Bouncy* (Musik 2)
  - *Marimba Pop Tropis* (Musik 3)
- **Durasi Acak:** 15–30 detik per putaran oper pena.
- **Pengaturan:** Slider volume, tombol tes musik, toggle mute, dan toggle efek suara (SFX).

## 8. Aksesibilitas & Responsivitas Proyektor

- Prioritas utama adalah resolusi laptop 16:9 yang terhubung ke proyektor kelas.
- Teks, nomor, dan huruf memiliki rasio kontras maksimal (hitam di atas putih/kuning).
- Pintasan keyboard lengkap untuk fasilitator:
  - `Enter` atau `1`: Jawaban Benar (+100).
  - `Backspace` atau `0`: Jawaban Salah.
  - `1`: Lewati (saat salah).
  - `2` / `Enter`: Buka Kunci Jawaban 0 Poin (saat salah).
  - `Escape`: Batalkan Ronde aktif.