interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  size?: "default" | "compact"
}

export function PageHero({ eyebrow, title, description, size = "default" }: PageHeroProps) {
  const isCompact = size === "compact"

  return (
    <div className="border-b border-white/10 pt-18">
      <div className={`container mx-auto px-4 md:px-6 lg:px-8 ${isCompact ? "py-10 md:py-12" : "py-16 md:py-20"}`}>
        {eyebrow ? (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className={`${isCompact ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"} font-bold tracking-tighter text-white`}>
          {title}
        </h1>
        <div className={`${isCompact ? "mt-5" : "mt-6"} h-1 w-12 bg-white`} />
        {description ? (
          <p className={`${isCompact ? "mt-5" : "mt-6"} max-w-2xl text-lg text-muted-foreground`}>{description}</p>
        ) : null}
      </div>
    </div>
  )
}
