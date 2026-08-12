# Moccasins for Markers

Premium multi-page e-commerce + purpose brand site.

## Develop

```bash
cd moccasins-for-markers
npm install
npm run dev
```

Dev server: `http://localhost:5173/moccasins-for-markers/`

## Build for Vercel (static subdirectory)

```bash
npm run build
# copies dist → site root files used by Vercel static hosting
node ./scripts/publish.mjs
```

## Stack

- Vite + React
- React Router
- Framer Motion
- Local cart (localStorage)
