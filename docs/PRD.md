# PRD — TTS Gizi: Oper Pena & Musik

## 1. Informasi Produk

- **Nama produk:** TTS Gizi
- **Jenis:** Educational Web Game
- **Platform:** Web browser
- **Target pengguna:** Remaja, siswa SMP, kelompok komunitas, & masyarakat umum
- **Pengguna aplikasi:** Fasilitator, guru, ahli gizi, instruktur acara, & pemain kelompok
- **Mode penggunaan:** Classroom / Group Game / Event / Web Deployment
- **Bahasa:** Bahasa Indonesia
- **Tampilan:** Responsif untuk Laptop, Layar Proyektor, & Browser Desktop (Zero-Scroll Layout)
- **Koneksi internet:** Tidak wajib (100% Offline Ready) dan siap di-deploy secara online
- **Mode permainan:** TTS interaktif dengan musik dan oper pena / giliran menjawab

## 2. Latar Belakang

TTS Gizi dirancang sebagai media edukasi yang menggabungkan pembelajaran gizi dengan permainan kelompok. Peserta tidak hanya menjawab pertanyaan, tetapi juga terlibat dalam aktivitas fisik sederhana berupa mengoper pena selama musik diputar.

Mekanisme musik membuat peserta tidak mengetahui secara pasti kapan giliran mereka tiba. Ketika musik berhenti, peserta yang memegang pena harus menjawab petunjuk TTS yang telah dipilih oleh fasilitator.

Permainan dikendalikan melalui satu laptop. Peserta tidak perlu memiliki perangkat sendiri, membuat akun, atau mengakses website secara terpisah.

## 3. Tujuan Produk

1. Membuat edukasi gizi lebih menarik dan interaktif.
2. Mendorong partisipasi peserta dalam kegiatan kelompok.
3. Mengenalkan konsep dasar gizi melalui teka-teki silang.
4. Menggabungkan musik, ketegangan positif, dan pembelajaran.
5. Memudahkan fasilitator menjalankan permainan melalui proyektor.
6. Menyediakan permainan yang dapat digunakan tanpa koneksi internet.

## 4. Target Pengguna

### 4.1 Fasilitator

Fasilitator bertugas:
- Memilih nomor soal.
- Mengawasi jalannya permainan.
- Membacakan soal apabila diperlukan.
- Menilai jawaban peserta.
- Menentukan tindakan jika jawaban salah.
- Melanjutkan permainan ke nomor berikutnya.

### 4.2 Peserta

Peserta bertugas:
- Mengoper pena selama musik berlangsung.
- Berhenti mengoper ketika musik berhenti.
- Menjawab soal apabila sedang memegang pena.
- Berpartisipasi dalam kegiatan edukasi dengan tertib.

## 5. Ruang Lingkup MVP

### Fitur wajib

1. Halaman utama.
2. Petunjuk permainan.
3. Grid TTS interaktif.
4. Nomor soal yang dapat diklik.
5. Petunjuk soal yang tampil setelah nomor dipilih.
6. Musik yang dimulai otomatis ketika nomor soal dipilih.
7. Durasi musik 10 detik rata dengan visual countdown timer pada UI.
8. Musik berhenti otomatis ketika durasi berakhir.
9. Indikator visual bahwa sesi oper pena sedang berlangsung.
10. Tampilan kondisi ketika musik berhenti dan peserta harus menjawab.
11. Input jawaban dan validasi.
12. Pengisian kotak TTS ketika jawaban benar.
13. Feedback jawaban benar dan salah.
14. Kontrol fasilitator untuk mengulang, membatalkan, atau melanjutkan sesi.
15. Progress permainan.
16. Halaman hasil akhir.
17. Dukungan keyboard dan layar proyektor.
18. Musik dan seluruh data permainan dapat diakses secara lokal.

### Di luar MVP

- Login dan akun peserta.
- Multiplayer online.
- Leaderboard berbasis server.
- Aplikasi khusus Android/iOS.
- AI untuk menghasilkan soal secara otomatis.
- Pengenalan suara otomatis.
- Deteksi otomatis siapa yang sedang memegang pena.
- Integrasi dengan database daring.

## 6. Alur Utama Permainan

### Tahap 1 — Memulai

1. Fasilitator membuka aplikasi.
2. Halaman utama ditampilkan.
3. Fasilitator memilih tombol "Mulai Bermain".
4. Aplikasi menampilkan petunjuk singkat.
5. Fasilitator memulai permainan TTS.

### Tahap 2 — Memilih soal

1. Fasilitator mengklik nomor pada grid TTS.
2. Sistem mengidentifikasi soal berdasarkan nomor dan arah, yaitu mendatar atau menurun.
3. Panel petunjuk soal ditampilkan.
4. Kotak jawaban yang berkaitan dengan soal diberi highlight.
5. Sistem menetapkan durasi musik 10 detik rata.
6. Musik mulai diputar secara otomatis.

### Tahap 3 — Oper pena

1. Peserta mengoper pena selama musik diputar.
2. Sistem menampilkan indikator bahwa musik sedang berlangsung.
3. Sistem menampilkan countdown timer visual (10s menuju 0s) pada UI agar fasilitator dan siswa dapat memantau sisa waktu oper pena.
4. Setelah durasi berakhir, musik berhenti secara otomatis.
5. Sistem masuk ke status "Waktu Menjawab".

### Tahap 4 — Menjawab

1. Peserta yang memegang pena ketika musik berhenti menjadi penjawab.
2. Fasilitator membacakan petunjuk jika peserta membutuhkan bantuan.
3. Peserta menyampaikan jawaban secara lisan.
4. Fasilitator menilai jawaban melalui tombol "Benar" atau "Salah".
5. Jika benar, sistem mengisi kotak TTS.
6. Jika salah, sistem mengikuti aturan kesempatan menjawab yang ditetapkan.

### Tahap 5 — Melanjutkan

1. Setelah hasil jawaban dikonfirmasi, sistem menampilkan feedback.
2. Fasilitator menekan "Lanjut ke Soal Berikutnya" atau memilih nomor lain.
3. Soal berikutnya hanya aktif setelah nomor dipilih.
4. Siklus musik dan oper pena diulang.

### Tahap 6 — Selesai

Permainan berakhir apabila seluruh soal wajib telah diselesaikan atau fasilitator mengakhiri permainan.

Sistem menampilkan:
- Jumlah soal selesai.
- Jumlah jawaban benar.
- Jumlah jawaban salah / lewati.
- Persentase penyelesaian & total skor.
- Pesan penutup edukatif gizi & pencegahan anemia.
- **Opsi Kunci Jawaban & Pembahasan:** Menampilkan daftar lengkap seluruh soal Mendatar & Menurun, jawaban resmi, clue, hint, serta status penjawabannya.
- **Opsi Lihat Papan TTS:** Menutup sementara modal untuk memproyeksikan grid TTS yang telah terisi penuh di layar kelas, dilengkapi tombol melayang untuk kembali ke ringkasan skor.
- Opsi untuk memainkan ulang (*Mainkan Lagi*) atau memilih paket soal berikutnya dari Bank Soal (*Paket Soal Lain*).

## 6.1 Sistem Bantuan Soal (Hint) & Proteksi Anti-Bocoran (Anti-Spoil)

Aplikasi menyediakan tombol hint dengan sistem bertingkat 3 level yang adil:
1. **Level 1 — Huruf Pertama**: Membuka huruf kosong pertama pada kata tersebut di grid TTS (hanya mengisi cell yang belum terisi).
2. **Level 2 — Petunjuk Ekstra Teks**: Menampilkan kalimat bantuan edukatif mengenai fungsi, sumber pangan, atau analogi jawaban.
3. **Level 3 — Huruf Terakhir**: Membuka huruf kosong paling akhir pada kata tersebut di grid TTS.

#### **Aturan Khusus: Proteksi Anti-Bocoran (Anti-Spoil Hint Rule)**
- Apabila suatu kata hanya menyisakan **1 huruf kosong** (misalnya kata pendek seperti `KOI` yang 2 hurufnya sudah terisi dari kata berpotongan), sistem **TIDAK AKAN** membuka huruf terakhir secara otomatis via Level 1 atau Level 3 hint.
- Sistem akan menampilkan status **Proteksi Anti-Bocoran Aktif** dan hanya mengizinkan pembukaan **Petunjuk Teks (Level 2)** agar siswa tetap tertantang menebak huruf terakhir sendiri.
- Jika kelas tetap tidak dapat menjawab setelah batas waktu berakhir, fasilitator dapat memilih tombol *"Salah"* -> *"Buka Kunci Jawaban (0 Poin)"*.

## 6.2 Bank Soal Multi-Paket (Bank Soal TTS: Anemia Remaja Putri)

Aplikasi memiliki preset bank soal (*Puzzle Bank*) terkurasi dengan 5 paket bertema **Pencegahan & Edukasi Anemia pada Remaja Putri**:
1. **Paket 1 — Mengenal Anemia (8 Soal, Grid 16×14):** Mengenal anemia, kadar hemoglobin (Hb), gejala 5L, dan tanda fisik pucat.
2. **Paket 2 — Zat Gizi & Sumber Zat Besi (9 Soal, Grid 13×13):** Mengenal zat besi, protein hewani/nabati, asam folat, vitamin C, tempe, bayam, dan hati.
3. **Paket 3 — Penyebab & Dampak Anemia (8 Soal, Grid 15×14):** Memahami perdarahan menstruasi, thalasemia, pengikatan oksigen, gangguan konsentrasi belajar, dan rasa lemas.
4. **Paket 4 — Pencegahan Anemia (10 Soal, Grid 12×17):** Pola makan bergizi seimbang beragam, konsumsi TTD mingguan malam sebelum tidur, serta menghindari teh, kopi, dan susu saat minum tablet tambah darah.
5. **Paket 5 — Tablet Tambah Darah & Penanganan (8 Soal, Grid 14×14):** Peran dokter, pemeriksaan kadar Hb, terapi medis, suplemen TTD, dan pangan kaya zat besi.

Seluruh paket soal dirancang dengan struktur grid terhubung 100% tanpa tabrakan kata paralel (*zero collision*), dengan margin sel padding di sekelilingnya. Sistem memilih paket soal secara acak saat permainan baru dimulai, dan menyediakan tombol *"Paket Soal Lain"* setelah permainan selesai.

## 6.3 Mode Gelap & Terang (Dark / Light Mode Support)

Aplikasi dilengkapi tombol beralih tema (Toggle Mode Terang / Gelap):
- **Mode Terang (*Light Mode*):** Menggunakan palet Warm Cream (`#FFF9ED`) dan border hitam pekat (`#171717`) yang cerah, ideal untuk ruang kelas dengan pencahayaan normal atau lampu menyala.
- **Mode Gelap (*Dark Mode*):** Menggunakan palet Charcoal Deep (`#121212`), kartu Zinc (`#1E1E20`), teks terang (`#F5F5F5`), dan aksen neon (`#FFD84D`, `#38BDF8`), ideal untuk ruangan proyektor redup agar tidak menyilaukan mata siswa.
- **Persistensi Otomatis:** Pilihan tema disimpan otomatis di `localStorage` peramban (`'tts-gizi-theme'`) dan mendeteksi preferensi sistem bawaan peramban (`prefers-color-scheme`).


## 7. Aturan Musik dan Oper Pena

### 7.1 Pemicu musik

Musik hanya dipicu ketika fasilitator memilih nomor soal yang valid dan belum diselesaikan.

### 7.2 Durasi

- Durasi ronde: 10 detik rata (tetap).
- Tampilan countdown: Dilengkapi indikator hitung mundur visual di UI (10 detik menuju 0 detik) dengan efek peringatan saat sisa waktu <= 3 detik.
- Durasi dimulai ulang dari 10 detik setiap kali nomor soal baru dipilih.

### 7.3 Penghentian musik

Musik harus berhenti otomatis saat timer berakhir, tanpa memerlukan klik fasilitator.

### 7.4 Kondisi setelah musik berhenti

- Sistem menandai ronde sebagai menunggu jawaban.
- Musik tidak diputar ulang.
- Tombol penilaian jawaban tersedia.
- Ronde tidak dapat dimulai ulang secara tidak sengaja.
- Fasilitator tetap mengendalikan penilaian jawaban.

### 7.5 Jika peserta belum siap

Fasilitator dapat membatalkan ronde. Musik dihentikan dan timer dibersihkan. Fasilitator kemudian dapat mengulangi ronde dengan durasi baru.

### 7.6 Jika musik gagal diputar

Sistem menampilkan peringatan. Fasilitator dapat mencoba memutar kembali atau menjalankan ronde tanpa musik menggunakan timer sebagai alternatif.

### 7.7 Aturan keselamatan

- Peserta mengoper pena dengan tertib, tidak melemparnya.
- Tidak perlu berlari atau berpindah tempat dengan tergesa-gesa.
- Pena sebaiknya tidak memiliki ujung tajam.
- Fasilitator dapat menghentikan permainan kapan saja.

## 8. Sistem Penilaian & Penanganan Jawaban Salah

### Penilaian dasar

Karena permainan berfokus pada edukasi kelompok, penilaian jawaban dikendalikan oleh fasilitator.

- **Jawaban benar:** +100 poin. Huruf resmi terisi ke dalam grid TTS dan soal ditandai selesai.
- **Jawaban salah:** 0 poin. Sistem menyediakan 2 opsi tindakan bagi fasilitator:
  1. **Lewati (Coba Lagi Nanti):** Kotak TTS tetap kosong. Fasilitator dapat melanjutkan ke nomor lain dan soal ini dapat dipilih kembali di ronde berikutnya.
  2. **Buka Kunci Jawaban (0 Poin):** Jika seluruh kelas tidak dapat menjawab, fasilitator dapat membuka kunci huruf dan penjelasan edukasi agar materi gizi tetap tersampaikan dan permainan dapat diselesaikan hingga akhir.

### Validasi TTS

Setelah jawaban dinilai benar atau dibuka:
- Jawaban dibandingkan dengan jawaban resmi.
- Jawaban dinormalisasi dengan mengabaikan perbedaan huruf besar/kecil dan spasi.
- Sistem mengisi huruf pada grid.
- Sistem menandai soal sebagai selesai.

## 9. Sistem Bantuan (Hint 3 Tingkat Per Soal)

Setiap nomor soal memiliki kuota maksimal **3 kali bantuan (Hint Level 1–3)**:
- **Hint 1 (Klik 1):** Membuka huruf pertama pada kotak TTS soal tersebut.
- **Hint 2 (Klik 2):** Menampilkan petunjuk teks ekstra/clue gizi tambahan pada panel soal.
- **Hint 3 (Klik 3):** Membuka satu huruf bantuan berikutnya (misalnya huruf terakhir) pada kotak TTS.

Fasilitator dapat menekan tombol Hint kapan saja saat ronde berlangsung untuk membantu siswa yang mengalami kesulitan.

## 10. Kategori Soal (Materi Anemia Remaja Putri)

- **Kesehatan Remaja:** Definisi anemia, kerentanan remaja putri, dan siklus bulanan.
- **Zat Gizi & Mineral:** Zat besi (heme & non-heme), protein, asam folat, dan vitamin C.
- **Tanda & Gejala:** Gejala 5L (lelah, lemah, letih, lesu, lunglai), pusing, dan pucat.
- **Istilah Sains & Anatomi:** Hemoglobin (Hb), sel darah merah, oksigen, dan thalasemia.
- **Penyebab & Dampak:** Perdarahan menstruasi, penurunan daya konsentrasi belajar, dan rasa lemas.
- **Pola Makan & Sumber Pangan:** Daging, ayam, ikan, hati, telur, tempe, bayam, dan buah.
- **Program & Suplemen:** Tablet Tambah Darah (TTD), aturan minum mingguan, dan cara minum sebelum tidur.
- **Kebiasaan Penghambat:** Menghindari konsumsi teh, kopi, atau susu bersamaan dengan TTD.
- **Penanganan Medis:** Peran dokter, pemeriksaan laboratorium darah, dan terapi berkelanjutan.

Semua soal disesuaikan langsung dengan dokumen kurikulum gizi remaja putri dan telah divalidasi ke dalam bank soal aplikasi.

## 11. Kebutuhan Nonfungsional

### Kinerja
- Interaksi grid harus terasa langsung.
- Musik berhenti sesuai timer yang dijadwalkan.
- Tidak memerlukan permintaan jaringan untuk memulai ronde.
- Animasi tidak boleh mengganggu keterbacaan soal.

### Kompatibilitas
- Google Chrome.
- Microsoft Edge.
- Firefox.
- Browser desktop modern.

### Responsivitas
- Layout utama dioptimalkan untuk laptop dan proyektor.
- Tetap dapat digunakan di tablet.
- Ukuran huruf dan nomor TTS harus terbaca dari jarak kelas.

### Aksesibilitas
- Status musik berjalan dan berhenti dibedakan secara visual.
- Tidak menggunakan warna sebagai satu-satunya indikator.
- Kontrol dapat digunakan dengan keyboard.
- Ada kontrol jeda atau pembatalan yang jelas bagi fasilitator.

### Keandalan
- Timer tidak boleh berjalan ganda.
- Klik berulang tidak boleh memulai beberapa musik sekaligus.
- Ronde yang telah selesai tidak boleh dinilai berulang.
- Refresh tidak boleh menyebabkan musik menyala tanpa tindakan pengguna.

## 12. Kriteria Penerimaan

1. Mengklik nomor valid menampilkan soal yang sesuai.
2. Musik mulai diputar pada awal ronde.
3. Durasi setiap ronde berada di antara 15–30 detik.
4. Musik berhenti tanpa klik tambahan ketika timer berakhir.
5. Sistem beralih ke status menunggu jawaban.
6. Peserta dapat menjawab melalui fasilitator.
7. Jawaban benar mengisi kotak yang tepat.
8. Jawaban salah tidak mengisi kotak.
9. Ronde yang sudah selesai tidak dapat dinilai berulang.
10. Tombol batal menghentikan musik dan membersihkan timer.
11. Tidak ada audio yang bertumpuk ketika soal diganti.
12. Aplikasi tetap dapat menjalankan permainan tanpa internet.
13. Jika audio tidak tersedia, fasilitator dapat melanjutkan menggunakan mode alternatif.

## 13. Metrik Keberhasilan

- Fasilitator dapat menjalankan permainan tanpa bantuan teknis.
- Semua soal dapat dipilih melalui nomor grid.
- Tidak ada timer atau audio ganda selama pengujian.
- Peserta memahami hubungan antara musik, oper pena, dan giliran menjawab.
- Soal dan grid tetap terbaca melalui proyektor.

## 14. Pengembangan Selanjutnya

- Bank soal dengan beberapa level.
- Editor puzzle untuk fasilitator.
- Efek suara untuk jawaban benar dan salah.
- Penjelasan edukatif setelah jawaban diberikan.
- Mode tim.
- Timer khusus untuk menjawab.
- Ringkasan hasil yang dapat diunduh.
- Fitur pembacaan soal dengan text-to-speech.