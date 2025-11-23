# Integrasi Google Sheets untuk Kuis

## Cara Setup

### 1. Buat Google Apps Script

Buat script di Google Sheets dengan kode berikut:

```javascript
// Fungsi ini digunakan untuk membuat halaman sukses minimal
function SuccessPage() {
  return HtmlService.createHtmlOutput('<h1>✅ Data Berhasil Disimpan!</h1><p>Anda dapat menutup jendela ini.</p>');
}

// Fungsi doGet diperlukan untuk mengalihkan ke halaman sukses
function doGet() {
  return SuccessPage();
}

function doPost (e) {
  const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1eyJWRnxhVy8v77y0DXS8wC5bCM6Pa4U_Awh346UncqY/edit?gid=0#gid=0";
  const SHEET_NAME = "Sheet1";
  
  const ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Sheet "' + SHEET_NAME + '" tidak ditemukan'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const params = e.parameter;
  const action = params.action || '';

  if (action == "tambah") {
    const timestamp = new Date();

    sheet.appendRow([
      params.iddata || '',
      timestamp,
      params.namaorng || '',
      params.nilai || '',
      params.nope || '',
      params.kelas || '',
      params.absen || '',
      params.alamatorng || '',
      params.keterangan || ''
    ]);

    // ************ PERBAIKAN PENTING ************
    // Setelah berhasil menyimpan, lakukan REDIRECT ke URL Web App itu sendiri (doGet)
    // yang akan menampilkan halaman sukses. Ini mencegah entri ganda saat Refresh.
    return HtmlService.createHtmlOutput('<script>window.top.location.href = location.href;</script>');
    // *******************************************
  }

  // Jika action tidak valid, kembalikan JSON error
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'error', 
    message: 'Action tidak valid' 
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### 2. Deploy Web App

1. Klik **Deploy** → **New deployment**
2. Pilih tipe: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Copy URL yang dihasilkan (format: `https://script.google.com/macros/s/.../exec`)

### 3. Format Kolom di Google Sheets

Buat header kolom di Sheet1:

| ID Data | Timestamp | Nama | Nilai | No HP | Alamat | Keterangan |
|---------|-----------|------|-------|-------|--------|------------|

---

## Cara Menggunakan di HTML

### Opsi 1: Menggunakan Attributes

```html

<kuis-confeti id="confetti" duration="1500" particle-count="180"></kuis-confeti>
<confetti-quiz 
  web-app-url="https://script.google.com/macros/s/AKfycb.../exec"
  user-name="John Doe"
  user-phone="081234567890"
  user-address="Jakarta"
  questions='[
    {"question":"Siapa presiden pertama Indonesia?","answer":"soekarno"},
    {"question":"Ibukota Indonesia?","answer":"jakarta"}
  ]'>
</confetti-quiz>


https://script.google.com/macros/s/AKfycbysR94NFSE5RDwwjvcjdwkohUe3GtZn6t8Hja_geeJdCIriZ_LrHadY0TzVxY9L3R0q/exec
https://script.google.com/macros/s/AKfycbysR94NFSE5RDwwjvcjdwkohUe3GtZn6t8Hja_geeJdCIriZ_LrHadY0TzVxY9L3R0q/exec
```

### Opsi 2: Set via JavaScript

```html
<confetti-quiz id="myQuiz"></confetti-quiz>

<script type="module">
  const quiz = document.getElementById('myQuiz');
  
  // Set Google Sheets URL
  quiz.webAppUrl = 'https://script.google.com/macros/s/AKfycb.../exec';
  
  // Set user info
  quiz.userName = 'John Doe';
  quiz.userPhone = '081234567890';
  quiz.userAddress = 'Jakarta, Indonesia';
  
  // Set questions
  quiz.setAttribute('questions', JSON.stringify([
    { question: "Siapa presiden pertama Indonesia?", answer: "soekarno" },
    { question: "Ibukota Indonesia?", answer: "jakarta" }
  ]));
</script>
```

### Opsi 3: Form Input Sebelum Kuis

```html
<div id="user-form">
  <h2>Data Peserta</h2>
  <input type="text" id="nama" placeholder="Nama Lengkap" required>
  <input type="tel" id="nohp" placeholder="No HP">
  <input type="text" id="alamat" placeholder="Alamat">
  <button onclick="mulaiKuis()">Mulai Kuis</button>
</div>

<confetti-quiz 
  id="myQuiz" 
  style="display:none"
  web-app-url="https://script.google.com/macros/s/AKfycb.../exec">
</confetti-quiz>

<script>
  function mulaiKuis() {
    const quiz = document.getElementById('myQuiz');
    const form = document.getElementById('user-form');
    
    // Set user data
    quiz.userName = document.getElementById('nama').value;
    quiz.userPhone = document.getElementById('nohp').value;
    quiz.userAddress = document.getElementById('alamat').value;
    
    // Show quiz, hide form
    form.style.display = 'none';
    quiz.style.display = 'block';
  }
</script>
```

---

## Fitur

✅ **Otomatis kirim saat kuis selesai**
- Data terkirim hanya ketika user menyelesaikan semua soal
- Tidak akan kirim data jika kuis belum selesai

✅ **Data yang dikirim:**
- ID unik (timestamp)
- Nama peserta
- Nilai/skor
- No HP (opsional)
- Alamat (opsional)
- Keterangan (nama kuis, persentase, skor)

✅ **Mode no-cors**
- Menggunakan `mode: 'no-cors'` untuk menghindari error CORS
- Data tetap terkirim meski response tidak bisa dibaca

✅ **Fallback ke Anonymous**
- Jika `user-name` tidak diisi, akan menggunakan "Anonymous"

---

## Testing

1. Buka browser console (F12)
2. Selesaikan kuis
3. Lihat pesan: `✅ Hasil kuis terkirim ke Google Sheets`
4. Cek Google Sheets untuk melihat data masuk

---

## Troubleshooting

### Data tidak masuk ke Google Sheets

1. ✅ Pastikan URL Web App benar
2. ✅ Pastikan deployment setting: "Anyone" bisa akses
3. ✅ Cek script Google Apps Script tidak ada error
4. ✅ Pastikan nama sheet adalah "Sheet1" atau sesuaikan di script

### Error CORS

Gunakan `mode: 'no-cors'` (sudah diimplementasikan). Data akan tetap terkirim meski browser tidak bisa membaca response.

---

## Build dan Deploy

Setelah edit kode, jalankan:

```bash
npm run build
```

Lalu deploy file `build/` ke hosting Anda.
