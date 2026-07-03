import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const sourceDir = path.join(root, "public/slike-galerija")
const outputRoot = path.join(root, "public/images/galerija")
const manifestPath = path.join(__dirname, "gallery-manifest.json")

const MAX_WIDTH = 1600
const WEBP_QUALITY = 82

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"))

let totalIn = 0
let totalOut = 0
const results = []

for (const item of manifest) {
  const sourcePath = path.join(sourceDir, item.source)
  const destDir = path.join(outputRoot, item.folder)
  const destPath = path.join(destDir, `${item.slug}.webp`)

  await fs.mkdir(destDir, { recursive: true })

  const inputStat = await fs.stat(sourcePath)
  totalIn += inputStat.size

  const image = sharp(sourcePath, { failOn: "none" }).rotate()
  const metadata = await image.metadata()

  await image
    .resize({
      width: MAX_WIDTH,
      height: MAX_WIDTH,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(destPath)

  const outputStat = await fs.stat(destPath)
  totalOut += outputStat.size

  results.push({
    ...item,
    image: `/images/galerija/${item.folder}/${item.slug}.webp`,
    width: metadata.width,
    height: metadata.height,
    bytesIn: inputStat.size,
    bytesOut: outputStat.size,
  })

  console.log(
    `${item.slug}.webp  ${(inputStat.size / 1024 / 1024).toFixed(2)} MB → ${(outputStat.size / 1024).toFixed(0)} KB`,
  )
}

const reportPath = path.join(root, "scripts/gallery-processed-report.json")
await fs.writeFile(reportPath, JSON.stringify(results, null, 2))

console.log("")
console.log(`Processed ${results.length} images`)
console.log(`Total: ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(2)} MB`)
console.log(`Report: ${reportPath}`)
