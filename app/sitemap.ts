import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

const SITEMAP_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/galerija", priority: 0.85, changeFrequency: "weekly" },
  { path: "/industrije", priority: 0.8, changeFrequency: "monthly" },
  { path: "/o-nama", priority: 0.7, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.7, changeFrequency: "weekly" },
  { path: "/kontakt", priority: 0.9, changeFrequency: "monthly" },
]

const SITEMAP_LAST_MODIFIED = new Date("2026-07-03T00:00:00.000Z")

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((route) => ({
    url: route.path ? `${SITE_URL}${route.path}` : SITE_URL,
    lastModified: SITEMAP_LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
