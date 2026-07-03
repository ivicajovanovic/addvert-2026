import {
  Briefcase,
  Car,
  ChefHat,
  Coffee,
  GraduationCap,
  Hotel,
  Scissors,
  Stethoscope,
  Trophy,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const industryIconMap = {
  "sportski-klubovi": Trophy,
  "hoteli-restorani": Hotel,
  "kafici-ugostiteljstvo": Coffee,
  "apoteke-zdravstvo": Stethoscope,
  ketering: ChefHat,
  "korporativni-sektor": Briefcase,
  "skole-ustanove": GraduationCap,
  "auto-servisi": Car,
  "frizerstvo-kozmetika": Scissors,
} satisfies Record<string, LucideIcon>

export type IndustryIconId = keyof typeof industryIconMap

export function IndustryIcon({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  const Icon = industryIconMap[id as IndustryIconId]
  if (!Icon) return null

  return <Icon className={cn("shrink-0", className)} strokeWidth={1.5} aria-hidden="true" />
}
