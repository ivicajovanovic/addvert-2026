"use client"

import { useState, type FormEvent } from "react"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BUSINESS, PHONES, WHATSAPP_NUMBER } from "@/lib/site-config"
import { ScrollReveal } from "./scroll-reveal"

const serviceLabels: Record<string, string> = {
  "masinski-vez": "Mašinski vez",
  "dtf-stampa": "DTF štampa",
  digitalizacija: "Digitalizacija",
  ostalo: "Ostalo",
}

function isValidService(value: string | undefined): value is keyof typeof serviceLabels {
  return value !== undefined && value in serviceLabels
}

const inputClassName =
  "rounded-none border-x-0 border-t-0 border-b border-white/20 bg-transparent px-0 py-5 text-base focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-white/20"

const MAP_LINK =
  "https://maps.google.com/?q=Vezionica+i+stamparija+ADD+VERT,+Petrovac+na+Mlavi"

interface ContactSectionProps {
  hidePageHeader?: boolean
  initialService?: string
}

export function ContactSection({ hidePageHeader = false, initialService }: ContactSectionProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState(isValidService(initialService) ? initialService : "")
  const [details, setDetails] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!service) return

    const serviceLabel = serviceLabels[service] ?? service
    const lines = [
      "*Novi upit sa sajta ADD VERT*",
      `Ime i prezime: ${name}`,
      `Email: ${email}`,
      phone.trim() ? `Telefon: ${phone.trim()}` : null,
      serviceLabel ? `Usluga: ${serviceLabel}` : null,
      `\nDetalji projekta:\n${details}`,
    ]
    const text = lines.filter(Boolean).join("\n")

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    )

    setSent(true)
    setName("")
    setEmail("")
    setPhone("")
    setService("")
    setDetails("")
  }

  function renderDirectContactActions() {
    return (
      <div className="space-y-3">
        <Button
          asChild
          className="h-12 w-full rounded-none bg-white text-sm font-semibold tracking-wide text-black hover:bg-gray-200"
        >
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 size-4" aria-hidden="true" />
            WhatsApp poruka
          </a>
        </Button>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PHONES.map((item) => (
            <a
              key={item.tel}
              href={`tel:${item.tel}`}
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/5"
            >
              <Phone className="size-4" aria-hidden="true" />
              {item.display}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      id="kontakt"
      className={hidePageHeader ? "py-16 md:py-24" : "border-t border-white/10 py-24 md:py-32"}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {!hidePageHeader ? (
          <ScrollReveal animation="slide-right" duration={500}>
            <div className="mb-12 max-w-xl md:mb-16">
              <h2 className="mb-6 text-3xl font-bold tracking-tighter md:text-5xl">Pokrenite projekat</h2>
              <div className="mb-6 h-1 w-12 bg-white" />
              <p className="text-lg text-muted-foreground">
                Pošaljite nam upit ili nas pozovite. Odgovaramo isti radni dan.
              </p>
            </div>
          </ScrollReveal>
        ) : null}

        {hidePageHeader ? (
          <ScrollReveal animation="fade" duration={500} className="mb-8 lg:hidden">
            {renderDirectContactActions()}
          </ScrollReveal>
        ) : null}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Levo: forma */}
          <ScrollReveal animation="slide-right" duration={500}>
            <div className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
              {sent ? (
                <div className="space-y-4 py-6 text-center md:py-8">
                  <p className="text-lg font-semibold text-white">Poruka pripremljena</p>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                    WhatsApp se otvorio sa vašim upitom. Kliknite &ldquo;Pošalji&rdquo; u aplikaciji i odgovorićemo
                    isti radni dan.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-white"
                  >
                    Pošalji još jedan upit
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <h3 className="text-lg font-semibold tracking-tight">Pošaljite upit</h3>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="full-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                        Ime i prezime
                      </Label>
                      <Input
                        id="full-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Vaše ime i prezime"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClassName}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                        Email adresa
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="email@primer.rs"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+381 63 123 456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClassName}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="service" className="text-xs uppercase tracking-wider text-muted-foreground">
                        Usluga
                      </Label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger id="service" className={`${inputClassName} w-full`}>
                          <SelectValue placeholder="Izaberite uslugu" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-white/10 bg-[#0a0a0a] text-white">
                          <SelectItem value="masinski-vez">Mašinski vez</SelectItem>
                          <SelectItem value="dtf-stampa">DTF štampa</SelectItem>
                          <SelectItem value="digitalizacija">Digitalizacija</SelectItem>
                          <SelectItem value="ostalo">Ostalo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="details" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Detalji projekta
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder="Opišite šta vam je potrebno..."
                      required
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="min-h-[120px] resize-none rounded-none border-x-0 border-t-0 border-b border-white/20 bg-transparent px-0 py-4 text-base transition-colors placeholder:text-white/20 focus-visible:border-white focus-visible:ring-0"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-none bg-white px-12 text-base font-medium text-black hover:bg-white/90 sm:w-auto"
                  >
                    Pošaljite upit
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Desno: NAP + direktni kontakt */}
          <ScrollReveal animation="slide-left" delay={80} duration={500}>
            <div className="flex h-full flex-col border-t border-white/10 pt-8 lg:pt-0 lg:border-t-0">
              <div className="hidden lg:block">{renderDirectContactActions()}</div>

              <div className="space-y-6 lg:mt-8">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Adresa</p>
                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm font-medium leading-relaxed transition-colors hover:text-white/80"
                    >
                      {BUSINESS.address.formatted}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Telefon</p>
                    <div className="mt-1 flex flex-col gap-0.5 text-sm font-medium">
                      {PHONES.map((item) => (
                        <a key={item.tel} href={`tel:${item.tel}`} className="transition-colors hover:text-white/80">
                          {item.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="mt-1 block break-all text-sm font-medium transition-colors hover:text-white/80"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Radno vreme</p>
                    <p className="mt-1 text-sm font-medium">{BUSINESS.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade" delay={120} duration={500} className="mt-10 md:mt-12">
          <div className="overflow-hidden border border-white/10 bg-white/5">
            <iframe
              src={BUSINESS.mapUrl}
              title="Lokacija ADD VERT na mapi"
              className="block h-[180px] w-full border-0 opacity-95 transition-opacity hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
