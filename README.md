# 🌴 SawitCare AI

AI-powered palm oil nursery monitoring system using Computer Vision & Generative AI.

SawitCare AI membantu mendeteksi penyakit pada bibit sawit melalui kamera secara realtime menggunakan AI Vision Analysis. Dibangun dengan React + TypeScript + Express + AI Model API.

---

## ✨ Features

### 🔍 AI Disease Detection

- Capture gambar langsung dari kamera
- Analisa penyakit tanaman sawit menggunakan AI Vision
- Hasil analisa otomatis:
  - kemungkinan penyakit
  - tingkat keparahan
  - solusi singkat

---

### 📊 Dashboard Analytics

- Total scan monitoring
- Severity distribution chart
- Statistik kondisi bibit
- Recent scan activity
- Data visualization menggunakan Recharts

---

### 🕘 Scan History

- Menyimpan riwayat analisa
- Severity badge otomatis
- Preview gambar hasil scan
- Timestamp monitoring
- Delete history

---

### 🌱 Nursery Management

- Tambah data bibit sawit
- Edit status nursery
- Monitoring kondisi bibit
- Local persistence

---

### 📱 Responsive UI

- Mobile responsive
- Sidebar navigation
- Modern dark UI
- Smooth hover effects
- Glassmorphism inspired design

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- Recharts
- React Router DOM
- React Icons
- Axios

### Backend

- Node.js
- Express.js
- TypeScript

### AI

- Hugging Face Inference API
- Vision Language Model (VLM)

---

## 📸 Preview

### Scanner AI

Realtime camera scanner untuk analisa penyakit tanaman sawit.

### Dashboard

Visualisasi data monitoring bibit sawit.

### History

Riwayat hasil analisa AI lengkap dengan severity classification.

### Nursery

Management data bibit sawit.

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/sawitcare-ai.git
```

## Frontend Setup

cd client
npm install
npm run dev

## Backend Setup

cd server
npm install
npm run dev

## 🔑 Environment Variables

Buat file `.env` di folder `server` dengan menambahkan variabel-variabel berikut:
HF_TOKEN=your_huggingface_token
PORT=5000

## 🧠 AI Workflow

1. Capture gambar dari kamera
2. Konversi gambar menjadi format Base64
3. Kirim gambar ke API Express
4. Lakukan analisis visi AI
5. Kembalikan hasil deteksi penyakit
6. Simpan hasil ke sejarah lokal
7. Visualisasikan hasil di dashboard

## 🎯 Project Goals

- Membantu monitoring kesehatan bibit sawit
- Mempermudah deteksi dini penyakit tanaman
- Memberikan sistem monitoring nursery berbasis AI
- Menjadi solusi agritech sederhana berbasis computer vision

## 📌 Future Improvements

- Export PDF report
- AI confidence score
- Disease comparison system
- Cloud database integration
- Multi-user system
- Deployment & production API

## 👨‍💻 Author

Dibangun dengan ❤️ menggunakan React, TypeScript, Express, dan AI Vision Technology.

## 📝 License

MIT License
