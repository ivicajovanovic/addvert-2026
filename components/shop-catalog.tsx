import { MessageCircle } from "lucide-react"
import { buildShopWhatsAppHref, shopCatalogCopy, shopProducts } from "@/lib/shop-data"
import { WHATSAPP_NUMBER } from "@/lib/site-config"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "./ui/button"

export function ShopCatalog() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shopProducts.map((product, index) => (
            <ScrollReveal key={product.name} animation="slide-up" delay={index * 60} duration={500}>
              <article className="flex h-full flex-col border border-white/10 bg-white/[0.02]">
                <div className="relative aspect-square border-b border-white/10 bg-white/5">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm font-mono font-semibold uppercase tracking-[0.35em] text-white/40">Uskoro</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-lg font-bold tracking-tight text-white">{product.name}</h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {shopCatalogCopy.personalizationLabel}: {product.personalization}
                  </p>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <dl className="min-w-0">
                      {product.orderMeta.map((meta) => (
                        <div
                          key={meta.label}
                          className="flex h-11 w-full min-w-0 flex-col justify-center border border-white/10 bg-white/[0.03] px-2"
                        >
                          <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">{meta.label}</dt>
                          <dd className="text-xs font-semibold text-white">{meta.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Button
                      asChild
                      className="h-11 w-full rounded-none bg-white px-3 text-sm font-semibold tracking-wide text-black hover:bg-gray-200"
                    >
                      <a
                        href={buildShopWhatsAppHref(product.name, WHATSAPP_NUMBER)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Poruči ${product.name} preko WhatsApp-a`}
                      >
                        <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                        {shopCatalogCopy.ctaLabel}
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
