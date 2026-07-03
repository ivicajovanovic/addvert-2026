import sharp from "sharp"

const WIDTH = 1200
const HEIGHT = 630
const SOURCE = "public/images/hero-carousel/hero-7.webp"
const OUTPUT = "public/images/og-default.webp"

const overlaySvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.82"/>
      <stop offset="55%" stop-color="#0a0a0a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#shade)"/>
  <text x="72" y="300" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff" letter-spacing="-1">ADD VERT</text>
  <text x="72" y="362" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#ffffff" fill-opacity="0.92">Mašinski vez i DTF štampa</text>
  <text x="72" y="408" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#ffffff" fill-opacity="0.72">Petrovac na Mlavi · addvert.net</text>
</svg>`

await sharp(SOURCE)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
  .webp({ quality: 86 })
  .toFile(OUTPUT)

const meta = await sharp(OUTPUT).metadata()
console.log(`Wrote ${OUTPUT} (${meta.width}x${meta.height})`)
