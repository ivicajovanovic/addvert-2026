import { mkdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const outputDirectory = path.resolve("deliverables/assets")

const images = [
  ["public/images/galerija/masinski-vez/masinski-vez-radni-prsluci.webp", "cover-jakne.jpg"],
  ["public/images/galerija/masinski-vez/masinski-vez-kacketi-logo.webp", "vez-kacket.jpg"],
  ["public/images/galerija/dtf/dtf-stampa-premium-majice.webp", "dtf-majica.jpg"],
  ["public/images/galerija/masinski-vez/masinski-vez-softshell-jakna-2.webp", "zavrsna-jakna.jpg"],
]

await mkdir(outputDirectory, { recursive: true })

await Promise.all(
  images.map(([input, output]) =>
    sharp(input)
      .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 65, mozjpeg: true })
      .toFile(path.join(outputDirectory, output)),
  ),
)
