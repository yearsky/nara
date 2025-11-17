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

### Live2D Model

Pastikan file model Live2D ada di `/public/models/nara/hiyori_free_t08.model3.json`

**Catatan:** Cubism SDK dimuat dari CDN. Jika ada error "Could not find Cubism runtime", download Cubism SDK dari [Live2D](https://www.live2d.com/download/cubism-sdk/) dan host file `live2dcubismcore.min.js` di `/public/cubism/`, lalu update script di `app/layout.tsx`.

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