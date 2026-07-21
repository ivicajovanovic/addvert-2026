"use client"

import Link from "next/link"
import { type FormEvent, useState } from "react"

type SignupStatus = "idle" | "submitting" | "success" | "error"

const SUCCESS_MESSAGE =
  "Proverite email i kliknite na link za potvrdu. Vodič će vas čekati odmah nakon toga."
const ERROR_MESSAGE =
  "Nismo uspeli da pošaljemo potvrdu. Pokušajte ponovo ili nam pišite na info@addvert.net."

export function NewsletterSignup() {
  const [status, setStatus] = useState<SignupStatus>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get("email") ?? "")
    const consent = formData.get("consent") === "on"
    const company = String(formData.get("company") ?? "")

    setStatus("submitting")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, company }),
      })

      if (!response.ok) {
        throw new Error("Newsletter signup failed")
      }

      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <p aria-live="polite" className="border border-white/25 px-5 py-5 text-sm leading-6 text-white sm:px-6">
        {SUCCESS_MESSAGE}
      </p>
    )
  }

  const isSubmitting = status === "submitting"

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-white">
          Poslovni email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="email@firma.rs"
          required
          disabled={isSubmitting}
          className="h-12 w-full border border-white bg-white px-4 text-base text-black placeholder:text-zinc-500 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="newsletter-consent"
          name="consent"
          type="checkbox"
          required
          disabled={isSubmitting}
          className="mt-0.5 size-5 shrink-0 border border-white/70 bg-transparent accent-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
        />
        <label htmlFor="newsletter-consent" className="text-sm leading-6 text-muted-foreground">
          Saglasan sam da primam email poruke od ADD VERT-a.
        </label>
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-zinc-300 sm:w-auto"
      >
        {isSubmitting ? "Šaljemo potvrdu…" : "Pošaljite mi vodič"}
      </button>

      {status === "error" ? (
        <p aria-live="polite" className="text-sm leading-6 text-white">
          {ERROR_MESSAGE}
        </p>
      ) : null}

      <p className="max-w-xl text-xs leading-5 text-muted-foreground">
        Prijavom pristajete da vam ADD VERT šalje vodič, korisne savete i povremene ponude. Odjava je moguća u svakom
        trenutku. Pogledajte{" "}
        <Link
          href="/politika-privatnosti"
          className="text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Politiku privatnosti.
        </Link>
      </p>
    </form>
  )
}
