# Nara.ai

Platform pembelajaran budaya Indonesia dengan AI cultural companion.

## Setup

### Install Dependencies

**Menggunakan Yarn:**
```bash
yarn install
```

**Menggunakan npm:**
```bash
npm install
```

### Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi:
```
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Live2D Model & Cubism SDK

1. **Model Live2D:** Pastikan file model ada di `/public/models/nara/hiyori_free_t08.model3.json`

2. **Cubism SDK (WAJIB):**
   - Download Cubism SDK dari [Live2D](https://www.live2d.com/download/cubism-sdk/) (perlu registrasi)
   - Extract dan cari file `live2dcubismcore.min.js` di folder `Core/live2dcubismcore/min/`
   - Copy file tersebut ke `/public/cubism/live2dcubismcore.min.js`
   - Script akan otomatis load dari local file

**Catatan Penting:** 
- Model Hiyori menggunakan Cubism 3.0 (`.model3.json`, `.moc3`)
- `pixi-live2d-display` v0.5.0 mungkin masih mencari Cubism 2 runtime
- Jika error "Could not find Cubism 2 runtime", pastikan Cubism SDK sudah dimuat dengan benar
- Cek console browser untuk log loading Cubism SDK

## Development

**Menggunakan Yarn:**
```bash
yarn dev
```

**Menggunakan npm:**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Build

**Menggunakan Yarn:**
```bash
yarn build
yarn start
```

**Menggunakan npm:**
```bash
npm run build
npm start
```