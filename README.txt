LOGBOOK PK HD - RSUD WELAS ASIH (PWA + data bersama)

A. PASANG DATA BERSAMA (Google Sheet, gratis, hanya sekali)
1. Buat Google Sheet baru (nama bebas, mis. "Data Logbook PK").
2. Menu Extensions > Apps Script. Hapus isi bawaan, tempel isi file google-apps-script/Code.gs.
3. Ganti TOKEN di baris pertama dengan kode rahasia buatan sendiri. Simpan.
4. Deploy > New deployment > jenis "Web app". Execute as: Me. Who has access: Anyone. Deploy, izinkan akses, lalu salin URL yang berakhiran /exec.
5. Buka config.js, isi url (URL /exec tadi) dan token (sama dengan di Code.gs).
6. Login pertama kali (admin) mengirim data awal ke Sheet. Setelah itu semua perangkat memakai data yang sama. Hapus pengguna demo, buat akun asli.
Jika config.js dibiarkan kosong, aplikasi berjalan mode demo (data hanya di perangkat itu).
Jika Code.gs diubah nanti: Deploy > Manage deployments > edit > Version: New version.

B. HOSTING
- GitHub Pages: unggah semua file (kecuali folder google-apps-script boleh ikut) ke repo, Settings > Pages > Deploy from branch (main, /root).
- Netlify: Add new site > Deploy manually > seret folder ini.
HTTPS otomatis, jadi bisa diinstal di HP (Android: Instal aplikasi; iPhone Safari: Bagikan > Tambah ke Layar Utama).

Akun demo awal: perawat PIN 1111, verifikator PIN 2222, admin PIN 123456 (ganti segera).
