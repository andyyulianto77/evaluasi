# Panduan Lengkap: Membuat Kuis dan Form dengan HAXCMS Integration

## 📋 Daftar Isi
1. [Dasar Penggunaan](#dasar-penggunaan)
2. [Membuat Kuis Sederhana](#membuat-kuis-sederhana)
3. [Membuat Form dengan HAXCMS](#membuat-form-dengan-haxcms)
4. [Konfigurasi HAXCMS Store](#konfigurasi-haxcms-store)
5. [Contoh Lengkap](#contoh-lengkap)
6. [Tips dan Trik](#tips-dan-trik)

---

## 🎯 Dasar Penggunaan

### 1. Import Component
```html
<!-- Untuk Kuis -->
<script type="module" src="../custom/src/kuis-confeti.js"></script>

<!-- Untuk Form -->
<script type="module" src="../custom/src/form-connected.js"></script>
```

### 2. Penggunaan Dasar
```html
<!-- Kuis Sederhana -->
<confetti-quiz 
    questions='[{"question":"2+2=?","answer":"4"}]'>
</confetti-quiz>

<!-- Form Sederhana -->
<form-connected></form-connected>
```

---

## 🧩 Membuat Kuis Sederhana

### Step 1: Buat File HTML
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kuis Matematika</title>
    <script type="module" src="../custom/src/kuis-confeti.js"></script>
</head>
<body>
    <h1>Kuis Matematika Dasar</h1>
    
    <!-- Kuis Component -->
    <confetti-quiz 
        questions='[
            {"question":"Berapa hasil dari 5 + 3?","answer":"8"},
            {"question":"Berapa hasil dari 7 × 6?","answer":"42"},
            {"question":"Berapa hasil dari 15 - 9?","answer":"6"},
            {"question":"Berapa hasil dari 64 ÷ 8?","answer":"8"},
            {"question":"Berapa hasil dari 3²?","answer":"9"}
        ]'>
    </confetti-quiz>
    
    <!-- Confetti Overlay -->
    <kuis-confeti id="confetti"></kuis-confeti>
</body>
</html>
```

### Step 2: Jalankan di Browser
```
Buka file HTML di browser dan kuis siap digunakan!
```

---

## 📝 Membuat Form dengan HAXCMS

### Step 1: Form HTML Dasar
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form HAXCMS</title>
    <script type="module" src="../custom/src/form-connected.js"></script>
    <script type="module" src="../custom/src/custom-eval2-theme.js"></script>
</head>
<body>
    <h1>Form Data Siswa</h1>
    
    <!-- Form Component -->
    <form-connected></form-connected>
</body>
</html>
```

### Step 2: Styling dan Layout
```html
<style>
    body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
    }
    
    h1 {
        text-align: center;
        color: #333;
    }
    
    form-connected {
        display: block;
        margin: 20px auto;
    }
</style>
```

---

## 🔧 Konfigurasi HAXCMS Store

### 1. Setup Store untuk Kuis
```javascript
// Setelah halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu store tersedia
    setTimeout(() => {
        if (window.store) {
            // Konfigurasi kuis
            window.store.quizData = {
                title: "Kuis Pengetahuan Umum",
                questions: JSON.stringify([
                    {"question":"Siapakah presiden pertama Indonesia?","answer":"soekarno"},
                    {"question":"Ibukota France?","answer":"paris"},
                    {"question":"Berapa hari dalam setahun?","answer":"365"}
                ]),
                settings: {
                    autoloadResults: true,
                    showConfetti: true,
                    duration: 2000,
                    particleCount: 220
                }
            };
            
            // Set data user default
            window.store.userData = {
                name: "Nama Siswa",
                phone: "08123456789",
                kelas: "XII-IPA-1",
                absen: "15",
                address: "Alamat Siswa"
            };
            
            console.log("HAXCMS Store configured for quiz!");
        }
    }, 1000);
});
```

### 2. Form dengan Pre-filled Data
```javascript
// Setup form dengan data default
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.store) {
            // Set site title
            window.store.manifest = window.store.manifest || {};
            window.store.manifest.title = "Portal Educativa";
            
            // Set user data
            window.store.userData = {
                name: "Guru Matematika",
                email: "guru@sekolah.sch.id"
            };
        }
    }, 1000);
});
```

---

## 💡 Contoh Lengkap

### Kuis Lengkap dengan HAXCMS Integration
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kuis Sejarah Indonesia</title>
    <script type="module" src="../custom/src/kuis-confeti.js"></script>
    <script type="module" src="../custom/src/custom-eval2-theme.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            text-align: center;
            padding: 30px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        
        .content {
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ Kuis Sejarah Indonesia</h1>
            <p>Uji pengetahuan Anda tentang sejarah Nusantara</p>
        </div>
        
        <div class="content">
            <confetti-quiz 
                web-app-url="YOUR_GOOGLE_SCRIPT_URL"
                autoload-results="true">
            </confetti-quiz>
        </div>
    </div>
    
    <kuis-confeti id="confetti"></kuis-confeti>
    
    <script>
        // HAXCMS Store Configuration
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                if (window.store) {
                    // Configure quiz data
                    window.store.quizData = {
                        title: "Kuis Sejarah Indonesia",
                        questions: JSON.stringify([
                            {
                                "question": "Siapakah raja Majapahit yang terkenal dengan adilnya?",
                                "answer": "jayanegara"
                            },
                            {
                                "question": "Pada tahun berapa VOC didirikan?",
                                "answer": "1602"
                            },
                            {
                                "question": "Siapa yang memimpin perang Diponegoro?",
                                "answer": "diponegoro"
                            },
                            {
                                "question": "Kapan Indonesia memproklamirkan kemerdekaan?",
                                "answer": "17 agustus 1945"
                            },
                            {
                                "question": "Siapakah Perdana Menteri pertama Indonesia?",
                                "answer": "sutan syahrir"
                            }
                        ]),
                        settings: {
                            autoloadResults: true,
                            showConfetti: true,
                            duration: 3000,
                            particleCount: 300
                        }
                    };
                    
                    // Set default user data
                    window.store.userData = {
                        name: "",
                        phone: "",
                        kelas: "",
                        absen: "",
                        address: ""
                    };
                    
                    console.log("Sejarah Quiz configured with HAXCMS!");
                }
            }, 1500);
        });
        
        // Listen for quiz completion
        document.addEventListener('quiz-finished', function(e) {
            console.log('Quiz finished:', e.detail);
            // Send to Google Sheets or other services
        });
    </script>
</body>
</html>
```

### Form Lengkap dengan Validasi
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form Pendaftaran Siswa</title>
    <script type="module" src="../custom/src/form-connected.js"></script>
    <script type="module" src="../custom/src/custom-eval2-theme.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f0f2f5;
            margin: 0;
            padding: 20px;
        }
        
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .form-header {
            background: #0078d4;
            color: white;
            text-align: center;
            padding: 30px;
        }
        
        .form-header h1 {
            margin: 0;
            font-size: 2.2em;
        }
        
        .form-content {
            padding: 40px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <div class="form-header">
            <h1>📝 Pendaftaran Siswa Baru</h1>
            <p>Tahun Ajaran 2024/2025</p>
        </div>
        
        <div class="form-content">
            <form-connected></form-connected>
        </div>
    </div>
    
    <script>
        // Configure form with HAXCMS
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                if (window.store) {
                    // Set site information
                    window.store.manifest = {
                        title: "Sekolah excellent"
                    };
                    
                    // Set initial user data
                    window.store.userData = {
                        name: "",
                        email: ""
                    };
                    
                    console.log("Form configured with HAXCMS!");
                }
            }, 1000);
        });
        
        // Custom form submission handling
        document.addEventListener('form-submitted', function(e) {
            console.log('Form data:', e.detail);
            alert('Data berhasil disimpan!');
        });
    </script>
</body>
</html>
```

---

## 🚀 Tips dan Trik

### 1. **Validasi Data**
```javascript
// Validasi pertanyaan kuis
function validateQuizQuestions(questions) {
    return questions.every(q => 
        q.question && 
        q.answer && 
        typeof q.question === 'string' && 
        typeof q.answer === 'string'
    );
}

// Usage
const questions = [
    {"question": "Valid question", "answer": "valid answer"}
];
console.log(validateQuizQuestions(questions)); // true
```

### 2. **Custom Styling**
```css
/* Custom style untuk confetti quiz */
confetti-quiz {
    --quiz-primary-color: #4CAF50;
    --quiz-secondary-color: #f44336;
    --quiz-border-radius: 15px;
}

/* Custom style untuk form */
form-connected {
    --form-primary-color: #0078d4;
    --form-background: #ffffff;
}
```

### 3. **Event Handling**
```javascript
// Listen untuk berbagai event
document.addEventListener('quiz-result', (e) => {
    console.log('Quiz progress:', e.detail);
});

document.addEventListener('quiz-finished', (e) => {
    console.log('Quiz completed!', e.detail);
    // Kirim ke analytics, save score, etc.
});

// Form events
document.addEventListener('form-data-updated', (e) => {
    console.log('Form updated:', e.detail);
});
```

### 4. **Debugging**
```javascript
// Enable debugging
window.DEBUG_QUIZ = true;

// Debug functions
if (window.DEBUG_QUIZ) {
    console.log('Available store data:', window.store);
    console.log('Current quiz state:', document.querySelector('confetti-quiz'));
}
```

### 5. **Performance Optimization**
```javascript
// Lazy load untuk kuis besar
function loadQuizOnDemand(containerId, questionsUrl) {
    fetch(questionsUrl)
        .then(response => response.json())
        .then(questions => {
            const container = document.getElementById(containerId);
            container.setAttribute('questions', JSON.stringify(questions));
        });
}
```

---

## 🔗 Resources Tambahan

- **Component Documentation**: [LitElement Docs](https://lit.dev/)
- **HAXCMS Store API**: [HAXCMS Documentation](https://haxtheweb.org/)
- **Google Apps Script**: [Integration Guide](../custom/GOOGLE_SHEETS_INTEGRATION.md)

---

## ❓ Troubleshooting

### Common Issues:

1. **Component tidak muncul**
   - Pastikan script module sudah di-load
   - Check console untuk error JavaScript

2. **Data tidak tersimpan**
   - Pastikan HAXCMS store sudah tersedia
   - Check browser localStorage

3. **Confetti tidak muncul**
   - Pastikan `<kuis-confeti>` element ada
   - Check settings `showConfetti: true`

4. **Form data kosong**
   - Pastikan `store.userData` sudah diset
   - Check initial data di constructor

---

**🎉 Selamat! Anda sekarang bisa membuat kuis dan form interaktif dengan HAXCMS integration!**