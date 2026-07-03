import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const manifest = JSON.parse(await fs.readFile(path.join(__dirname, "gallery-manifest.json"), "utf8"))

let dimensionByImage = new Map()
try {
  const report = JSON.parse(await fs.readFile(path.join(__dirname, "gallery-processed-report.json"), "utf8"))
  dimensionByImage = new Map(report.map((entry) => [entry.image, { width: entry.width, height: entry.height }]))
} catch {
  console.warn("gallery-processed-report.json not found — skipping image dimensions")
}

const folderCategory = {
  "masinski-vez": "CATEGORY_EMBROIDERY",
  dtf: "CATEGORY_DTF",
  razno: "CATEGORY_OTHER",
}

function normalizeCopy(value) {
  return value
    .replaceAll("peširima", "peškirima")
    .replaceAll("stoljnjacima", "stolnjacima")
    .replaceAll("velness", "wellness")
}

const items = manifest.map((item, index) => {
  const image = `/images/galerija/${item.folder}/${item.slug}.webp`
  const dimensions = dimensionByImage.get(image)

  return {
    id: index + 1,
    categoryConst: folderCategory[item.folder],
    image_alt_text: normalizeCopy(item.image_alt_text),
    title: normalizeCopy(item.title),
    context: normalizeCopy(item.context),
    technique: normalizeCopy(item.technique),
    image,
    width: dimensions?.width,
    height: dimensions?.height,
  }
})

await Promise.all(
  items.map(async (item) => {
    try {
      const metadata = await sharp(path.join(root, "public", item.image.slice(1))).metadata()
      item.width = metadata.width ?? item.width
      item.height = metadata.height ?? item.height
    } catch {
      // Keep processed-report dimensions or fallback values when a source image is missing.
    }
  }),
)

const file = `export const CATEGORY_EMBROIDERY = "Mašinski vez"
export const CATEGORY_DTF = "DTF"
export const CATEGORY_OTHER = "Razno"

export const portfolioCategories = [CATEGORY_EMBROIDERY, CATEGORY_DTF, CATEGORY_OTHER] as const

export interface PortfolioItem {
  id: number
  category: string[]
  image_alt_text: string
  title: string
  context: string
  technique: string
  image: string
  width: number
  height: number
}

export const portfolioItems: PortfolioItem[] = [
${items
  .map(
    (item) => `  {
    id: ${item.id},
    category: [${item.categoryConst}],
    image_alt_text: ${JSON.stringify(item.image_alt_text)},
    title: ${JSON.stringify(item.title)},
    context: ${JSON.stringify(item.context)},
    technique: ${JSON.stringify(item.technique)},
    image: ${JSON.stringify(item.image)},
    width: ${item.width ?? 1600},
    height: ${item.height ?? 1600},
  }`,
  )
  .join(",\n")}
]
`

await fs.writeFile(path.join(root, "lib/portfolio-data.ts"), file)
console.log(`Wrote ${items.length} items to lib/portfolio-data.ts`)
